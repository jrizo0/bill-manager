import { Bill } from '@bill-manager/core/bill'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const result = await Bill.listAllUser(session.properties.userID)

  return {
    statusCode: 200,
    body: result,
  }
})
