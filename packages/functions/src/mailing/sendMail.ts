import { Mailing } from '@bill-manager/core/mailing'
import { EventHandler } from 'sst/node/event-bus'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import 'dotenv/config'
import PayYourBillMail from './mail'

export const handler = EventHandler(Mailing.Events.mail, async (evt) => {
  const emailHtml = render(PayYourBillMail({ userName: evt.properties.name }))
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: evt.properties.email,
      subject: '¡Revisa tu BillManager!',
      html: emailHtml,
      react: PayYourBillMail({ userName: evt.properties.name }),
    })
    console.log("Email sended", data)
  } catch (error) {
    console.error(error)
  }
})
