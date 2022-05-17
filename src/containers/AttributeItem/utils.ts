/* eslint-disable no-nested-ternary */
import { DeepReadonlyObject } from '@tilework/opus'
import cn from 'classnames'
import { Attribute, AttributeSet } from '../../redux/types'
import styles from './AttributeItem.module.scss'

/** Function returns style class that depends on attribute type */
export const stylesCn = (
  attributeSet: DeepReadonlyObject<AttributeSet>,
  sizeValue: string
) =>
  attributeSet.type === 'swatch'
    ? cn(
        styles.Color,
        { [styles.sm]: sizeValue === 'sm' },
        { [styles.lg]: sizeValue === 'lg' }
      )
    : attributeSet.name === 'Size'
    ? cn(
        styles.Size,
        { [styles.sm]: sizeValue === 'sm' },
        { [styles.lg]: sizeValue === 'lg' }
      )
    : styles.Text

/** Function returns label that depends on attribute type */
export const label = (
  attributeSet: DeepReadonlyObject<AttributeSet>,
  attribute: DeepReadonlyObject<Attribute>
) =>
  attributeSet.type !== 'swatch'
    ? attributeSet.name === 'Size'
      ? attribute.value
      : attribute.displayValue
    : null
