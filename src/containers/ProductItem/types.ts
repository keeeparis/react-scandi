import { Product, SelectedAttributesType } from '../../redux/types'
import { mapDispatchToProps, mapStateToProps } from './ProductItem'

export interface OwnProps {
  product: Product
}

export interface ProductItemState {
  isPopUp: boolean
  selectedAttributes: SelectedAttributesType
}

export type StateProps = ReturnType<typeof mapStateToProps>
export type DispatchProps = ReturnType<typeof mapDispatchToProps>
export type Props = StateProps & DispatchProps & OwnProps
