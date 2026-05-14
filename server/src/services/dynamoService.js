import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

const dynamoService = {
  create: async (tableName, item) => {
    const params = {
      TableName: tableName,
      Item: item,
    };
    return await docClient.send(new PutCommand(params));
  },

  getAll: async (tableName) => {
    const params = {
      TableName: tableName,
    };
    const result = await docClient.send(new ScanCommand(params));
    const items = result.Items || [];
    return items.sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  },

  getById: async (tableName, id) => {
    const params = {
      TableName: tableName,
      Key: { id },
    };
    const result = await docClient.send(new GetCommand(params));
    return result.Item;
  },

  update: async (tableName, id, updateData) => {
    const dataToUpdate = { ...updateData };
    delete dataToUpdate.id;

    let updateExpression = "set";
    let expressionAttributeNames = {};
    let expressionAttributeValues = {};

    Object.keys(dataToUpdate).forEach((key, index) => {
      updateExpression += ` #field${index} = :val${index},`;
      expressionAttributeNames[`#field${index}`] = key;
      expressionAttributeValues[`:val${index}`] = dataToUpdate[key];
    });

    updateExpression = updateExpression.slice(0, -1);

    const params = {
      TableName: tableName,
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const result = await docClient.send(new UpdateCommand(params));
    return result.Attributes;
  },

  delete: async (tableName, id) => {
    const params = {
      TableName: tableName,
      Key: { id },
    };
    return await docClient.send(new DeleteCommand(params));
  },
};

export default dynamoService;
