import { StackContext, Api as ApiGateway, use } from 'sst/constructs'
import { Database } from './Database'
import { Authentication } from './Authentication'

export function Api({ stack }: StackContext) {
  const { tableUsers, tableBills, tablePayments } = use(Database)
  const { auth } = use(Authentication)

  const api = new ApiGateway(stack, 'Api', {
    defaults: {
      function: {
        bind: [tableUsers, tableBills, tablePayments, auth],
      },
    },
    routes: {
      'GET /bills': 'packages/functions/src/bills/list.main',
      'GET /bills/{id}': 'packages/functions/src/bills/get.main',
      'POST /bills': 'packages/functions/src/bills/create.main',
      'DELETE /bills/{id}': 'packages/functions/src/bills/delete.main',
      'PUT /bills': 'packages/functions/src/bills/update.main',

      'GET /payments/{id}': 'packages/functions/src/payments/list.main',
      'GET /payments/{id}/{month}': 'packages/functions/src/payments/get.main',
      'POST /payments/{id}': 'packages/functions/src/payments/create.main',
      'DELETE /payments': 'packages/functions/src/payments/delete.main',
      // update?
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })

  return {
    api: api,
  }
}
