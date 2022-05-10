/* eslint-disable no-restricted-syntax */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AttributesStateType } from '../../containers/ProductItem/ProductItem'
import { Product } from '../types'

export interface ProductInCart extends Omit<Product, 'attributes'> {
  attributes: AttributesStateType | null
}

interface cartSliceProps {
  items: { item: ProductInCart; count: number }[]
}

const initialState: cartSliceProps = {
  items: [],
}

const findItem = (items: cartSliceProps['items'], item: ProductInCart) => {
  const isItemInCart = [...items].find((element) => {
    const isAttributesInElement = element.item.attributes
    const isAttributesInItem = item.attributes

    if (element.item.id !== item.id) {
      return false
    }

    if (isAttributesInElement && isAttributesInItem) {
      for (const [key, value] of Object.entries(isAttributesInElement)) {
        if (isAttributesInItem[key] && isAttributesInItem[key] !== value) {
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
