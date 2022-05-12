import { Currency, Product, ProductInCart } from '../redux/types'

export const selectPriceInCurrentCurrency = (
  product: Product | ProductInCart,
  currentCurrency: Currency
) => {
  const priceInCurrentCurrency = product.prices.filter(
    ({ currency }) => currency.label === currentCurrency.label
  )[0]
  return priceInCurrentCurrency
}

export const a = 1
