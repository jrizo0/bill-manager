import { Bill } from '@bill-manager/core/bill'
import { Payment } from '@bill-manager/core/payment'
import { User } from '@bill-manager/core/user'
import { S3 } from 'aws-sdk'
import Joi from 'joi'
import handler from 'src/auth/handler'
import { Bucket } from 'sst/node/bucket'

export const main = handler(async (event, session) => {
  const schema = Joi.object<{ bill: string; pay: string }>({
    bill: Joi.string().required(),
    pay: Joi.string().required(),
  })

  const data = schema.validate(event.pathParameters)
  if (data.error)
    return {
      statusCode: 400,
      body: 'Invalid Parameters for Api endpoint',
    }

  const bill = await Bill.getById(data.value.bill)
  await User.userCanAccessGroup({
    groupID: bill!.groupID,
    userID: session.properties.userID,
  })

  const params = {
    paymentID: data.value.pay,
    billID: data.value.bill,
  }

  const payment = await Payment.get(params)

  let attachmentUrl: string | undefined = undefined
  if (payment.data && payment.data.attachment) {
    attachmentUrl = getPresignedGETURL({ fileKey: payment.data.attachment })
  }

  const result = {
    ...payment,
    ...(attachmentUrl ? { attachmentUrl: attachmentUrl } : {}),
  }

  return {
    statusCode: 200,
    body: result,
  }
})

const getPresignedGETURL = (input: { fileKey: string }) => {
  const s3 = new S3()

  const presignedGETURL = s3.getSignedUrl('getObject', {
    Bucket: Bucket.PayUploads.bucketName,
    Key: input.fileKey,
    Expires: 30,
  })

  return presignedGETURL
}
