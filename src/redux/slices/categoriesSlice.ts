import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client, DeepReadonlyArray, Field, Query } from '@tilework/opus'
import { RootState } from '../store/store'

interface CategoryType {
  status: string
  categories: DeepReadonlyArray<{ name: unknown }>
}

const initialState: CategoryType = {
  status: 'idle',
  categories: [],
}

client.setEndpoint('http://localhost:4000/')

export const fetchCategories = createAsyncThunk(
  'fetch/categories',
  async () => {
    const categoriesQuery = new Query('categories', true).addField(
      new Field('name')
    )
    const { categories }: { categories: CategoryType['categories'] } =
      await client.post(categoriesQuery)
    return categories
  }
)

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'success'
        state.categories = [...action.payload]
      }),
})

// export const { increment } = categoriesSlice.actions

export const selectCategories = (state: RootState) =>
  state.categories.categories

export default categoriesSlice.reducer
