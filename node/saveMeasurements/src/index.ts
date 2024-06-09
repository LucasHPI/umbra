import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput
} from "@aws-sdk/lib-dynamodb";

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {

  const measurements = event.body ? JSON.parse(event.body) : null;
  
  if(!measurements) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        response: 'No measurements were sent.',
      })
    }
  }

  try {
    const dynamoClient = new DynamoDBClient({ region: "us-east-1" });
    const docClient = DynamoDBDocumentClient.from(dynamoClient);

    const scanParameters: PutCommandInput = {
      TableName: `parallax-umbra-main-${process.env.environment}`,
      Item: measurements
    };

    const scanCommand = new PutCommand(scanParameters);
    const result = await docClient.send(scanCommand);
    console.log("Item(s) saved to DynamoDB: ", result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        response: result,
      })
    };
  } catch (e) {
    console.error("Error: ", e)
    throw e;
  }
};
