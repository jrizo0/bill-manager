import { Bill } from '@bill-manager/core/bill'
import { User } from '@bill-manager/core/user'
import Joi from 'joi'
import handler from 'src/auth/handler'

export const main = handler(async (event, session) => {
  const schema = Joi.object({
    billID: Joi.string().required(),
  })

  const data = schema.validate(JSON.parse(event.body || ''))
  if (data.error) {
    throw new Error('Error on http body')
  }
  const bill = await Bill.getById(data.value.billID)
  await User.userCanAccessGroup({
    groupID: bill!.groupID,
    userID: session.properties.userID,
  })

  const params = {
    groupID: bill!.groupID,
    billID: bill!.billID,
  }

  const result = await Bill.remove(params)

  return {
    statusCode: 200,
    body: result,
  }
})
