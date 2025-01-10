'use server';
import { TransactWriteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from './client';
import { UsersTable } from '@/lib/table';
import { User, hasPermission } from '@/lib/models/user';
import { admin } from '@/lib/models/permission';
import { Organization } from '@/lib/models/organization';
import { createOrganizationPermission } from '@/lib/models/permission';
import { randomUUID } from 'crypto';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import {
    CreateOrganizationFailedError,
    PermissionError,
    UserNotFoundError
} from '@/lib/errors';

interface OrganizationProfileProps {
    name: string;
    address: string;
    phone?: string;
    email?: string;
    website?: string;
}

export async function createOrganization(
    prop: OrganizationProfileProps,
    token: string | null
) {
    if (!token) {
        throw new PermissionError();
    }

    const user = await verifyUser(token);

    // create organization
    const organization: Organization = {
        PK: `ORG#${randomUUID()}`,
        name: prop.name,
        address: prop.address,
        phone: prop.phone,
        email: prop.email,
        website: prop.website,
        employees: [user.PK]
    };

    // provide user with admin permission and update database
    user.permissions = admin;

    const transactCommand = new TransactWriteCommand({
        TransactItems: [
            {
                Put: {
                    TableName: UsersTable.name,
                    Item: organization,
                    ConditionExpression: 'attribute_not_exists(PK)' // Prevent duplicate organization
                }
            },
            {
                Put: {
                    TableName: UsersTable.name,
                    Item: user
                }
            }
        ]
    });
    const response = await docClient.send(transactCommand);
    if (response.$metadata.httpStatusCode !== 200) {
        throw new CreateOrganizationFailedError(response);
    }
    return organization;
}

async function verifyUser(token: string) {
    try {
        // query user from token
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        const userId = (payload as { id: string }).id;
        const userQuery = new QueryCommand({
            TableName: UsersTable.name,
            KeyConditionExpression: 'PK = :PK',
            ExpressionAttributeValues: {
                ':PK': userId
            }
        });
        const response = await docClient.send(userQuery);
        const item = response.Items?.[0];
        if (!item) {
            throw new UserNotFoundError(response);
        }
        const user = item as User;

        // verify user authentication
        if (!hasPermission(user, createOrganizationPermission)) {
            throw new PermissionError(user);
        }

        return user;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new TokenExpiredError('Token has expired', new Date());
        }
        throw error;
    }
}
