import { Config, Cron, EventBus, StackContext, use } from 'sst/constructs'
import { Database } from './Database'

export function Mailing({ stack }: StackContext) {
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
  })

  const cron = new Cron(stack, 'Cron', {
    schedule: 'cron(15 10 * * ? *)',
    // schedule: 'rate(5 minutes)',
    job: 'packages/functions/src/mailing/sendEventMail.main',
  })
  cron.bind([table, bus])
}
