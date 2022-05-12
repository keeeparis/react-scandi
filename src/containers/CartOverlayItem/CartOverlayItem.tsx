/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { decrement, increment } from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Currency, ProductInCart } from '../../redux/types'
import { selectPriceInCurrentCurrency } from '../../utils/selectPriceInCurrentCurrency'
import AttributeItem from '../AttributeItem'
import styles from './CartOverlayItem.module.scss'

interface CartOverlayItemProps {
  item: ProductInCart
  count: number
  currentCurrency: Currency
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  incrementItem: (item: ProductInCart) => () => dispatch(increment(item)),
  decrementItem: (item: ProductInCart) => () => dispatch(decrement(item)),
})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = StateProps & DispatchProps & CartOverlayItemProps

export class CartOverlayItem extends PureComponent<Props, unknown> {
  render() {
    const { item, count, currentCurrency, decrementItem, incrementItem } =
      this.props

    const price = selectPriceInCurrentCurrency(item, currentCurrency)
    const totalPrice = price.amount * count
    const toFixedPrice = totalPrice.toFixed(2)

    return (
      <div className={styles.Inner}>
        <div className={styles.Data}>
          <div className={styles.DataWrapper}>
            <div className={styles.NameWrapper}>
              <span className={styles.Name}>{item.name}</span>

              <span className={styles.Price}>
                {price.currency.symbol} {toFixedPrice}
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
            <div className={styles.Plus} onClick={incrementItem(item)} />
            {count}
            <div className={styles.Minus} onClick={decrementItem(item)} />
          </div>
        </div>

        <div className={styles.ImageWrapper}>
          <img src={item.gallery[0]} alt="" />
        </div>
      </div>
    )
  }
}

const connector = connect<
  StateProps,
  DispatchProps,
  CartOverlayItemProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(CartOverlayItem)

export default connector

// export default CartOverlayItem
