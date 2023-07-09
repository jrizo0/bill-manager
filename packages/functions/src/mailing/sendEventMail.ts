import { Bill } from '@bill-manager/core/bill'
import { Mailing } from '@bill-manager/core/mailing'
import { User } from '@bill-manager/core/user'

export async function main() {
  console.log('Creating events to send emails...')
  const unpaid = await Bill.getUnpaidOnes()

  for (const bill of unpaid.data) {
    const ownerUsers = await User.listUsersForGroup({ groupID: bill.groupID })
    console.log(ownerUsers.unprocessed)

    for (const user of ownerUsers.data) {
      await Mailing.createSendMailEvent(user.name, user.email, bill.tag)
      console.log('- Created send email event, with info')
      console.log(
        JSON.stringify({
          name: user.name,
          email: user.email,
          billtag: bill.tag,
        })
      )
    }
  }
}
