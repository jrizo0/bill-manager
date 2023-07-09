export * as Mailing from './mailing'
import { createEventBuilder } from 'sst/node/event-bus'
import { z } from 'zod'

export const event = createEventBuilder({
  bus: 'mailingBus',
})

export const Events = {
  mail: event('mail.send', {
    name: z.string(),
    email: z.string().email(),
    billTag: z.string(),
  }),
}

export async function createSendMailEvent(
  name: string,
  email: string,
  billTag: string,
) {
  return await Events.mail.publish({
    name: name,
    email: email,
    billTag: billTag,
  })
}
