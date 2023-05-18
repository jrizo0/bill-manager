import { BillManager, CreatePaymentItem } from './entities'

export * as Payment from './payment'

export async function payBill(item: CreatePaymentItem, groupID: string) {
  const result = await BillManager.transaction
    .write(({ bill, payment }) => [
      payment.create(item).commit(),
      bill
        .patch({ billID: item.billID, groupID: groupID })
        .set({
          lastPayment: item.created,
        })
        .commit(),
    ])
   .go()
  if (result.canceled) throw new Error("Couldn't register payment")
  return result
}

export async function get(input: {
  paymentID: string
  billID: string
  month: number
  year: number
}) {
  return BillManager.entities.payment
    .get({
      paymentID: input.paymentID,
      billID: input.billID,
    })
    .go()
}

export async function listByBillByMonth(input: {
  billID: string
  month: number
}) {
  return BillManager.entities.payment.query
    .bill({
      billID: input.billID,
      month: input.month,
    })
    .go()
}

export async function list(input: { billID: string }) {
  return BillManager.collections
    .record({
      billID: input.billID,
    })
    .go()
}

export async function remove(input: {
  paymentID: string
  billID: string
  groupID: string
}) {
  const lastPayment = await list(input)

  const result = await BillManager.transaction
    .write(({ bill, payment }) => [
      payment
        .delete({
          billID: input.billID,
          paymentID: input.paymentID,
        })
        .commit(),
      bill
        .patch({
          billID: input.billID,
          groupID: input.groupID,
        })
        .set({
          lastPayment: lastPayment.data.payment.at(0)!.created,
        })
        .commit(),
    ])
    .go()
  if (result.canceled) throw new Error("Couldn't remove payment")
  return result
}

export async function update(input: {}) {
  throw new Error('Not implemented')
}
