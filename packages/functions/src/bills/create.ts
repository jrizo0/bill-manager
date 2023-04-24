import { Table } from "sst/node/table";
import * as uuid from "uuid";
import handler from "@bill-manager/core/handler";
import dynamoDb from "@bill-manager/core/dynamodb";

export const main = handler(async (event: any) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: Table.Bills.tableName,
    Item: {
      // The attributes of the item to be created
      // userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      userId: "1",
      billId: uuid.v1(), // A unique uuid
      tag: data.tag,
      paymentWeb: data.paymentWeb,
      paymentDay: data.paymentDay, // day number
      reference: data.reference,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
