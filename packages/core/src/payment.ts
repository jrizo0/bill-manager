import moment from 'moment'
import { Bill } from './bill'
import { BillManager, UserItem } from './entities'

export * as Payment from './payment'

export async function payBill(input: {
  pay: {
    billID: string
    user: UserItem
    created?: string
  }
  groupID: string
}) {
  let creationDate = input.pay.created
    ? moment(input.pay.created).utc()
    : moment.utc()
  const now = moment().utc()
  if (creationDate > now) {
    throw new Error('Payment date in the future.')
  }

  try {
    const billInfo = await Bill.get({
      billID: input.pay.billID,
      groupID: input.groupID,
    })
    const currentLastPaymentOfBill = moment(billInfo.lastPayment).utc()

    if (creationDate > currentLastPaymentOfBill || !billInfo.lastPayment) {
      await BillManager.transaction
        .write(({ bill, payment }) => [
          payment
            .create({
              ...input.pay,
              created: creationDate.format(),
              month: creationDate.month(),
              year: creationDate.year(),
            })
            .commit(),
          bill
            .patch({ billID: input.pay.billID, groupID: input.groupID })
            .set({
              lastPayment: creationDate.format(),
            })
            .commit(),
        ])
        .go()
    } else {
      await BillManager.entities.payment
        .create({
          ...input.pay,
          created: creationDate.format(),
          month: creationDate.month(),
          year: creationDate.year(),
        })
        .go()
    }

    return 'Bill paid'
  } catch (error) {
    throw new Error("Couldn't register payment " + error)
  }
}

export async function get(input: { paymentID: string; billID: string }) {
  return BillManager.entities.payment
    .get({
      paymentID: input.paymentID,
      billID: input.billID,
    })
    .go()
}

export async function listByMonth(input: { billID: string; month: number }) {
  return BillManager.entities.payment.query
    .bill({
      billID: input.billID,
      month: input.month,
    })
    .go()
}

export async function listByYear(input: { billID: string; year: number }) {
  return BillManager.entities.payment.query
    .bill({
      billID: input.billID,
      year: input.year,
    })
    .go()
}

export async function list(input: {
  billID: string
  month?: number
  year?: number
}) {
  /*
   NOTE: Returns only payments, allow filtering month and year
  return BillManager.entities.payment.query
    .history(input)
    .go({ order: 'desc' })
    .then((value) => value)
  */

  /*
   NOTE: Returns all info of bill, and list of payments, doesn't let month year query
  */
  return BillManager.collections
    .record({
      billID: input.billID,
    })
    .go({ order: 'desc' })
    .then((value) => value)
}

export async function remove(input: {
  paymentID: string
  billID: string
  groupID: string
}) {
  const billListPayments = await list({ billID: input.billID })
  const billLastPayment = billListPayments.data.payment.at(0)?.created || ''

  const payment = await get(input)

  if (!payment.data) throw new Error('Payment does not exist')

  const PAYMENT_IS_LAST_PAY_OF_BILL = billLastPayment === payment.data.created
  try {
    if (PAYMENT_IS_LAST_PAY_OF_BILL) {
      const newBillLastPayment =
        billListPayments.data.payment.at(1)?.created || ''
      const transaction = await BillManager.transaction
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
              lastPayment: newBillLastPayment,
            })
            .commit(),
        ])
        .go()
      if (transaction.canceled) throw new Error()
    } else {
      await BillManager.entities.payment
        .delete({
          billID: input.billID,
          paymentID: input.paymentID,
        })
        .go()
    }
    return 'Payment deleted'
  } catch (error) {
    throw new Error("Couldn't remove payment")
  }
}

export async function update(input: {
  paymentID: string
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
        val !== undefined && !['paymentID', 'billID'].includes(key)
    )
  )
  if (Object.keys(newProperties).length === 0) return 'No info provided'

  return BillManager.entities.payment
    .patch({
      paymentID: input.paymentID,
      billID: input.billID,
    })
    .set(newProperties)
    .go()
    .then((_item) => 'Payment updated')
    .catch((_err) => {
      throw new Error('Payment could not be updated')
    })
}
