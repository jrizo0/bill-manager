export interface bill {
  billID: string
  tag: string
  paymentWeb: string
  expirationDay: number
  reference: string
  created: Date
  paid: boolean
}
