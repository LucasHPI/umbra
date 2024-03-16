import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event["httpMethod"] == "OPTIONS") {
    return {
      statusCode: 200,
      body: "Options Success",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
  }

  try {
    const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
    const docClient = DynamoDBDocumentClient.from(dynamoClient);

    const scanParameters: ScanCommandInput = {
      TableName: `parallax-umbra-main-${process.env.environment}`,
      FilterExpression: "docName = :practionerName",
      ExpressionAttributeValues: {
        ":practionerName": "Cristiana",
      },
    };

    const scanCommand = new ScanCommand(scanParameters);
    const result = await docClient.send(scanCommand);
    console.log("Item(s) scanned from DynamoDB: ", result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        response: result.Items,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "Content-Type, Authorization",
        "Access-Control-Allow-Headers": "GET, POST",
      },
    };
  } catch (e) {
    console.error("Error: ", e)
    throw e;
  }
};
