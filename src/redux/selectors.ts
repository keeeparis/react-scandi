import { selectPriceInCurrentCurrency } from '../utils/selectPriceInCurrentCurrency'
import { RootState } from './store/store'

export const selectAmountOfItemsInCart = (state: RootState) => {
  const result = state.cart.items.reduce((total, { count }) => total + count, 0)
  return result
}

export const selectTotalPrice = (state: RootState) => {
  const result = state.cart.items.reduce(
    (total, { count, item }) =>
      total +
      count *
        selectPriceInCurrentCurrency(item, state.currency.currentCurrency)
          .amount,
    0
  )
  return result
}
