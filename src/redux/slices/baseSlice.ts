import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import FetchingAPI from '../../API/fetchingAPI'
import { BaseSliceType } from '../types'

const initialState: BaseSliceType = {
  currencies: [],
  currentCurrency: { label: '', symbol: '' },
  status: 'idle',
}

export const fetchCurrencies = createAsyncThunk(
  'fetch/currencies',
  async () => {
    const currencies = FetchingAPI.fetchCurrencies()
    return currencies
  }
)

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    updateCurrentCurrency(state, action) {
      state.currentCurrency = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCurrencies.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        const [firstCurrency] = action.payload
        state.status = 'success'
        state.currencies = [...action.payload]
        // set default currency to first currency
        state.currentCurrency = firstCurrency
      }),
})

export const { updateCurrentCurrency } = baseSlice.actions

export default baseSlice.reducer
