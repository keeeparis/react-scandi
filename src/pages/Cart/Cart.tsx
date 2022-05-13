import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
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
        selectPriceInCurrentCurrency(item, state.base.currentCurrency).amount,
    0
  ),
  items: state.cart.items,
  currentCurrency: state.base.currentCurrency,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = StateProps & DispatchProps

export class Cart extends PureComponent<Props, unknown> {
  render() {
    const { items, amountOfItemsInCart, currentCurrency, totalPrice } =
      this.props

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
            />
          ))}
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
