import { Bill } from '@bill-manager/core/bill'
import { Payment } from '@bill-manager/core/payment'
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

  const bill = await Bill.getById(data.value.id)
  await User.userCanAccessGroup({
    groupID: bill!.groupID,
    userID: session.properties.userID,
  })

  const { month, year } = event.queryStringParameters ?? {}

  const params = {
    billID: data.value.id,
    ...(month && { month: Number(month) }),
    ...(year && { year: Number(year) }),
  }

  const result = await Payment.list(params)

  return {
    statusCode: 200,
    body: result,
  }
})
