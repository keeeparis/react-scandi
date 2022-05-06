import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '@tilework/opus'
import FetchingAPi from '../../API/fetchingAPI'
import { CategoryType } from '../types'

const initialState: CategoryType = {
  status: 'idle',
  categories: [],
  current_category: { name: '' },
}

client.setEndpoint('http://localhost:4000/')

export const fetchCategories = createAsyncThunk(
  'fetch/categories',
  async () => {
    const categories = FetchingAPi.fetchCategories()
    return categories
  }
)

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    updateCurrentCategory(state, action) {
      state.current_category = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const [firstCategory] = action.payload
        state.status = 'success'
        state.categories = [...action.payload]
        // set default category to first category
        state.current_category = firstCategory
      }),
})

export const { updateCurrentCategory } = categoriesSlice.actions

export default categoriesSlice.reducer
