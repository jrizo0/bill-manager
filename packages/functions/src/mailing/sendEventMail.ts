import { getUnpaidOnes } from '@bill-manager/core/bill'
import { Mailing } from '@bill-manager/core/mailing'
import { User } from '@bill-manager/core/user'

export async function main() {
  console.log('Creating events to send emails')
  await Mailing.create()
}
