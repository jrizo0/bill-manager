import { Group } from '@bill-manager/core/group'
import Joi from 'joi'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const schema = Joi.object({
    groupID: Joi.string().default(session.properties.userID),
    name: Joi.string().optional(),
  })

  const data = schema.validate(JSON.parse(event.body || ""))
  if (data.error) {
    return {
      statusCode: 400,
      body: 'Invalid Parameters for Api endpoint',
    }
  }

  const params = {
    groupID: data.value.groupID,
    name: data.value.name,
  }

  const result = await Group.update(params)

  return {
    statusCode: 200,
    body: result,
  }
})
