import { StackContext, Table } from 'sst/constructs'

export function Database({ stack, app }: StackContext) {
  const tableUsers = new Table(stack, 'Users', {
    fields: {
      userID: 'string',
      email: 'string',
      name: 'string',
    },
    primaryIndex: { partitionKey: 'userID' },
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

  return {
    tableUsers: tableUsers,
    tableBills: tableBills,
    tablePayments: tablePayments,
  }
}
