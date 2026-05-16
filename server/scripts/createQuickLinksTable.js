import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import 'dotenv/config';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const tableName = process.env.DYNAMODB_TABLE_QUICKLINKS || 'JBCQuickLinks';

const createTable = async () => {
  try {
    // Check if table exists
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    console.log(`Table "${tableName}" already exists.`);
  } catch (error) {
    if (error.name === 'ResourceNotFoundException') {
      console.log(`Creating table "${tableName}"...`);
      const params = {
        TableName: tableName,
        KeySchema: [
          { AttributeName: "id", KeyType: "HASH" }, // Partition key
        ],
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };
      await client.send(new CreateTableCommand(params));
      console.log(`Table "${tableName}" created successfully.`);
    } else {
      console.error("Error checking/creating table:", error);
    }
  }
};

createTable();
