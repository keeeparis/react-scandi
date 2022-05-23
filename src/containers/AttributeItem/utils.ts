/* eslint-disable no-nested-ternary */
import { DeepReadonlyObject } from '@tilework/opus'
import cn from 'classnames'
import { Attribute, AttributeSet } from '../../redux/types'
import { stylesFromSize } from '../../utils/stylesFromSize'
import styles from './AttributeItem.module.scss'

/** Returns styles that depend on attribute type */
export const stylesCn = (
  attributeSet: DeepReadonlyObject<AttributeSet>,
  sizeValue: string
) =>
  attributeSet.type === 'swatch'
    ? cn(styles.Color, stylesFromSize(sizeValue, styles))
    : attributeSet.name === 'Size'
    ? cn(styles.Size, stylesFromSize(sizeValue, styles))
    : styles.Text

/** Returns label that depends on attribute type */
export const label = (
  attributeSet: DeepReadonlyObject<AttributeSet>,
  attribute: DeepReadonlyObject<Attribute>
) =>
  attributeSet.type === 'swatch'
    ? null
    : attributeSet.name === 'Size'
    ? attribute.value
    : attribute.displayValue

/** Returns label styles */
export const labelStyles = (
  attributeSet: DeepReadonlyObject<AttributeSet>,
  attribute: DeepReadonlyObject<Attribute>
) =>
  attributeSet.type === 'swatch'
    ? { backgroundColor: attribute.value }
    : undefined
