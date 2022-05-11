import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store/store'
import styles from './CartOverlay.module.scss'
import CartOverlayItem from '../CartOverlayItem/CartOverlayItem'

const mapStateToProps = (state: RootState) => ({
  amountOfItemsInCart: state.cart.items.reduce(
    (total, { count }) => total + count,
    0
  ),
  items: state.cart.items,
  currentCurrency: state.base.currentCurrency,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = StateProps & DispatchProps

class CartOverlay extends PureComponent<Props, unknown> {
  render() {
    const { items, amountOfItemsInCart, currentCurrency } = this.props

    return (
      <div className={styles.Modal}>
        <div className={styles.Title}>
          My bag, <span>{amountOfItemsInCart} items</span>
        </div>
        <div className={styles.Wrapper}>
          {items.length ? (
            items.map(({ item, count }) => (
              <CartOverlayItem
                key={`${item.id}${Object.values(item.selectedAttributes)}`}
                item={item}
                count={count}
                currentCurrency={currentCurrency}
              />
            ))
          ) : (
            <div>No Items In Cart. Add One!</div>
          )}
        </div>
      </div>
    )
  }
}

const connector = connect<StateProps, DispatchProps, unknown, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CartOverlay)

export default connector
