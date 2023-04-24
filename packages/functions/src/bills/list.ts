import { Table } from "sst/node/table";
import handler from "@bill-manager/core/handler";
import dynamoDb from "@bill-manager/core/dynamodb";

export const main = handler(async (event: any) => {
  const params = {
    TableName: Table.Bills.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      // ":userId": event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      ":userId": "1",
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});

