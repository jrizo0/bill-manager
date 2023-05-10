import { Bill } from '@bill-manager/core/bill'
import handler from 'src/handler'

export const main = handler(async (event: any) => {
  const params = {
    userID: event.pathParameters.userID,
    billID: event.pathParameters.billID,
  }

  const result = await Bill.remove(params)

  return result
})
