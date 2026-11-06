import {
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

import { dynamoDb } from './dynamodb.js';
import { config } from '../config/env.js';

export async function createOwner({
  ownerId,
  email,
  fullName,
}) {
  const now = new Date().toISOString();

  const owner = {
    PK: `OWNER#${ownerId}`,
    SK: 'PROFILE',

    entityType: 'OWNER',

    ownerId,
    email,
    fullName,

    createdAt: now,
    updatedAt: now,
  };

  await dynamoDb.send(
    new PutCommand({
      TableName: config.tableName,
      Item: owner,

      // Prevent accidental overwriting of an
      // existing owner profile.
      ConditionExpression:
        'attribute_not_exists(PK) AND attribute_not_exists(SK)',
    })
  );

  return owner;
}

export async function getOwner(ownerId) {
  const result = await dynamoDb.send(
    new GetCommand({
      TableName: config.tableName,

      Key: {
        PK: `OWNER#${ownerId}`,
        SK: 'PROFILE',
      },
    })
  );

  return result.Item ?? null;
}