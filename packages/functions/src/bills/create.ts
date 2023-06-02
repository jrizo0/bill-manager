import { Bill } from '@bill-manager/core/bill'
import { User } from '@bill-manager/core/user'
import Joi from 'joi'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const schema = Joi.object({
    groupID: Joi.string().default(session.properties.userID),
    tag: Joi.string().required(),
    paymentWeb: Joi.string().required(),
    expirationDay: Joi.number().required(),
    reference: Joi.string().required(),
  })

  const data = schema.validate(JSON.parse(event.body || ''))
  if (data.error) {
    throw new Error('Error on http body')
  }
  await User.userCanAccessGroup({
    groupID: data.value.groupID,
    userID: session.properties.userID,
  })

  const params = {
    groupID: data.value.groupID,
    tag: data.value.tag,
    paymentWeb: data.value.paymentWeb,
    expirationDay: Number(data.value.expirationDay),
    reference: data.value.reference,
    created: new Date().toISOString(),
  }

  const result = await Bill.create(params)

  return {
    statusCode: 200,
    body: result,
  }
})
