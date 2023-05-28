export * as Bill from './bill'

export type create = {
  groupID?: string
  tag: string
  paymentWeb: string
  expirationDay: number
  reference: string
}

export type item = {
  billID: string
  groupID: string
  tag: string
  lastPayment: string
  created: Date
  paymentWeb: string
  expirationDay: number
  reference: string
}
