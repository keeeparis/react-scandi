import React, { PureComponent } from 'react'
import { Currency, ProductInCart } from '../../redux/types'
import AttributeItem from '../AttributeItem'
import styles from './CartOverlayItem.module.scss'

interface CartOverlayItemProps {
  item: ProductInCart
  count: number
  currentCurrency: Currency
}

export class CartOverlayItem extends PureComponent<
  CartOverlayItemProps,
  unknown
> {
  render() {
    const { item, count, currentCurrency } = this.props
    console.log(item)

    const price = item.prices.filter(
      ({ currency }) => currency.label === currentCurrency.label
    )[0]

    return (
      <div className={styles.Inner}>
        <div className={styles.Data}>
          <div className={styles.DataWrapper}>
            <div className={styles.NameWrapper}>
              <span className={styles.Name}>{item.name}</span>

              <span className={styles.Price}>
                {price.currency.symbol} {price.amount * count}
              </span>
            </div>

            <div className={styles.Attributes}>
              {item.attributes &&
                item.attributes.map((el) => (
                  <AttributeItem
                    key={el.id}
                    attrSet={el}
                    selectedAttributes={item.selectedAttributes}
                    readonly
                    size="sm"
                  />
                ))}
            </div>
          </div>

          <div className={styles.Actions}>
            <div className={styles.Plus} />
            {count}
            <div className={styles.Minus} />
          </div>
        </div>

        <div className={styles.ImageWrapper}>
          <img src={item.gallery[0]} alt="" />
        </div>
      </div>
    )
  }
}

export default CartOverlayItem
