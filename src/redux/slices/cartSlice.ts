import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Attribute, AttributeSet, Product } from '../types'

interface ProductInCart extends Omit<Product, 'attributes'> {
  attributes: { id: AttributeSet['id']; value: Attribute['value'] }
}

interface cartSliceProps {
  items: { item: ProductInCart; count: number }[]
}

const initialState: cartSliceProps = {
  items: [],
}

const findItem = (items: cartSliceProps['items'], item: ProductInCart) => {
  console.log('first')
  // const [{ id }] = item.attributes
  // const isItemInCart = [...items].find((element) => element.item.id === item.id)
  // console.log(one)
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<Product>) {
      // const foundResults = findItem(state.items, action.payload)
      console.log('first')
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
