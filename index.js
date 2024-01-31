const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  PutCommand,
  DynamoDBDocumentClient,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const createExpressionConfig = require("./createExpressionConfig");
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event, context) => {
  const { eventName, tableName, model } = event;
  let command;

  switch (eventName) {
    case "create":
      command = new PutCommand({
        TableName: tableName,
        Item: model,
      });
      break;
    case "update":
      command = new UpdateCommand({
        TableName: tableName,
        Key: {
          id: model.id,
        },
        ...createExpressionConfig(tableName, model),
        ReturnValues: "ALL_NEW",
      });
      break;
    case "delete":
      command = new DeleteCommand({
        TableName: tableName,
        Key: {
          id: model,
        },
      });
      break;
    default:
      // TODO: return status code here
      command = null;
      break;
  }

  try {
    const response = await docClient.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: response,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
