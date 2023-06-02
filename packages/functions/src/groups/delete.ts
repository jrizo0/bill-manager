import { Group } from '@bill-manager/core/group'
import { User } from '@bill-manager/core/user'
import Joi from 'joi'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const schema = Joi.object({
    groupID: Joi.string().required(),
  })

  const data = schema.validate(JSON.parse(event.body || ""))
  if (data.error)
    return {
      statusCode: 400,
      body: 'Invalid Parameters for Api endpoint',
    }

  const isUsersDefaultGroup = await User.get({ userID: data.value.groupID })
  if (isUsersDefaultGroup) {
    // cant remove group id user.email(default group)
    throw new Error('Group is default for a user')
  }

  const params = {
    groupID: data.value.groupID,
  }
  const result = await Group.remove(params)

  return {
    statusCode: 200,
    body: result,
  }
})
