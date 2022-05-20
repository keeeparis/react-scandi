/* eslint-disable import/prefer-default-export */
import { ProductInCart } from '../../redux/types'

/** Returns string of Product id and its Selected Attributes. */
export const idWithAttrs = (item: ProductInCart) => `
  ${item.id}${Object.values(item.selectedAttributes)}
`
