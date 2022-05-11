import { Product, SelectedAttributesType } from '../../redux/types'
import { KeyofOnlyString, ValueOf } from '../../types'

export interface AttributesPopUpProps {
  handleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (
    name: KeyofOnlyString<SelectedAttributesType>,
    value: ValueOf<SelectedAttributesType>
  ) => () => void
  product: Product
  selectedAttributes: SelectedAttributesType
}
