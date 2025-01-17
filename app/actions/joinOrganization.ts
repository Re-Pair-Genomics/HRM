'use server';
// 'use server' and 'client server' are instructions in Next.js
// 逻辑： 用户输入organizationID,到数据库中查找是否存在该organizationID，
// 如果存在则将该organizationID加入到用户的organizationList中，
// 同时将用户加入到该organizationID的userList中
// 如果不存在则抛出OrganizationNotFoundError
// 用户成功加入organization后，要拿掉用户的joinOrganization权限
// 1. 首先验证用户是否有joinOrganization权限
// 2. 查询organization是否存在
// 3. 更新用户的organizationList，更新organization的userList
// 4. 返回organization
import { TransactWriteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from './client';
import { UsersTable } from '@/lib/table';
import { User, hasPermission } from '@/lib/models/user';
import { Organization } from '@/lib/models/organization';
import { joinOrganizationPermission } from '@/lib/models/permission';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import {
    OrganizationNotFoundError,
    PermissionError,
    UserNotFoundError
} from '@/lib/errors';

export async function joinOrganization(
    { organizationId }: { organizationId: string },
    token: string | null
) {
    if (!token) {
        throw new PermissionError();
    }

    const user = await verifyUser(token);

    // Check if organization exists
    const organizationQuery = new QueryCommand({
        TableName: UsersTable.name,
        KeyConditionExpression: 'PK = :PK',
        ExpressionAttributeValues: {
            ':PK': `ORG#${organizationId}`
        }
    });
    const organizationResponse = await docClient.send(organizationQuery);
    const organizationItem = organizationResponse.Items?.[0];
    if (!organizationItem) {
        throw new OrganizationNotFoundError(organizationResponse);
    }
    const organization = organizationItem as Organization;

    // Add organization ID to user's organization list and user to organization's user list
    const transactCommand = new TransactWriteCommand({
        TransactItems: [
            {
                Update: {
                    TableName: UsersTable.name,
                    Key: { PK: user.PK },
                    UpdateExpression: 'ADD organizations :orgId',
                    ExpressionAttributeValues: {
                        ':orgId': organization.PK
                    }
                }
            },
            {
                Update: {
                    TableName: UsersTable.name,
                    Key: { PK: organization.PK },
                    UpdateExpression: 'ADD employees :userId',
                    ExpressionAttributeValues: {
                        ':userId': user.PK
                    }
                }
            }
        ]
    });
    const response = await docClient.send(transactCommand);
    if (response.$metadata.httpStatusCode !== 200) {
        throw new Error('Failed to join organization');
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
        if (!hasPermission(user, joinOrganizationPermission)) {
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
