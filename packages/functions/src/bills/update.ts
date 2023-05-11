// TODO: Test this function
import { Bill } from '@bill-manager/core/bill'
import handler from 'src/auth/handler'

export const main = handler(async (event: any, session: any) => {
  const data = JSON.parse(event.body)
  const params = {
    userID: session.properties.userID,
    billID: data.billID,
    tag: data.tag || undefined,
    paymentWeb: data.paymentWeb || undefined,
    expirationDay: data.expirationDay || undefined,
    reference: data.reference || undefined,
  }

  return await Bill.update(params)
})
