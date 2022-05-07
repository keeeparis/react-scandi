import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { increment } from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Product } from '../../redux/types'
import styles from './ProductItem.module.scss'

interface OwnProps {
  product: Product
}

const mapStateToProps = (state: RootState) => ({
  currentCurrency: state.base.currentCurrency,
})

// const mapDispatchToProps = (dispatch: AppDispatch) => ({
//   incrementOne: () => dispatch(increment()),
// })

type StateProps = ReturnType<typeof mapStateToProps>
// type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = StateProps & OwnProps

export class ProductItem extends PureComponent<Props, unknown> {
  render() {
    const { product, currentCurrency } = this.props
    const currencyToShow = product.prices.filter(
      (price) => price.currency.label === currentCurrency.label
    )[0]

    return (
      <div className={styles.Container}>
        <div className={styles.Inner}>
          <div className={styles.ImageWrapper}>
            <img src={product.gallery[0]} alt={product.name} />
          </div>

          <div className={styles.Name}>{product.name}</div>

          <div className={styles.Price}>
            <span>{currencyToShow.currency.symbol}</span>
            <span>{currencyToShow.amount}</span>
          </div>

          <div className={styles.AddToCart} />
        </div>
      </div>
    )
  }
}

const connector = connect<StateProps, unknown, OwnProps, RootState>(
  mapStateToProps,
  null
)(ProductItem)

export default connector
