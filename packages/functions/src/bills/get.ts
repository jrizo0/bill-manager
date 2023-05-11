import { Bill } from '@bill-manager/core/bill'
import handler from 'src/auth/handler'

export const main = handler(async (event: any, session: any) => {
  const params = {
    userID: session.properties.userID,
    billID: event.pathParameters.billID,
  }
  const result = await Bill.get(params)

  if (!result) {
    throw new Error('Item not found.')
  }
  return result
})
