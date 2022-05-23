import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import {
  selectAmountOfItemsInCart,
  selectTotalPrice,
} from '../../redux/selectors'
import { RootState } from '../../redux/store/store'
import CartItem from '../CartItem/CartItem'
import styles from './CartOverlay.module.scss'
import { Props, StateProps } from './types'
import { idWithAttrs } from './util'

class CartOverlay extends PureComponent<Props> {
  render() {
    const {
      items,
      amountOfItemsInCart,
      currentCurrency,
      totalPrice,
      closeCartOverlay,
    } = this.props

    const toFixedPrice = totalPrice.toFixed(2)

    return (
      <div className={styles.Modal}>
        {items.length ? (
          <>
            <div className={styles.Data}>
              {/* Title */}
              <div className={styles.Title}>
                My bag, <span>{amountOfItemsInCart} items</span>
              </div>
              {/* Items */}
              <div className={styles.Wrapper}>
                {items.map(({ item, count }) => (
                  <CartItem
                    key={idWithAttrs(item)}
                    item={item}
                    count={count}
                    currentCurrency={currentCurrency}
                    size="sm"
                  />
                ))}
              </div>
              {/* Total Price */}
              <div className={styles.Total}>
                <span>Total:</span>

                <span>
                  {currentCurrency.symbol}
                  {toFixedPrice}
                </span>
              </div>
            </div>
            {/* Actions -> Cart/Checkout */}
            <div className={styles.Actions}>
              <Link to="/cart">
                <Button onClick={closeCartOverlay}>View Bag</Button>
              </Link>

              <Link to="/cart">
                <Button fill onClick={closeCartOverlay}>
                  Checkout
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className={styles.NoItems}>No items in a cart.</div>
        )}
      </div>
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  amountOfItemsInCart: selectAmountOfItemsInCart(state),
  totalPrice: selectTotalPrice(state),
  items: state.cart.items,
  currentCurrency: state.currency.currentCurrency,
})

const connector = connect<StateProps, unknown, unknown, RootState>(
  mapStateToProps,
  null
)(CartOverlay)

export default connector
