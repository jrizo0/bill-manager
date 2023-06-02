import { Group } from '@bill-manager/core/group'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const params = {
    userID: session.properties.userID,
  }
  const result = await Group.listGroupsOfUser(params)

  return {
    statusCode: 200,
    body: result,
  }
})
