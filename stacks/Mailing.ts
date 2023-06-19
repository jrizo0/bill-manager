import { Cron, EventBus, StackContext, use } from 'sst/constructs'
import { Database } from './Database'

export function Mailing({ stack }: StackContext) {
  const { table } = use(Database)

  const bus = new EventBus(stack, 'mailingBus', {
    defaults: {
      retries: 10,
    },
  })
  bus.subscribe('mail.send', {
    handler: 'packages/functions/src/mailing/sendMail.handler',
  })

  const cron = new Cron(stack, 'Cron', {
    schedule: 'cron(15 10 * * ? *)',
    // schedule: 'rate(5 minutes)',
    job: 'packages/functions/src/mailing/sendEventMail.main',
  })
  cron.bind([table, bus])
}
