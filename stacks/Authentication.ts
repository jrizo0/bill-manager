import { StackContext, use } from 'sst/constructs'
import { Auth } from 'sst/constructs/future'
import { Database } from './Database'

export function Authentication({ stack }: StackContext) {
  const { table } = use(Database)
  // const secrets = Config.Secret.create(stack, 'GOOGLE_CLIENT_ID')

  const auth = new Auth(stack, 'auth', {
    authenticator: {
      handler: 'packages/functions/src/auth/auth.handler',
      // bind: [secrets.GOOGLE_CLIENT_ID, table],
      bind: [table],
    },
  })

  stack.addOutputs({
    AuthUrl: auth.url,
  })

  return {
    auth: auth,
  }
}
