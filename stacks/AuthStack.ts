import { Auth, StackContext, use } from 'sst/constructs'
import { ApiStack } from './ApiStack'
import { FrontendStack } from './FrontendStack'

export function AuthStack({ stack }: StackContext) {
  const { api } = use(ApiStack)
  const { site } = use(FrontendStack)

  const auth = new Auth(stack, 'auth', {
    authenticator: {
      handler: 'packages/functions/src/googleAuth/auth.handler',
      bind: [site],
    },
  })

  auth.attach(stack, {
    api,
    prefix: '/auth',
  })
}
