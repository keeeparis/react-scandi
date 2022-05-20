import { DeepReadonlyObject } from '@tilework/opus'
import React, { PureComponent } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'
import { AttributeSet } from '../../redux/types'
import { AttributesPopUpProps } from '../AttributesPopUp/types'
import styles from './AttributeItem.module.scss'
import { label, labelStyles, styleHelper, stylesCn } from './utils'

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
    we need to add unique id for each input, otherwise inputs 
    with same name of different items (e.g. Size) conflict 
    with each other. */
    this.uniqueId = uuid()
  }

  render() {
    const { attrSet, selectedAttributes, handleInputChange, readonly, size } =
      this.props

    return (
      <div>
        <div className={cn(styles.AttributeName, styleHelper(size))}>
          {attrSet.name}:
        </div>

        <div className={styles.Wrapper}>
          {attrSet.items.map((attribute) => (
            <div key={attribute.id} className={stylesCn(attrSet, size)}>
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
                style={labelStyles(attrSet, attribute)}
              >
                <span>{label(attrSet, attribute)}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default AttributeItem
