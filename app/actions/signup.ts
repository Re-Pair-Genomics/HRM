'use server';
import { User } from '@/lib/models/user';
import { DuplicateUserError, CreateUserFailedError } from '@/lib/errors';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
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
        permissions: { createOrganization: true, joinOrganization: true }
    };

    const command = new PutCommand({
        TableName: UsersTable.name,
        Item: user,
        ConditionExpression:
            'attribute_not_exists(email) AND attribute_not_exists(username)',
        ExpressionAttributeNames: {
            '#email': 'email',
            '#username': 'username'
        },
        ExpressionAttributeValues: {
            ':email': email,
            ':username': username
        }
    });

    try {
        await docClient.send(command);
        return user;
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'ConditionalCheckFailedException') {
                throw new DuplicateUserError();
            }
            throw new CreateUserFailedError(error);
        }
        return error;
    }
}
