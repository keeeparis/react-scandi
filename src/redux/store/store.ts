import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../slices/modalSlice'
import baseReducer from '../slices/baseSlice'
import cartReducer from '../slices/cartSlice'
import categoriesReducer from '../slices/categoriesSlice'
import productsReducer from '../slices/productsSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    base: baseReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
