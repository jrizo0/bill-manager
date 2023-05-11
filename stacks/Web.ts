import { NextjsSite, StackContext, use } from 'sst/constructs'
import { Api } from './Api'
import { Authentication } from './Authentication'

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(Api)
  const { auth } = use(Authentication)

  const site = new NextjsSite(stack, 'Site', {
    path: 'packages/web',
    environment: {
      NEXT_PUBLIC_API_URL: api.customDomainUrl || api.url,
      NEXT_PUBLIC_REGION: app.region,
      NEXT_PUBLIC_AUTH_URL: auth.url,
    },
  })

  stack.addOutputs({
    SiteUrl: site.url || 'http://localhost:3000',
  })

  return {
    site: site,
  }
}
