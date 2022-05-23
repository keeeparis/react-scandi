/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { DeepReadonlyObject } from '@tilework/opus'
import React, { PureComponent } from 'react'
import { Attribute, AttributeSet } from '../../redux/types'

interface Props {
  attributeSet: DeepReadonlyObject<AttributeSet>
  attribute: DeepReadonlyObject<Attribute>
}

export class Label extends PureComponent<Props> {
  render() {
    const { attribute, attributeSet, ...props } = this.props

    const content =
      attributeSet.type === 'swatch'
        ? null
        : attributeSet.name === 'Size'
        ? attribute.value
        : attribute.displayValue

    const styles =
      attributeSet.type === 'swatch'
        ? { backgroundColor: attribute.value }
        : undefined

    return (
      <label
        htmlFor={`${attribute.id}${attributeSet.name}`}
        style={styles}
        {...props}
      >
        <span>{content}</span>
      </label>
    )
  }
}

export default Label
