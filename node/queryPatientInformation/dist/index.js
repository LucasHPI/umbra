"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
        const dynamoClient = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
        const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(dynamoClient);
        const scanParameters = {
            TableName: `parallax-umbra-main-${process.env.environment}`,
            FilterExpression: "docName = :practionerName",
            ExpressionAttributeValues: {
                ":practionerName": "Cristiana",
            },
        };
        const scanCommand = new lib_dynamodb_1.ScanCommand(scanParameters);
        const result = yield docClient.send(scanCommand);
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
    }
    catch (e) {
        console.error("Error: ", e);
        throw e;
    }
});
exports.handler = handler;
