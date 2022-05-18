import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import { AppDispatch, RootState } from '../../redux/store/store'
import { selectPriceInCurrentCurrency } from '../../utils/selectPriceInCurrentCurrency'
import CartOverlayItem from '../CartOverlayItem/CartOverlayItem'
import styles from './CartOverlay.module.scss'

interface OwnProps {
  closeCartOverlay: () => void
}

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

type Props = StateProps & DispatchProps & OwnProps

class CartOverlay extends PureComponent<Props, unknown> {
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
              <div className={styles.Title}>
                My bag, <span>{amountOfItemsInCart} items</span>
              </div>

              <div className={styles.Wrapper}>
                {items.map(({ item, count }) => (
                  <CartOverlayItem
                    key={`${item.id}${Object.values(item.selectedAttributes)}`}
                    item={item}
                    count={count}
                    currentCurrency={currentCurrency}
                    size="sm"
                  />
                ))}
              </div>

              <div className={styles.Total}>
                <span>Total:</span>

                <span>
                  {currentCurrency.symbol}
                  {toFixedPrice}
                </span>
              </div>
            </div>

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
          <div>No Items In Cart. Add One!</div>
        )}
      </div>
    )
  }
}

const connector = connect<StateProps, DispatchProps, unknown, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CartOverlay)

export default connector
