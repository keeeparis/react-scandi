import React, { PureComponent } from 'react'
import styles from './ProductItem.module.scss'
import { PopUpProps } from './types'

export class PopUp extends PureComponent<PopUpProps, unknown> {
  render() {
    const { handleSubmitForm, handleInputChange, product, attributes } =
      this.props

    return (
      <div className={styles.PopUPInner}>
        <form onSubmit={handleSubmitForm}>
          {product.attributes.map((attrSet) => (
            <div key={attrSet.id}>
              <div>{attrSet.name}</div>
              <div>
                {attrSet.items.map((attribute) => (
                  <div key={attribute.id}>
                    <input
                      type="radio"
                      id={attribute.id}
                      value={attribute.value}
                      name={attrSet.name}
                      checked={attributes[attrSet.name] === attribute.value}
                      onChange={handleInputChange(attrSet.id, attribute.value)}
                      required
                    />
                    <label htmlFor={attribute.id}>
                      {attribute.displayValue}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button type="submit">Add To Cart</button>
        </form>
      </div>
    )
  }
}

export default PopUp
