import { Bill } from '@bill-manager/core/bill'
import handler from 'src/handler'

export const main = handler(async (event: any) => {
  const params = {
    userID: event.pathParameters.userID,
  }
  const result = await Bill.list(params)

  return result
})
