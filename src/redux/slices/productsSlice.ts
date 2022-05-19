import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '@tilework/opus'
import FetchingAPI from '../../API/fetchingAPI'
import { CategoryType, ProductsType } from '../types'

const initialState: ProductsType = {
  products: [],
  status: 'idle',
}

client.setEndpoint('http://localhost:4000/')

export const fetchProducts = createAsyncThunk<
  ProductsType['products'],
  null,
  { state: { categories: CategoryType } }
>('fetch/products', async (_arg, thunkAPI) => {
  const currentCategory = thunkAPI.getState().categories.current_category

  const products = await FetchingAPI.fetchProducts(currentCategory)
  return products
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'pending'
        state.products = []
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success'
        state.products = [...action.payload]
      }),
})

// export const {} = productsSlice.actions

export default productsSlice.reducer
