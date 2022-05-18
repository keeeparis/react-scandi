/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import { decrement, increment } from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Currency, ProductInCart } from '../../redux/types'
import { selectPriceInCurrentCurrency } from '../../utils/selectPriceInCurrentCurrency'
import AttributeItem from '../AttributeItem'
import styles from './CartOverlayItem.module.scss'
import Slider from '../Slider'

interface CartOverlayItemProps {
  item: ProductInCart
  count: number
  currentCurrency: Currency
  size: 'sm' | 'lg'
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
  classLg = () => {
    const { size } = this.props

    return {
      [styles.lg]: size === 'lg',
    }
  }

  render() {
    const { item, count, currentCurrency, decrementItem, incrementItem, size } =
      this.props

    const price = selectPriceInCurrentCurrency(item, currentCurrency)
    const totalPrice = price.amount * count
    const toFixedPrice = totalPrice.toFixed(2)

    return (
      <div className={cn(styles.Inner, this.classLg())}>
        <div className={styles.Data}>
          <div className={styles.DataWrapper}>
            {/* Name and Price */}
            <div className={styles.NameWrapper}>
              <div className={cn(styles.Name, this.classLg())}>
                <span>{item.brand}</span>
                <span>{item.name}</span>
              </div>

              <span className={cn(styles.Price, this.classLg())}>
                {price.currency.symbol} {toFixedPrice}
              </span>
            </div>

            {/* Attributes */}
            <div className={styles.Attributes}>
              {item.attributes &&
                item.attributes.map((el) => (
                  <AttributeItem
                    key={el.id}
                    attrSet={el}
                    selectedAttributes={item.selectedAttributes}
                    readonly
                    size={size}
                  />
                ))}
            </div>
          </div>

          {/* Plus and Minus Signs */}
          <div className={cn(styles.Actions, this.classLg())}>
            <div
              className={cn(styles.Plus, this.classLg())}
              onClick={incrementItem(item)}
            />
            {count}
            <div
              className={cn(styles.Minus, this.classLg())}
              onClick={decrementItem(item)}
            />
          </div>
        </div>

        {/* Image Slider */}
        <div className={cn(styles.ImageWrapper, this.classLg())}>
          {size === 'lg' ? (
            <Slider images={item.gallery} />
          ) : (
            <img src={item.gallery[0]} alt="" />
          )}
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
