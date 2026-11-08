export const config = {
  awsRegion: process.env.AWS_REGION || 'ap-south-1',

  tableName:
    process.env.DYNAMODB_TABLE_NAME || 'rentflow-data',
};