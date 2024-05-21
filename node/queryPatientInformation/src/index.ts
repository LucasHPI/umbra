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

  const queryParams = event.queryStringParameters
  
  if(!queryParams) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        response: 'Patient not specified',
      })
    }
  }

  try {
    const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
    const docClient = DynamoDBDocumentClient.from(dynamoClient);

    const scanParameters: ScanCommandInput = {
      TableName: `parallax-umbra-main-${process.env.environment}`,
      FilterExpression: "docName = :practionerName",
      ExpressionAttributeValues: {
        ":patientName": queryParams.patientName,
      },
    };

    const scanCommand = new ScanCommand(scanParameters);
    const result = await docClient.send(scanCommand);
    console.log("Item(s) scanned from DynamoDB: ", result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        response: result.Items,
      })
    };
  } catch (e) {
    console.error("Error: ", e)
    throw e;
  }
};
