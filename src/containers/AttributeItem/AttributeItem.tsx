/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import { DeepReadonlyObject } from '@tilework/opus'
import cn from 'classnames'
import React, { PureComponent } from 'react'
import { v4 as uuid } from 'uuid'
import { Attribute, AttributeSet } from '../../redux/types'
import { AttributesPopUpProps } from '../AttributesPopUp/types'
import styles from './AttributeItem.module.scss'

interface AttributeItemProps {
  attrSet: DeepReadonlyObject<AttributeSet>
  selectedAttributes: AttributesPopUpProps['selectedAttributes']
  handleInputChange?: AttributesPopUpProps['handleInputChange']
  readonly: boolean
  size: 'sm' | 'lg'
}

export class AttributeItem extends PureComponent<AttributeItemProps, unknown> {
  uniqueId: string

  constructor(props: AttributeItemProps) {
    super(props)
    /* When we render all items attributes in cartOverlay,
    we need to add unique id for each input, because otherwise
    inputs with same name of different items conflict with each other. */
    this.uniqueId = uuid()
  }

  render() {
    const { attrSet, selectedAttributes, handleInputChange, readonly, size } =
      this.props

    /** Function returns label that depends on attribute type */
    const label = (
      attributeSet: DeepReadonlyObject<AttributeSet>,
      attribute: DeepReadonlyObject<Attribute>
    ) =>
      attributeSet.type !== 'swatch' ? (
        attributeSet.name === 'Size' ? (
          <span>{attribute.value}</span>
        ) : (
          <span>{attribute.displayValue}</span>
        )
      ) : null

    /** Function returns style class that depends on attribute type */
    const stylesCn = (attributeSet: DeepReadonlyObject<AttributeSet>) =>
      attributeSet.type === 'swatch'
        ? cn(
            styles.Color,
            { [styles.sm]: size === 'sm' },
            { [styles.lg]: size === 'lg' }
          )
        : attributeSet.name === 'Size'
        ? cn(
            styles.Size,
            { [styles.sm]: size === 'sm' },
            { [styles.lg]: size === 'lg' }
          )
        : styles.Text

    return (
      <div>
        <div className={styles.AttributeName}>{attrSet.name}:</div>

        <div className={styles.Wrapper}>
          {attrSet.items.map((attribute) => (
            <div key={attribute.id} className={stylesCn(attrSet)}>
              <input
                type="radio"
                id={`${attribute.id}${attrSet.name}`}
                value={attribute.value}
                name={`${attrSet.name}-${this.uniqueId}`}
                checked={selectedAttributes[attrSet.id] === attribute.value}
                onChange={
                  handleInputChange &&
                  handleInputChange(attrSet.id, attribute.value)
                }
                required
                readOnly={readonly}
              />

              <label
                htmlFor={`${attribute.id}${attrSet.name}`}
                style={
                  attrSet.type === 'swatch'
                    ? { backgroundColor: attribute.value }
                    : undefined
                }
              >
                {label(attrSet, attribute)}
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default AttributeItem
