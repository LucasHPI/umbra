import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NodeJsClient } from "@smithy/types";
import { Readable } from "node:stream";
import { Upload } from "@aws-sdk/lib-storage";

export class ManipulateFiles {
  constructor(
    private readonly s3Client = new S3Client({
      region: "us-east-1",
    }) as NodeJsClient<S3Client>
  ) {}

  public async downloadFile(
    bucket: string,
    path: string
  ): Promise<Readable | undefined> {
    const fileParameters = {
      Bucket: bucket,
      Key: path,
    };

    const getFileCommand = new GetObjectCommand(fileParameters);

    const { Body } = await this.s3Client.send(getFileCommand);

    return Body
  }

  public uploadFile(bucket: string, path: string, Body: Readable): Upload | undefined {
    const uploadDefinition = {
      client: this.s3Client,
      params: {
        Bucket: bucket,
        Key: path,
        Body,
      },
    };

    const uploadClient = new Upload(uploadDefinition);

    return uploadClient;
  }
}
