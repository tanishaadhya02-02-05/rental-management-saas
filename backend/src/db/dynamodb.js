import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

import { config } from '../config/env.js';

// Create the underlying DynamoDB client.
const client = new DynamoDBClient({
  region: config.awsRegion,
});

// Create the document client.
export const dynamoDb = DynamoDBDocumentClient.from(
  client,
  {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  }
);