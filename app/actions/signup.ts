'use server';
import { User } from '@/lib/models/user';
import { CreateUserFailedError, DuplicateUsernameError, DuplicateEmailError } from '@/lib/errors';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import { docClient } from './client';
import { UsersTable } from '@/lib/table';
import * as bcypt from 'bcryptjs';

export interface SignUpProps {
    email: string;
    password: string;
    username: string;
}

export async function signup(props: SignUpProps) {
    const { email, password, username } = props;
    const hashedPassword = await bcypt.hash(password, 10);
    const user: User = {
        PK: `USER#${randomUUID()}`,
        email,
        password: hashedPassword,
        username,
        organizationId: null,
        profileId: null,
        paymentInfoId: null,
        permissions: {},
    };

    // Check for duplicate username or email
    const emailQuery = new QueryCommand({
        TableName: UsersTable.name,
        IndexName: "UserEmailIndex",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
            ":email": email,
        },
    });
    const emailResponse = await docClient.send(emailQuery);
    if (emailResponse.Count && emailResponse.Count > 0) {
        throw new DuplicateEmailError(emailResponse);
    }
    const usernameQuery = new QueryCommand({
        TableName: UsersTable.name,
        IndexName: "UserUsernameIndex",
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
            ":username": username,
        },
    });
    const usernameResponse = await docClient.send(usernameQuery);
    if (usernameResponse.Count && usernameResponse.Count > 0) {
        throw new DuplicateUsernameError(usernameResponse);
    }


    const command = new PutCommand({
        TableName: UsersTable.name,
        Item: user
    });
    const response = await docClient.send(command);
    if (response.$metadata.httpStatusCode !== 200) {
        throw new CreateUserFailedError(response);
    }
    return user;
}

