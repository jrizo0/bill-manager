import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Table } from 'sst/node/table'

export * as Dynamo from './dynamodb'

let client: DocumentClient | null = null

export const getClient = (): DocumentClient => {
    if (client) return client
    client = new DynamoDB.DocumentClient()
    return client
}

export const service = {
  table: Table.table.tableName,
  client: getClient(),
}
