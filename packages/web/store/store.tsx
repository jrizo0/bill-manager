import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import dataSlice from './billSlice'

export function makeStore() {
  return configureStore({
    reducer: { auth: authSlice, allBills: dataSlice },
    devTools: true,
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
