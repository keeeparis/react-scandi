import { configureStore } from '@reduxjs/toolkit'

import productsReducer from '../slices/productsSlice'
import cartReducer from '../slices/cartSlice'
import { mainApi } from '../services/main'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
