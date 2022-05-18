import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import Button from '../../components/Button'
import CartOverlayItem from '../../containers/CartOverlayItem'
import { AppDispatch, RootState } from '../../redux/store/store'
import { selectPriceInCurrentCurrency } from '../../utils/selectPriceInCurrentCurrency'
import styles from './Cart.module.scss'

const mapStateToProps = (state: RootState) => ({
  amountOfItemsInCart: state.cart.items.reduce(
    (total, { count }) => total + count,
    0
  ),
  totalPrice: state.cart.items.reduce(
    (total, { count, item }) =>
      total +
      count *
        selectPriceInCurrentCurrency(item, state.currency.currentCurrency)
          .amount,
    0
  ),
  items: state.cart.items,
  currentCurrency: state.currency.currentCurrency,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = StateProps & DispatchProps

export class Cart extends PureComponent<Props, unknown> {
  render() {
    const { items, amountOfItemsInCart, currentCurrency, totalPrice } =
      this.props

    const tax = (totalPrice * 0.21).toFixed(2)
    const totalPriceFixed = totalPrice.toFixed(2)

    if (!items.length) {
      return (
        <div className={styles.Container}>
          <div className={styles.Title}>Cart</div>
          <div className={styles.NoItems}>No Items in Cart. Add One!</div>
        </div>
      )
    }

    return (
      <div className={styles.Container}>
        <div className={styles.Title}>Cart</div>

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
          <Button fill onClick={() => console.log('Finish!')}>
            Order
          </Button>
        </div>
      </div>
    )
  }
}

const connector = connect<StateProps, DispatchProps, unknown, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Cart)

export default connector
