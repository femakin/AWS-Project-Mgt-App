import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Set the AWS Region.
const REGION = "us-east-1"; // e.g., "us-east-1"

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

// Create a DynamoDB Document Client using the DynamoDB client object.
const dynamoDBDocumentClient = DynamoDBDocumentClient.from(ddbClient);

// Define the table name and S3 bucket name.
const tableName = "http-project-management-items";
const s3BucketName = "http-project-management-items-bucket";

export { ddbClient, s3Client, dynamoDBDocumentClient, tableName, s3BucketName };
