import { Product, SelectedAttributesType } from '../../redux/types'
import { mapDispatchToProps } from './ProductItem'

export interface OwnProps {
  product: Product
}

export interface ProductItemState {
  isPopUp: boolean
  selectedAttributes: SelectedAttributesType
}

export type DispatchProps = ReturnType<typeof mapDispatchToProps>
export type Props = DispatchProps & OwnProps
