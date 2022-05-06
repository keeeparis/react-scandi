import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client, Field, Query } from '@tilework/opus'
import { RootState } from '../store/store'
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

// TODO: I don't need to explicitly define selectors,
// as I definded them in Component mapStateToProps
export const selectCategories = (state: RootState) =>
  state.categories.categories
export const selectCurrentCategory = (state: RootState) =>
  state.categories.current_category
export const selectStatus = (state: RootState) => state.categories.status

export default categoriesSlice.reducer
