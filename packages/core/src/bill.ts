import {
  BillManager,
  CreateBillItem,
  BillItem,
  BillQueryResponse,
} from './entities'
import { Group } from './group'
import { Payment } from './payment'

export * as Bill from './bill'

export async function getUnpaidOnes() {
  const today = new Date()
  const prevMonthDate = new Date()
  prevMonthDate.setDate(0) // Get the last day of prev month
  return BillManager.entities.bill.scan
    .where(({ expirationDay }, { eq }) => {
      return `${eq(expirationDay, today.getDate() + 1)}` // expires in one day
    })
    .where(({ lastPayment }, { lt }) => {
      return `${lt(lastPayment, prevMonthDate.toString())}` // not paid
    })
    .go()
    .then((items) => items)
    .catch((reason) => {
      throw new Error(reason)
    })
}

export async function create(item: CreateBillItem): Promise<BillItem> {
  return BillManager.entities.bill
    .create(item)
    .go()
    .then((item) => item.data!)
    .catch((reason) => {
      throw new Error(reason)
    })
}

export async function get(input: {
  billID: string
  groupID: string
}): Promise<BillItem> {
  return BillManager.entities.bill
    .get({
      billID: input.billID,
      groupID: input.groupID,
    })
    .go()
    .then((item) => item.data!)
    .catch((reason) => {
      throw new Error(reason)
    })
}

export async function listByGroup(groupID: string): Promise<BillQueryResponse> {
  return BillManager.entities.bill.query
    .group({
      groupID: groupID,
    })
    .go()
    .then((items) => items)
    .catch((reason) => {
      throw new Error(reason)
    })
}

export async function listAllUser(userID: string) {
  const groupsOfUser = await Group.listGroupsOfUser({ userID: userID })

  let response = []

  for (const group of groupsOfUser.data) {
    const bills = await listByGroup(group.groupID)
    response.push({
      groupID: group.groupID,
      groupName: group.name,
      bills: bills,
    })
  }

  return response
}

export async function getById(billID: string) {
  return BillManager.entities.bill.query
    .billLookup({
      billID: billID,
    })
    .go()
    .then((value) => value.data.at(0))
}

export async function remove(input: { groupID: string; billID: string }) {
  try {
    const payments = await Payment.list(input)
    const paymentsIDs: {
      billID: string
      paymentID: string
    }[] = payments.data!.payment.map((val) => {
      return { paymentID: val.paymentID, billID: val.billID }
    })

    await BillManager.entities.payment
      .delete(paymentsIDs)
      .go({ concurrency: 1 })

    await BillManager.entities.bill
      .remove({
        billID: input.billID,
        groupID: input.groupID,
      })
      .go()
    return 'Bill deleted'
  } catch (error) {
    throw new Error('Bill could not be deleted')
  }
}

export async function update(input: {
  groupID: string
  billID: string
  tag?: string
  paymentWeb?: string
  expirationDay?: number
  reference?: string
  lastPayment?: string
}) {
  const newProperties = Object.fromEntries(
    Object.entries(input).filter(
      ([key, val]) =>
        val !== undefined && !['groupID', 'billID', 'lastPayment'].includes(key)
    )
  )
  if (Object.keys(newProperties).length === 0) return 'No info provided'

  return BillManager.entities.bill
    .patch({
      billID: input.billID,
      groupID: input.groupID,
    })
    .set(newProperties)
    .go()
    .then((_item) => 'Bill updated')
    .catch((_err) => {
      throw new Error('Bill could not be updated ' + _err)
    })
}
