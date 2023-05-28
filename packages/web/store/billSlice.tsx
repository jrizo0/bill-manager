import { Bill } from '@/types/bill'
import { Group } from '@/types/group'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from './store'
import { allBillsDTO } from '@/types/allBillsDTO'
import {
  billsByGroup,
  fromDTO,
  setDefaultGroupAtIndex0,
} from '@/logic/billsByGroups'

// Initial state
const initialState: {
  groupsIndex: { [key: string]: number }
  billsIndex: { [key: string]: number }
  billsByGroups: billsByGroup[] | undefined
} = {
  groupsIndex: {},
  billsIndex: {},
  billsByGroups: undefined,
}

// Actual Slice
export const dataSlice = createSlice({
  name: 'allBills',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<allBillsDTO>) {
      const dataOrdered = setDefaultGroupAtIndex0(action.payload)
      const { billsByGroups, billsIndex, groupsIndex } = fromDTO(dataOrdered)
      state.billsByGroups = billsByGroups
      state.billsIndex = billsIndex
      state.groupsIndex = groupsIndex
    },

    setBill(
      state,
      action: PayloadAction<{
        groupID: string
        billID: string
        bill: Bill.item
      }>
    ) {
      if (!state.billsByGroups) return
      const { groupID, billID } = action.payload
      const groupIndex = state.groupsIndex[groupID]
      const billIndex = state.billsIndex[billID]
      state.billsByGroups[groupIndex].bills[billIndex] = action.payload.bill
    },

    setLastPayment(
      state,
      action: PayloadAction<{
        groupID: string
        billID: string
        lastPayment: string
      }>
    ) {
      if (!state.billsByGroups) return
      const { groupID, billID } = action.payload
      const groupIndex = state.groupsIndex[groupID]
      const billIndex = state.billsIndex[billID]
      state.billsByGroups[groupIndex].bills[billIndex].lastPayment =
        action.payload.lastPayment
    },

    addBill(
      state,
      action: PayloadAction<{
        groupID: string
        bill: Bill.item
      }>
    ) {
      if (!state.billsByGroups) return
      const { groupID } = action.payload
      const groupIndex = state.groupsIndex[groupID]
      state.billsByGroups[groupIndex].bills.push(action.payload.bill)
    },

    deleteBill(
      state,
      action: PayloadAction<{
        groupID: string
        billID: string
      }>
    ) {
      if (!state.billsByGroups) return
      const { groupID, billID } = action.payload
      const groupIndex = state.groupsIndex[groupID]
      const billIndex = state.billsIndex[billID]
      state.billsByGroups[groupIndex].bills.splice(billIndex, 1)
    },

    addGroup(
      state,
      action: PayloadAction<{
        group: Group.item
      }>
    ) {
      if (!state.billsByGroups) return
      const newGroup: billsByGroup = {
        ...{ group: action.payload.group },
        bills: [],
      }
      state.billsByGroups.push(newGroup)
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.data,
      }
    },
  },
})

export const {
  setData,
  setBill,
  setLastPayment,
  addBill,
  deleteBill,
  addGroup,
} = dataSlice.actions

export const selectBillsByGroups = (state: AppState) =>
  state.allBills.billsByGroups

export default dataSlice.reducer
