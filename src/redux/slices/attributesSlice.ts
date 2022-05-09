import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../types'

interface AttributesSliceProps {
  product: Product | null
}

const initialState: AttributesSliceProps = {
  product: null,
}

export const attributesSlice = createSlice({
  name: 'attributes',
  initialState,
  reducers: {
    updateProduct(state, action) {
      state.product = action.payload
    },
  },
})

export const { updateProduct } = attributesSlice.actions

export default attributesSlice.reducer
