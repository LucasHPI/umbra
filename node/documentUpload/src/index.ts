import { APIGatewayEvent } from "aws-lambda";
import { ManipulateFiles } from "./class/ManipulateFiles";

export const handler = async (event: APIGatewayEvent) => {
  const queryStringParams = event.queryStringParameters;
  if (!queryStringParams?.action || !queryStringParams?.fileKey) {
    throw new Error("Missing action/fileKey from call");
  }

  if (
    queryStringParams.action != "download" &&
    queryStringParams.action != "upload"
  ) {
    throw new Error("Invalid Action");
  }

  if(!event.body) {
    throw new Error ("No file to upload")
  }

  const bucketName: string = process.env.document_bucket!;
  const action = queryStringParams.action;
  const fileKey = queryStringParams.fileKey;
  const manipulateFiles = new ManipulateFiles();
  const body = JSON.parse(event.body);

  if (action === "upload") {
    const uploadResponse = manipulateFiles.uploadFile(bucketName, fileKey, body.fileStream);
    
    return {
      status: 201,
      body: uploadResponse,
    };
  }

  if(action === "download") {

  }
};
