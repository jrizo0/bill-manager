import {
  BillManager,
  CreateBillItem,
  BillItem,
  BillQueryResponse,
} from './entities'

export * as Bill from './bill'

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

export async function remove(input: { groupID: string; billID: string }) {
  return BillManager.entities.bill
    .remove({
      billID: input.billID,
      groupID: input.groupID,
    })
    .go()
    .then((_) => 'Bill deleted')
    .catch((_) => {
      throw new Error('Bill could not be deleted')
    })
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
        val !== undefined && !['groupID', 'billID'].includes(key)
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
      throw new Error('Bill could not be updated')
    })
}
