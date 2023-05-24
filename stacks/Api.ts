import { StackContext, Api as ApiGateway, use } from 'sst/constructs'
import { Database } from './Database'
import { Authentication } from './Authentication'
import { Storage } from './Storage'

export function Api({ stack }: StackContext) {
  const { table } = use(Database)
  const { auth } = use(Authentication)
  const { bucket } = use(Storage)

  const api = new ApiGateway(stack, 'Api', {
    defaults: {
      function: {
        bind: [auth, table, bucket],
      },
    },
    routes: {
      'POST     /groups':                     'packages/functions/src/groups/create.main',
      'GET      /groups/user':                'packages/functions/src/groups/list.main', // groups for user
      'PUT      /groups':                     'packages/functions/src/groups/update.main',
      'DELETE   /groups':                     'packages/functions/src/groups/delete.main',
      'POST     /groups/add':                 'packages/functions/src/groups/addUser.main',
      'GET      /groups/{id}/users':          'packages/functions/src/groups/listUsers.main', // users for group

      'POST     /bills':                      'packages/functions/src/bills/create.main',
      'GET      /bills/{id}':                 'packages/functions/src/bills/list.main',
      'GET      /bills/all':                  'packages/functions/src/bills/listAll.main',
      'PUT      /bills':                      'packages/functions/src/bills/update.main',
      'DELETE   /bills':                      'packages/functions/src/bills/delete.main',

      'POST     /payments':                   'packages/functions/src/payments/create.main',
      'GET      /payments/{id}':              'packages/functions/src/payments/list.main',
      // TODO: do i use u?
      'GET      /payments/{bill}/{pay}':      'packages/functions/src/payments/get.main',
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
