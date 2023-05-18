import { StackContext, Table } from 'sst/constructs'

export function Database({ stack, app }: StackContext) {
  const table = new Table(stack, 'table', {
    fields: {
      pk: 'string',
      sk: 'string',
      gsi1pk: 'string',
      gsi1sk: 'string',
      gsi2pk: 'string',
      gsi2sk: 'string',
    },
    primaryIndex: {
      partitionKey: 'pk',
      sortKey: 'sk',
    },
    globalIndexes: {
      gsi1: {
        partitionKey: 'gsi1pk',
        sortKey: 'gsi1sk',
      },
    },
  })

  table.addGlobalIndexes({
    gsi2: {
      partitionKey: 'gsi2pk',
      sortKey: 'gsi2sk',
    },
  })

  return {
    table: table,
  }
}
