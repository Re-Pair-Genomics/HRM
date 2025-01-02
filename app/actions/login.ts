'use server';

import { QueryCommand, QueryCommandOutput } from '@aws-sdk/lib-dynamodb';
import { docClient } from './client';
import { UsersTable } from '@/lib/table';

export class LoginFailedError extends Error {
    response: QueryCommandOutput;
    constructor(response: QueryCommandOutput) {
        super('Login failed');
        this.response = response;
    }
}

export class UserNotFoundError extends Error {
    response: QueryCommandOutput;
    constructor(response: QueryCommandOutput) {
        super('User not found');
        this.response = response;
    }
}

export class WrongPasswordError extends Error {
    response: QueryCommandOutput;
    constructor(response: QueryCommandOutput) {
        super('Wrong password');
        this.response = response;
    }
}

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
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': username
        },
        ConsistentRead: true
    });
    const response = await docClient.send(command);
    if (response.$metadata.httpStatusCode !== 200) {
        throw new LoginFailedError(response);
    }
    const user = response.Items?.[0];
    if (!user) {
        throw new UserNotFoundError(response);
    }
    if (user.password !== password) {
        throw new WrongPasswordError(response);
    }
    return user;
}

async function loginWithEmail(email: string, password: string) {
    const command = new QueryCommand({
        TableName: UsersTable.name,
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':email': email
        },
        ConsistentRead: true
    });
    const response = await docClient.send(command);
    if (response.$metadata.httpStatusCode !== 200) {
        throw new LoginFailedError(response);
    }
    const user = response.Items?.[0];
    if (!user) {
        throw new UserNotFoundError(response);
    }
    if (user.password !== password) {
        throw new WrongPasswordError(response);
    }
    return user;
}

export async function login(props: LoginProps) {
    const { password } = props;
    if ('username' in props) {
        return loginWithUsername(props.username, password);
    } else {
        return loginWithEmail(props.email, password);
    }
}
