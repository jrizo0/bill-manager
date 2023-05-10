import { StackContext, Table } from 'sst/constructs'

export function StorageStack({ stack, app }: StackContext) {
  const tableUsers = new Table(stack, 'Users', {
    fields: {
      userId: 'string',
      email: 'string',
      pictureURL: 'string',
      name: 'string',
    },
    primaryIndex: { partitionKey: 'userId' },
  })

  const tableBills = new Table(stack, 'Bills', {
    fields: {
      userID: 'string',
      billID: 'string',
      tag: 'string',
      paymentWeb: 'string',
      expirationDay: 'number',
      reference: 'string',
      created: 'string',
    },
    primaryIndex: { partitionKey: 'userID', sortKey: 'billID' },
  })

  const tablePayments = new Table(stack, 'Payments', {
    fields: {
      billID: 'string',
      month: 'number',
      year: 'number',
      created: 'string',
    },
    primaryIndex: { partitionKey: 'billID', sortKey: 'month' },
  })

  //TODO: enhancement uploads:
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
    tableUsers: tableUsers,
    tableBills: tableBills,
    tablePayments: tablePayments,
  }
}
