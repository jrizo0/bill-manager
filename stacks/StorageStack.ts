import { Bucket, StackContext, Table } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {
  // Create the DynamoDB table
  const tableBills = new Table(stack, "Bills", {
    fields: {
      userId: "string",
      billId: "string",
      tag: "string",
      paymentWeb: "string",
      paymentDay: "number",
      paymentReference: "string"
    },
    primaryIndex: { partitionKey: "userId", sortKey: "billId" },
  });

  //TODO: enhancement uploads
  // const bucket = new Bucket(stack, "Uploads", {
  //   cors: [
  //     {
  //       maxAge: "1 day",
  //       allowedOrigins: ["*"],
  //       allowedHeaders: ["*"],
  //       allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
  //     },
  //   ],
  // });

  return {
    billsTable: tableBills,
  };
}

