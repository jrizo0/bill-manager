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
      'GET      /groups/{id}':                'packages/functions/src/groups/get.main',
      'GET      /groups/user':                'packages/functions/src/groups/list.main', // groups for user
      'PUT      /groups':                     'packages/functions/src/groups/update.main',
      'DELETE   /groups':                     'packages/functions/src/groups/delete.main',
      'POST     /groups/user':                'packages/functions/src/groups/addUser.main',
      'DELETE   /groups/user':                'packages/functions/src/groups/deleteUser.main',
      'GET      /groups/{id}/users':          'packages/functions/src/groups/listUsers.main', // users for group

      'POST     /bills':                      'packages/functions/src/bills/create.main',
      'GET      /bills/{id}':                 'packages/functions/src/bills/get.main',
      'GET      /bills/group/{id}':           'packages/functions/src/bills/list.main',
      'GET      /bills/all':                  'packages/functions/src/bills/listAll.main',
      'PUT      /bills':                      'packages/functions/src/bills/update.main',
      'DELETE   /bills':                      'packages/functions/src/bills/delete.main',

      'POST     /payments':                   'packages/functions/src/payments/create.main',
      'GET      /payments/{id}':              'packages/functions/src/payments/list.main',
      'GET      /payments/{bill}/{pay}':      'packages/functions/src/payments/get.main', // with attachment presigned URL
      // update?
      'DELETE   /payments':                   'packages/functions/src/payments/delete.main',

      'GET      /user':                       'packages/functions/src/users/get.main',
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })

  return {
    api: api,
  }
}
