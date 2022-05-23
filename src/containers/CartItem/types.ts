import { Currency, ProductInCart } from '../../redux/types'
import { mapDispatchToProps } from './CartItem'

export interface CartItemProps {
  item: ProductInCart
  count: number
  currentCurrency: Currency
  size: 'sm' | 'lg'
}

export type DispatchProps = ReturnType<typeof mapDispatchToProps>

export type Props = DispatchProps & CartItemProps
