import { Table } from "sst/node/table";
import dynamodb from "./dynamodb";

export * as Payment from './payment'

export interface Info {
  billID: string
  month: number
  year: number
  times: {
    created: Date
    deleted?: Date
  }
}

export async function create(_input: {
  billID: string,
  created: string
}) {
  const date = new Date(_input.created)

  const params = {
    TableName: Table.Payments.tableName,
    Item: {
      billID: _input.billID,
      month: date.getMonth(),
      year: date.getFullYear(),
      created: date.toISOString()
    },
  };

  await dynamodb.put(params);

  return params.Item;
}

export async function get(_input: {
  billID: string,
  month: number,
}) {
  const params = {
    TableName: Table.Payments.tableName,
    Key: {
      billID: _input.billID,
      month: _input.month,
    },
  };

  const result = await dynamodb.get(params);

  return result.Item;
}

export async function list(_input: {
  billID: string
}) {
  const params = {
    TableName: Table.Payments.tableName,
    KeyConditionExpression: "billID = :billID",
    ExpressionAttributeValues: {
      ":billID": _input.billID
    }
  }
  const result = await dynamodb.query(params)

  return result.Items
}

export async function remove(_input: {
  billID: string,
  month: number,
}) {
  const params = {
    TableName: Table.Payments.tableName,
    Key: {
      billID: _input.billID,
      month: _input.month
    },
  };
  await dynamodb.delete(params);

  return { status: true };
}
