import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '@tilework/opus'
import FetchingAPi from '../../API/fetchingAPI'
import { ProductSliceType } from '../types'

const initialState: ProductSliceType = {
  status: 'idle',
  item: null,
}

client.setEndpoint('http://localhost:4000/')

export const fetchProduct = createAsyncThunk(
  'fetch/product',
  async (id: string) => {
    const product = await FetchingAPi.fetchProductById(id)
    return product
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'pending'
        state.item = null
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'success'
        state.item = action.payload
      }),
})

// export const {} = productSlice.actions

export default productSlice.reducer
