import { Table } from 'sst/node/table'
import dynamodb from './dynamodb'

export * as User from './user'

export interface Info {
  // WARN: in table is userId
  userID: string
  email: string
  pictureURL: string
  name: string
}

export async function create(_input: {
  userID: string
  email: string
  pictureURL: string
  name: string
}) {
  const params = {
    TableName: Table.Users.tableName,
    Item: {
      userId: _input.userID,
      email: _input.email,
      pictureURL: _input.pictureURL,
      name: _input.name,
    },
  }
  await dynamodb.put(params)
  return params.Item
}

export async function get(_input: { userID: string }) {
  const params = {
    TableName: Table.Users.tableName,
    Key: {
      userId: _input.userID,
    },
  }
  const result = await dynamodb.get(params)

  return result.Item
}
