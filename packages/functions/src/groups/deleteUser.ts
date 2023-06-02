import { Group } from '@bill-manager/core/group'
import { User } from '@bill-manager/core/user'
import Joi from 'joi'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const schema = Joi.object({
    groupID: Joi.string().required(),
    email: Joi.string().required(),
  })

  const data = schema.validate(JSON.parse(event.body || ""))
  if (data.error)
    return {
      statusCode: 400,
      body: 'Invalid Parameters for Api endpoint',
    }

  const user = await User.queryByEmail({ email: data.value.email })
  const params = {
    groupID: data.value.groupID,
    userID: user!.userID,
  }
  const result = await Group.removeUserGroup(params)

  return {
    statusCode: 200,
    body: result,
  }
})
