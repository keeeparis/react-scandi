import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client, Field, Query } from '@tilework/opus'
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
>('fetch/products', async (arg, thunkAPI) => {
  /* TODO: вынести в отдельный модудь АПИ */
  const currentCategory = thunkAPI.getState().categories.current_category.name
  const productFields = [
    'name',
    'id',
    'inStock',
    'gallery',
    'description',
    'category',
    'brand',
  ] as const
  const attributesFields = ['id', 'name', 'type'] as const
  const attributeFields = ['id', 'value', 'displayValue'] as const

  const productsQuery = new Query('category')
    .addArgument('input', 'CategoryInput', {
      title: currentCategory,
    })
    .addField(
      new Field('products', true)
        .addFieldList(productFields)
        .addField(
          new Field('attributes', true)
            .addFieldList(attributesFields)
            .addField(new Field('items', true).addFieldList(attributeFields))
        )
        .addField(
          new Field('prices', true)
            .addField('amount')
            .addField(
              new Field('currency').addField('label').addField('symbol')
            )
        )
    )

  const {
    category: { products },
  } = await client.post(productsQuery)

  return products
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'pending'
        state.products = []
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success'
        state.products = [...action.payload]
      }),
})

// export const { increment } = productsSlice.actions

export default productsSlice.reducer
