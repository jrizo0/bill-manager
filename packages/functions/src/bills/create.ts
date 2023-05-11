import { Bill } from '@bill-manager/core/bill'
import handler from 'src/auth/handler'

export const main = handler(async (event: any, session: any) => {
  const data = JSON.parse(event.body)

  const params = {
    userID: session.properties.userID,
    tag: data.tag,
    paymentWeb: data.paymentWeb,
    expirationDay: Number(data.expirationDay),
    reference: data.reference,
  }
  const result = await Bill.create(params)

  return result
})
