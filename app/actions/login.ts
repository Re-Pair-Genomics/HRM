'use server';
import { QueryCommand, QueryCommandOutput } from '@aws-sdk/lib-dynamodb';
import { docClient } from './client';
import { UsersTable } from '@/lib/table';
import * as bcypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    LoginFailedError,
    UserNotFoundError,
    WrongPasswordError
} from '@/lib/errors';

interface UsernameLoginProps {
    username: string;
    password: string;
}

interface EmailLoginProps {
    email: string;
    password: string;
}

export type LoginProps = UsernameLoginProps | EmailLoginProps;

async function loginWithUsername(username: string, password: string) {
    const command = new QueryCommand({
        TableName: UsersTable.name,
        IndexName: 'UserUsernameIndex',
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': username
        }
    });
    const response = await docClient.send(command);
    return verifyUser(response, password);
}

async function loginWithEmail(email: string, password: string) {
    const command = new QueryCommand({
        TableName: UsersTable.name,
        IndexName: 'UserEmailIndex',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email
        }
    });
    const response = await docClient.send(command);
    return verifyUser(response, password);
}

export async function login(props: LoginProps) {
    if ('username' in props) {
        return loginWithUsername(props.username, props.password);
    } else {
        return loginWithEmail(props.email, props.password);
    }
}

async function verifyUser(response: QueryCommandOutput, password: string) {
    if (response.$metadata.httpStatusCode !== 200) {
        throw new LoginFailedError(response);
    }
    const user = response.Items?.[0];
    if (!user) {
        throw new UserNotFoundError(response);
    }
    // verify password
    if (!(await bcypt.compare(password, user.password))) {
        throw new WrongPasswordError(response);
    }
    // generate token for the session
    try {
        const token = jwt.sign({ id: user.PK }, process.env.JWT_SECRET_KEY!, {
            expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME
        });
        return { token, user };
    } catch (error) {
        console.error(error);
        throw new LoginFailedError(response);
    }
}
