import { Bill } from '@bill-manager/core/bill'
import { User } from '@bill-manager/core/user'
import Joi from 'joi'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const schema = Joi.object({
    groupID: Joi.string().default(session.properties.userID),
    billID: Joi.string().required(),
    tag: Joi.string().optional(),
    paymentWeb: Joi.string().optional(),
    expirationDay: Joi.number().optional(),
    reference: Joi.string().optional(),
    lastPayment: Joi.any().optional(),
    index: Joi.any().optional(),
    created: Joi.string().optional(),
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
    billID: data.value.billID,
    tag: data.value.tag,
    paymentWeb: data.value.paymentWeb,
    expirationDay: data.value.expirationDay,
    reference: data.value.reference,
    lastPayment: data.value.lastPayment,
  }

  const result = await Bill.update(params)
  return {
    statusCode: 200,
    body: result,
  }
})
