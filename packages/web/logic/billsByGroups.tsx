import { allBillsDTO } from '@/types/allBillsDTO'
import { Bill } from '@/types/bill'
import { Group } from '@/types/group'

export type billsByGroup = {
  group: Group.item
  bills: Bill.item[]
}

export const fromDTO = (
  res: allBillsDTO
): {
  groupsIndex: { [key: string]: number }
  billsIndex: { [key: string]: number }
  billsByGroups: billsByGroup[]
} => {
  const groupsIndex: { [key: string]: number } = {}
  const billsIndex: { [key: string]: number } = {}

  const billsByGroups: billsByGroup[] = res.map(
    ({ bills: billsData, ...groupData }, i) => {
      groupsIndex[groupData.groupID] = i
      const bills = billsData.data.map((billData, j) => {
        billsIndex[billData.billID] = j
        return {
          ...billData,
          index: j,
        }
      })
      return {
        group: {
          ...groupData,
          ...{ name: groupData.groupName },
          index: i,
        },
        bills: bills,
      }
    }
  )

  return {
    groupsIndex: groupsIndex,
    billsIndex: billsIndex,
    billsByGroups: billsByGroups,
  }
}

export const setDefaultGroupAtIndex0 = (groups: allBillsDTO) => {
  const indexGroupUser: number = groups.findIndex(
    (g) => g.groupName === g.groupID
  )
  if (indexGroupUser === -1) return groups
  if (groups[0] && groups[indexGroupUser])
    [groups[0], groups[indexGroupUser]] = [groups[indexGroupUser], groups[0]]
  return groups
}
