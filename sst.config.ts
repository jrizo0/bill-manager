import { SSTConfig } from 'sst'
import { Api } from './stacks/Api'
import { Database } from './stacks/Database'
import { FrontendStack } from './stacks/Web'
import { Authentication } from './stacks/Authentication'

export default {
  config(_input) {
    return {
      name: 'bill-manager',
      region: 'us-east-1',
    }
  },
  stacks(app) {
    if (!['prod', 'stage'].includes(app.stage))
      app.setDefaultRemovalPolicy('destroy')

    app.stack(Database).stack(Authentication).stack(Api).stack(FrontendStack)
  },
} satisfies SSTConfig
