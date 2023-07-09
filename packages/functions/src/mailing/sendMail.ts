import { Mailing } from '@bill-manager/core/mailing'
import { render } from '@react-email/render'
import SES, { type SendEmailRequest } from 'aws-sdk/clients/ses'
import { EventHandler } from 'sst/node/event-bus'
import PayYourBillMail from './mail'

export const handler = EventHandler(Mailing.Events.mail, async (evt) => {
  const ses = new SES({ region: 'us-east-1' })

  const body = render(
    PayYourBillMail({
      userName: evt.properties.name,
      billTag: evt.properties.billTag,
      url: process.env.SITE_URL || 'http://localhost:3000',
    })
  )
  const params: SendEmailRequest = {
    Destination: {
      ToAddresses: [evt.properties.email],
    },
    Message: {
      Body: {
        Html: {
          Data: body,
        },
      },

      Subject: { Data: '¡Revisa tu BillManager!' },
    },
    Source: 'BillManager-Team <jr.rizo.o.jr@gmail.com>',
  }

  try {
    const data = await ses.sendEmail(params).promise()
    console.log('Email sended', data)
  } catch (error) {
    console.error(error)
  }
})
