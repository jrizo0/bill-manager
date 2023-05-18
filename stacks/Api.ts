import { StackContext, Api as ApiGateway, use } from 'sst/constructs'
import { Database } from './Database'
import { Authentication } from './Authentication'

export function Api({ stack }: StackContext) {
  const { table } = use(Database)
  const { auth } = use(Authentication)

  const api = new ApiGateway(stack, 'Api', {
    defaults: {
      function: {
        bind: [auth, table],
      },
    },
    routes: {
      'GET      /users/groups':               'packages/functions/src/users/listGroups.main',
      'POST     /users/groups':               'packages/functions/src/users/addGroup.main',

      'POST     /groups':                     'packages/functions/src/groups/create.main',
      'GET      /groups':                     'packages/functions/src/groups/list.main',
      'GET      /groups/{id}':                'packages/functions/src/groups/get.main',
      'PUT      /groups':                     'packages/functions/src/groups/update.main',
      'DELETE   /groups':                     'packages/functions/src/groups/delete.main',
      'GET      /groups/users/{id}':          'packages/functions/src/groups/listUsers.main',
      'POST     /groups/add':                 'packages/functions/src/groups/addUser.main',

      'POST     /bills':                      'packages/functions/src/bills/create.main',
      'GET      /bills/{id}':                 'packages/functions/src/bills/list.main',
      'GET      /bills/{billID}/{groupID}':   'packages/functions/src/bills/get.main',
      'PUT      /bills':                      'packages/functions/src/bills/update.main',
      'DELETE   /bills':                      'packages/functions/src/bills/delete.main',

      'POST     /payments/{id}':              'packages/functions/src/payments/create.main',
      'GET      /payments/{id}':              'packages/functions/src/payments/list.main',
      'GET      /payments/{id}/{month}':      'packages/functions/src/payments/get.main',
      // update?
      'DELETE   /payments':                   'packages/functions/src/payments/delete.main',
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })

  return {
    api: api,
  }
}
