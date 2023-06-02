import config from '@/config'
import { headerAuthToken } from '@/lib/awsLib'
import { onError } from '@/lib/errorLib'
import { readFile } from '@/lib/fileLib'
import { Bill } from '@/types/bill'
import { fileDto } from '@/types/fileDto'
import { API } from 'aws-amplify'

export async function payBill(input: {
  bill: Bill.item
  groupID: string
  file: File | null
  ammount?: number
  authToken: string
  created?: string
}) {
  if (input.file && input.file.size > config.MAX_ATTACHMENT_SIZE) {
    alert(
      `Please pick a file smaller than ${
        config.MAX_ATTACHMENT_SIZE / 1000000
      } MB.`
    )
    return
  }

  try {
    let fileData: fileDto | undefined = undefined
    if (input.file) fileData = await readFile(input.file!)

    await API.post('bills', `/payments`, {
      ...headerAuthToken(input.authToken),
      body: {
        billID: input.bill.billID,
        ...(fileData && { file: fileData }),
        ...(input.ammount && { ammount: input.ammount }),
        ...(input.created && { created: input.created }),
      },
    })

  } catch (e: any) {
    onError(e)
  }
}
