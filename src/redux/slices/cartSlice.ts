import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment() {
      console.log('first')
    },
  },
})

export const { increment } = cartSlice.actions

export default cartSlice.reducer
