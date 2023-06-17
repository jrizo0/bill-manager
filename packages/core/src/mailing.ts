export * as Mailing from './mailing'
import { z } from 'zod'

import { createEventBuilder } from 'sst/node/event-bus'

export const event = createEventBuilder({
  bus: 'mailingBus',
})

export const Events = {
  mail: event('mail.send', {
    name: z.string(),
    email: z.string().email(),
  }),
}

export async function getUnpaidOnes() {

}

export async function create() {
  await Events.mail.publish({
    name: 'Julian Rizo',
    email: 'jr.rizo.o.jr@gmail.com'
  })
}
