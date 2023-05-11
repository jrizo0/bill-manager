import { Payment } from '@bill-manager/core/payment'
import handler from 'src/auth/handler'

export const main = handler(async (event: any, session: any) => {
  const params = {
    billID: event.pathParameters.id,
  }

  const result = await Payment.list(params)

  return result
})
