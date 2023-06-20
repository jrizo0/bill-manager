import { Mailing } from '@bill-manager/core/mailing'
import { Resend } from 'resend'
import { EventHandler } from 'sst/node/event-bus'
import PayYourBillMail from './mail'
import { Config } from 'sst/node/config'

export const handler = EventHandler(Mailing.Events.mail, async (evt) => {
  const resend = new Resend(Config.RESEND_API_KEY)
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: evt.properties.email,
      subject: '¡Revisa tu BillManager!',
      react: PayYourBillMail({
        userName: evt.properties.name,
        billTag: evt.properties.billTag,
        url: evt.properties.url,
      }),
    })
    console.log('Email sended', data)
  } catch (error) {
    console.error(error)
  }
})
