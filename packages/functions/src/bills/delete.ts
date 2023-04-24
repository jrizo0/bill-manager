import { Table } from "sst/node/table";
import handler from "@bill-manager/core/handler";
import dynamoDb from "@bill-manager/core/dynamodb";

export const main = handler(async (event: any) => {
  const params = {
    TableName: Table.Bills.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      // userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      userId: "1",
      billId: event.pathParameters.id, // The id of the note from the path
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
