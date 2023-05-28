import { Bill } from './bill'

export * as Payment from './payment'

export type item = {
  paymentID: string
  billID: string
  user: {
    userID: string
    name: string
    email: string
  }
  created: string
  month: string
  year: number
  attachment?: string
  ammount?: number
  attachmentUrl?: string
}

export type listDTO = {
  data: {
    bill: Bill.item[]
    payment: item[]
  }
  cursor: any
}
