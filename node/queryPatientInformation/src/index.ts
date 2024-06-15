import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const queryParams = event.queryStringParameters;

  try {
    const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
    const docClient = DynamoDBDocumentClient.from(dynamoClient);

    let scanParameters: ScanCommandInput = {
      TableName: `parallax-umbra-main-${process.env.environment}`,
    };

    if (queryParams && queryParams.patientName) {
      scanParameters = {
        ...scanParameters,
        FilterExpression: "patientName = :patientName",
        ExpressionAttributeValues: {
          ":patientName": queryParams.patientName,
        },
      };
    }

    const scanCommand = new ScanCommand(scanParameters);
    const result = await docClient.send(scanCommand);
    console.log("Item(s) scanned from DynamoDB: ", result);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Update this to match the domain you want to allow or keep it as '*' to allow all domains
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        response: result.Items,
      })
    };
  } catch (e) {
    console.error("Error: ", e);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Update this to match the domain you want to allow or keep it as '*' to allow all domains
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        response: 'An error occurred while scanning the table',
      })
    };
  }
};
