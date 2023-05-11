import { Payment } from '@bill-manager/core/payment'
import handler from 'src/auth/handler'

export const main = handler(async (event: any, session: any) => {
  const params = {
    billID: String(event.pathParameters.id),
    month: Number(event.pathParameters.month),
  }

  const result = await Payment.get(params)
  console.log(result)
  if (!result) {
    throw new Error('Item not found.')
  }

  return result
})
