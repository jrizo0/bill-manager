import { Table } from 'sst/node/table'
import * as uuid from 'uuid'
import dynamodb from './dynamodb'
import { Payment } from './payment'

export * as Bill from './bill'

export interface Info {
  userID: string
  billID: string
  tag: string
  paymentWeb: string
  expirationDay: number
  reference: string
  times: {
    created: Date
    deleted?: Date
  }
}

export async function create(_input: {
  userID: string
  tag: string
  paymentWeb: string
  expirationDay: number
  reference: string
}) {
  const params = {
    TableName: Table.Bills.tableName,
    Item: {
      userID: _input.userID,
      billID: uuid.v1(),
      tag: _input.tag,
      paymentWeb: _input.paymentWeb,
      expirationDay: _input.expirationDay,
      reference: _input.reference,
      created: new Date().toISOString(),
    },
  }
  await dynamodb.put(params)
  return params.Item
}

export async function get(_input: { userID: string; billID: string }) {
  const params = {
    TableName: Table.Bills.tableName,
    Key: {
      userID: _input.userID,
      billID: _input.billID,
    },
  }
  const result = await dynamodb.get(params)

  return result.Item
}

export async function list(_input: { userID: string }) {
  const params = {
    TableName: Table.Bills.tableName,
    KeyConditionExpression: 'userID = :userID',
    ExpressionAttributeValues: {
      ':userID': _input.userID,
    },
  }
  const result = await dynamodb.query(params)
  const bills = result.Items

  for (let bill of bills!) {
    bill.paid = await isUpToDate({
      userID: _input.userID,
      billID: bill.billID,
    })
  }

  return bills
}

export async function isUpToDate(_input: { userID: string; billID: string }) {
  const currentMonth = new Date().getMonth()
  const paymentCurrentMonthQuery = await Payment.get({
    billID: _input.billID,
    month: currentMonth,
  })

  return !!paymentCurrentMonthQuery && true // !!null = false, false & true
}

export async function remove(_input: { userID: string; billID: string }) {
  const params = {
    TableName: Table.Bills.tableName,
    Key: {
      userID: _input.userID,
      billID: _input.billID,
    },
  }

  await dynamodb.delete(params)

  return { status: true }
}

// export function updateTag(_input: {
//   billID: string,
//   tag: string
// }) {
//   const params = {
//     TableName: Table.Bills.tableName,
//     // 'Key' defines the partition key and sort key of the item to be updated
//     Key: {
//       // userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
//       userId: "1",
//       billId: _input.billID
//     },
//     // 'UpdateExpression' defines the attributes to be updated
//     // 'ExpressionAttributeValues' defines the value in the update expression
//     UpdateExpression: "SET tag = :tag, paymentWeb = :paymentWeb, paymentDay = :paymentDay, reference = :reference",
//     ExpressionAttributeValues: {
//       ":tag": data.tag || null,
//       ":paymentWeb": data.paymentWeb || null,
//       ":paymentDay": data.paymentDay || null,
//       ":reference": data.reference || null,
//     },
//     // 'ReturnValues' specifies if and how to return the item's attributes,
//     // where ALL_NEW returns all attributes of the item after the update; you
//     // can inspect 'result' below to see how it works with different settings
//     ReturnValues: "ALL_NEW",
//   }

// export function updatePaymentWeb(_paymentWeb: string) {
//   return undefined as Info
// }

// export function updateExpirationDay(_expirationDay: string) {
//   return undefined as Info
// }

// export function updateReference(_reference: string) {
//   return undefined as Info
// }
