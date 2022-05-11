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
      console.log('second')
    },
    increment(state, action) {
      console.log('third')
    },
    decrement(state, action) {
      console.log('fourth')
    },
  },
})

export const { addItemToCart, deleteItemFromCart, increment, decrement } =
  cartSlice.actions

export default cartSlice.reducer
