/* eslint-disable no-alert */
import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import CartOverlayItem from '../../containers/CartOverlayItem'
import {
  selectAmountOfItemsInCart,
  selectTotalPrice,
} from '../../redux/selectors'
import { RootState } from '../../redux/store/store'
import styles from './Cart.module.scss'
import Container from './Container'
import { StateProps } from './types'

export class Cart extends PureComponent<StateProps, unknown> {
  render() {
    const { items, amountOfItemsInCart, currentCurrency, totalPrice } =
      this.props

    const tax = (totalPrice * 0.21).toFixed(2)
    const totalPriceFixed = totalPrice.toFixed(2)

    return (
      <Container>
        {!items.length ? (
          <div className={styles.NoItems}>No Items in Cart. Add One!</div>
        ) : (
          <>
            <div className={styles.Wrapper}>
              {items.map(({ item, count }) => (
                <CartOverlayItem
                  key={`${item.id}${Object.values(item.selectedAttributes)}`}
                  item={item}
                  count={count}
                  currentCurrency={currentCurrency}
                  size="lg"
                />
              ))}
            </div>

            <div className={styles.Bottom}>
              <div className={styles.Numbers}>
                <div className={styles.property}>Tax 21%:</div>
                <div className={styles.value}>
                  {currentCurrency.symbol} {tax}
                </div>
                <div className={styles.property}>Quantity:</div>
                <div className={styles.value}>{amountOfItemsInCart}</div>
                <div className={cn(styles.property, styles.bold)}>Total:</div>
                <div className={styles.value}>
                  {currentCurrency.symbol} {totalPriceFixed}
                </div>
              </div>

              <Button fill onClick={() => alert('Finish!')}>
                Order
              </Button>
            </div>
          </>
        )}
      </Container>
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
)(Cart)

export default connector
