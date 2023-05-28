import { Bill } from '@bill-manager/core/bill'
import { Payment } from '@bill-manager/core/payment'
import { User } from '@bill-manager/core/user'
import { S3 } from 'aws-sdk'
import Joi from 'joi'
import handler from 'src/auth/handler'

import { Bucket } from 'sst/node/bucket'

export const main = handler(async (event, session) => {
  const schema = Joi.object({
    billID: Joi.string().required(),
    created: Joi.string().optional(),
    file: Joi.object({
      name: Joi.string().required(),
      type: Joi.string().required(),
      data: Joi.string().required(),
    }).optional(),
    ammount: Joi.number().optional(),
  })
  const data = schema.validate(JSON.parse(event.body || ""))
  if (data.error) {
    return {
      statusCode: 400,
      body: 'Invalid Parameters for Api endpoint',
    }
  }

  const bill = await Bill.getById(data.value.billID)
  await User.userCanAccessGroup({
    groupID: bill!.groupID,
    userID: session.properties.userID,
  })

  let attachment: string | undefined = undefined
  if (data.value.file) {
    // Upload the file
    const fileName = `private/${bill!.groupID}/${Date.now()}-${
      data.value.file.name
    }`
    attachment = await uploadAttachment({
      data: data.value.file.data,
      name: fileName,
      type: data.value.file.type,
    })
  }

  const userInfo = await User.get({
    userID: session.properties.userID,
  })

  const params = {
    pay: {
      billID: data.value.billID,
      user: {
        userID: session.properties.userID,
        email: userInfo.email,
        name: userInfo.name,
      },
      ...(data.value.ammount && { ammount: data.value.ammount }),
      ...(attachment && { attachment: attachment }),
      ...(data.value.created && { created: data.value.created }),
    },
    groupID: bill!.groupID,
  }

  const result = await Payment.payBill(params)

  return {
    statusCode: 200,
    body: result,
  }
})

const uploadAttachment = async (file: {
  data: string
  name: string
  type: string
}) => {
  const s3 = new S3()

  const encodedFile = file.data
  const decodedFile = Buffer.from(encodedFile, 'base64')

  const bucketName = Bucket.PayUploads.bucketName
  const contentType = file.type

  const params = {
    Bucket: bucketName,
    Key: file.name,
    Body: decodedFile,
    ContentType: contentType,
  }

  // await s3.putObject(params).promise()
  return new Promise<string>((resolve, _reject) => {
    s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
      if (err) throw new Error('Error on file upload')
      resolve(data.Key)
    })
  })
}
