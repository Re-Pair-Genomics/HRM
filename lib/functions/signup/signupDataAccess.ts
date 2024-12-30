import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

import { UserSchema } from '../../schemas/userSchema';
import { Resource } from 'sst';

export interface SignupDataAccessInterface {
    createUser(data: UserSchema): Promise<void>;
}

export class DynamoSignupDataAccess implements SignupDataAccessInterface {

    private client: DynamoDBDocumentClient;

    constructor() {
        this.client = DynamoDBDocumentClient.from(new DynamoDBClient());
    }

    async createUser(data: UserSchema): Promise<void> {
        const command = new PutCommand({
            TableName: Resource.UserTable.name,
            Item: data,
        });
        await this.client.send(command);
    }
}