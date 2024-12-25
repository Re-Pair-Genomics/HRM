'use server';

import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export async function scanTable(formName: string) {
    console.log('formName:', formName);
    const client = new DynamoDBClient();
    const docClient = DynamoDBDocumentClient.from(client);
    console.log('aha!');
    const command = new ScanCommand({
        TableName: formName
    });
    const response = await docClient.send(command);
    console.log(response);
    return response;
}
