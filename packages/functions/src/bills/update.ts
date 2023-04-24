import { Table } from "sst/node/table";
import handler from "@bill-manager/core/handler";
import dynamoDb from "@bill-manager/core/dynamodb";

export const main = handler(async (event: any) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: Table.Bills.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      // userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      userId: "1",
      billId: event.pathParameters.id, // The id of the note from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET tag = :tag, paymentWeb = :paymentWeb, paymentDay = :paymentDay, paymentReference = :paymentReference",
    ExpressionAttributeValues: {
      ":tag": data.tag || null,
      ":paymentWeb": data.paymentWeb || null,
      ":paymentDay": data.paymentDay || null,
      ":paymentReference": data.paymentReference || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});

