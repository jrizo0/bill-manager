import { Group } from '@bill-manager/core/group'
import Joi from 'joi'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  })

  const data = schema.validate(JSON.parse(event.body || ""))
  if (data.error)
    return {
      statusCode: 400,
      body: 'Invalid Parameters for Api endpoint',
    }

  const params = {
    name: data.value.name,
  }
  const result = await Group.create(params)

  Group.addUserGroup({
    groupID: result.groupID,
    userID: session.properties.userID,
  })

  return {
    statusCode: 200,
    body: result,
  }
})
