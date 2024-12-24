'use server'

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

export async function onSubmit(formName: string, userId: string, noteId: string) {
    console.log('formName:', formName)
    const client = new DynamoDBClient();
    const docClient = DynamoDBDocumentClient.from(client);
    console.log("aha!");
    const command = new PutItemCommand({
      TableName: formName,
      Item: {
        userId: {S: userId},
        noteId: {S: noteId}
      },
      ReturnValues: "ALL_OLD",
      ReturnConsumedCapacity: "TOTAL",
    })
    const response = await docClient.send(command);
    console.log(response)
}
