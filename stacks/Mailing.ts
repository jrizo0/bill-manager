import { Config, Cron, EventBus, StackContext, use } from 'sst/constructs'
import { Database } from './Database'
import { FrontendStack } from './Web'

export function Mailing({ stack, app }: StackContext) {
  const { site } = use(FrontendStack)
  const { table } = use(Database)
  const secrets = Config.Secret.create(stack, 'RESEND_API_KEY')

  const bus = new EventBus(stack, 'mailingBus', {
    defaults: {
      retries: 10,
    },
  })
  bus.subscribe('mail.send', {
    handler: 'packages/functions/src/mailing/sendMail.handler',
    bind: [secrets.RESEND_API_KEY],
    permissions: ['ses:SendEmail'],
    environment: {
      SITE_URL: site.url || 'http://localhost:3000',
    },
  })

  const cron = new Cron(stack, 'Cron', {
    schedule: ['staging', 'prod'].includes(app.stage)
      ? 'cron(15 10 * * ? *)' // rule that runs every day at 10:15 UTC + 0 (5:15 AM UTC -5)
      : 'rate(2 minutes)', // rule that runs every 3 minutes for testing purposes
    job: 'packages/functions/src/mailing/sendEventMail.main',
  })
  cron.bind([table, bus])
}
