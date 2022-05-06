import { configureStore } from '@reduxjs/toolkit'

import productsReducer from '../slices/productsSlice'
import cartReducer from '../slices/cartSlice'
import categoriesReducer from '../slices/categoriesSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
