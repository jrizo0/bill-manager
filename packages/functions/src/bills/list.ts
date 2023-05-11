import { Bill } from '@bill-manager/core/bill'
import handler from 'src/auth/handler'

export const main = handler(async (event: any, session: any) => {
  const params = {
    userID: session.properties.userID,
  }
  const result = await Bill.list(params)

  return result
})
