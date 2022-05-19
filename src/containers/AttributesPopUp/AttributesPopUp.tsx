/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react'
import Button from '../../components/Button'
import AttributeItem from '../AttributeItem'
import styles from './AttributesPopUp.module.scss'
import { AttributesPopUpProps } from './types'

export class AttributesPopUp extends PureComponent<
  AttributesPopUpProps,
  unknown
> {
  render() {
    const { handleSubmitForm, handleInputChange, product, selectedAttributes } =
      this.props

    const isButtonDisabled =
      product.attributes.length !== Object.keys(selectedAttributes).length

    return (
      <div className={styles.PopUPInner}>
        <form onSubmit={handleSubmitForm}>
          <div className={styles.Brand}>{product.brand}</div>
          <div className={styles.Name}>{product.name}</div>

          {product.attributes.map((attrSet) => (
            <AttributeItem
              attrSet={attrSet}
              selectedAttributes={selectedAttributes}
              handleInputChange={handleInputChange}
              key={attrSet.id}
              readonly={false}
              size="lg"
            />
          ))}

          <Button type="submit" fill disabled={isButtonDisabled}>
            Add To Cart
          </Button>
        </form>
      </div>
    )
  }
}

export default AttributesPopUp
