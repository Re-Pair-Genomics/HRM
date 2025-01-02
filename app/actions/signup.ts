'use server';
import { User } from '@/lib/models/user';
import { PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import { docClient } from './client';
import { UsersTable } from '@/lib/table';

export interface SignUpProps {
    email: string;
    password: string;
    username: string;
}

export async function signup(props: SignUpProps) {
    const { email, password, username } = props;
    const id = randomUUID();
    const user: User = {
        email,
        password,
        username,
        id,
        organization: null,
        profile: null,
        actions: {},
        paymentInfo: null,
        reportHistory: {},
        payrollHistory: {}
    };
    const command = new PutCommand({
        TableName: UsersTable.name,
        Item: {
            id,
            email,
            password,
            username
        }
    });
    const response = await docClient.send(command);
    if (response.$metadata.httpStatusCode !== 200) {
        throw new CreateUserFailedError(response);
    }
    return user;
}

export class CreateUserFailedError extends Error {
    response: PutCommandOutput;
    constructor(response: PutCommandOutput) {
        super('Failed to create user');
        this.response = response;
    }
}
