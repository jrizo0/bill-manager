import { Group } from '@bill-manager/core/group'
import { User } from '@bill-manager/core/user'
import Joi from 'joi'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const schema = Joi.object<{ id: string }>({
    id: Joi.string().required(),
  })

  const data = schema.validate(event.pathParameters)
  if (data.error)
    return {
      statusCode: 400,
      body: 'Invalid Parameters for Api endpoint',
    }

  await User.userCanAccessGroup({
    groupID: data.value.id,
    userID: session.properties.userID,
  })

  const params = {
    groupID: data.value.id,
  }

  const result = await Group.get(params)

  return {
    statusCode: 200,
    body: result,
  }
})
