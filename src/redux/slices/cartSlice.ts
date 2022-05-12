/* eslint-disable no-restricted-syntax */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cartSliceProps, ProductInCart } from '../types'

const initialState: cartSliceProps = {
  items: [],
}

const findItem = (items: cartSliceProps['items'], item: ProductInCart) => {
  const isItemInCart = [...items].find((element) => {
    const attributesInElement = element.item.selectedAttributes
    const attributesInItem = item.selectedAttributes

    if (element.item.id !== item.id) {
      return false
    }

    if (attributesInElement && attributesInItem) {
      for (const [key, value] of Object.entries(attributesInElement)) {
        if (attributesInItem[key] && attributesInItem[key] !== value) {
          return false
        }
      }
    }

    return true
  })

  return isItemInCart
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<ProductInCart>) {
      const candidateItem = action.payload
      const isItem = findItem(state.items, candidateItem)

      if (isItem) {
        isItem.count += 1
      } else {
        state.items.push({ item: candidateItem, count: 1 })
      }
    },
    deleteItemFromCart(state, action) {
      const foundProduct = findItem(state.items, action.payload)
      if (foundProduct) state.items.splice(state.items.indexOf(foundProduct), 1)
    },
    resetCart(state) {
      state.items = []
    },
    increment(state, action: PayloadAction<ProductInCart>) {
      const isItem = findItem(state.items, action.payload)

      if (isItem) {
        isItem.count += 1
      }
    },
    decrement(state, action: PayloadAction<ProductInCart>) {
      const isItem = findItem(state.items, action.payload)

      if (!isItem) return

      if (isItem.count > 1) {
        isItem.count -= 1
      } else {
        state.items.splice(state.items.indexOf(isItem), 1)
      }
    },
  },
})

export const {
  addItemToCart,
  deleteItemFromCart,
  resetCart,
  increment,
  decrement,
} = cartSlice.actions

export default cartSlice.reducer
