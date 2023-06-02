import { User } from '@bill-manager/core/user'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const params = {
    userID: session.properties.userID,
  }

  const result = await User.get(params)

  return {
    statusCode: 200,
    body: result,
  }
})
