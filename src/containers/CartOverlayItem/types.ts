import { Currency, ProductInCart } from '../../redux/types'
import { mapDispatchToProps } from './CartOverlayItem'

export interface CartOverlayItemProps {
  item: ProductInCart
  count: number
  currentCurrency: Currency
  size: 'sm' | 'lg'
}

export type DispatchProps = ReturnType<typeof mapDispatchToProps>

export type Props = DispatchProps & CartOverlayItemProps
