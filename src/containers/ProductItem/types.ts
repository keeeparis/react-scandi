import { Attribute, AttributeSet, Product } from '../../redux/types'
import { KeyofOnlyString, ValueOf } from '../../types'
import { mapDispatchToProps, mapStateToProps } from './ProductItem'

export interface OwnProps {
  product: Product
}

export type AttributesStateType = {
  [x: AttributeSet['id']]: Attribute['value']
}

export interface ProductItemState {
  isPopUp: boolean
  attributes: AttributesStateType
}

export type StateProps = ReturnType<typeof mapStateToProps>
export type DispatchProps = ReturnType<typeof mapDispatchToProps>
export type Props = StateProps & DispatchProps & OwnProps

export interface PopUpProps {
  handleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (
    name: KeyofOnlyString<AttributesStateType>,
    value: ValueOf<AttributesStateType>
  ) => () => void
  product: Product
  attributes: AttributesStateType
}
