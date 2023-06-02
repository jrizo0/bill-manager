import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from './store'

// Type for our state
export interface authToken {
  token: string | null
}

// Initial state
const initialState: authToken = {
  token: null,
}

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthToken(state, action) {
      state.token = action.payload
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      }
    },
  },
})

export const { setAuthToken } = authSlice.actions

export const selectAuthToken = (state: AppState) => state.auth.token

export default authSlice.reducer
