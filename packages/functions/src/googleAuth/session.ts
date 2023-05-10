import { User } from '@bill-manager/core/user'
import { ApiHandler } from 'sst/node/api'
import { useSession } from 'sst/node/auth'

export const handler = ApiHandler(async () => {
  const session = useSession()

  // Check user is authenticated
  if (session.type !== 'user') {
    throw new Error('Not authenticated')
  }

  // Get user from db
  const params = {
    userID: session.properties.userID,
  }
  const user = await User.get(params)

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  }
})
