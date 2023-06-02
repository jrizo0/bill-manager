import { Bill } from "./bill"

export type allBillsDTO = {
  groupID: string
  groupName: string
  created?: string
  bills: {
    data: Bill.item[]
    cursor?: any
  }
}[]
