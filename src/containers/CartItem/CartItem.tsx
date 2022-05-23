/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { decrement, increment } from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { ProductInCart } from '../../redux/types'
import { selectPriceInCurrentCurrency } from '../../utils/selectPriceInCurrentCurrency'
import { stylesFromSize } from '../../utils/stylesFromSize'
import AttributeItem from '../AttributeItem'
import Slider from '../Slider'
import styles from './CartItem.module.scss'
import { CartItemProps, DispatchProps, Props } from './types'

export class CartItem extends PureComponent<Props, unknown> {
  render() {
    const { item, count, currentCurrency, decrementItem, incrementItem, size } =
      this.props

    const price = selectPriceInCurrentCurrency(item, currentCurrency)
    const totalPrice = price.amount * count
    const toFixedPrice = totalPrice.toFixed(2)

    return (
      <div className={cn(styles.Inner, stylesFromSize(size, styles))}>
        <div className={styles.Data}>
          <div className={styles.DataWrapper}>
            {/* Name and Price */}
            <div className={styles.NameWrapper}>
              <div className={cn(styles.Name, stylesFromSize(size, styles))}>
                <span>{item.brand}</span>
                <span>{item.name}</span>
              </div>

              <span className={cn(styles.Price, stylesFromSize(size, styles))}>
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
          <div className={cn(styles.Actions, stylesFromSize(size, styles))}>
            <div
              className={cn(styles.Plus, stylesFromSize(size, styles))}
              onClick={incrementItem(item)}
            />
            {count}
            <div
              className={cn(styles.Minus, stylesFromSize(size, styles))}
              onClick={decrementItem(item)}
            />
          </div>
        </div>

        {/* Image Slider */}
        <div className={cn(styles.ImageWrapper, stylesFromSize(size, styles))}>
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

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  incrementItem: (item: ProductInCart) => () => dispatch(increment(item)),
  decrementItem: (item: ProductInCart) => () => dispatch(decrement(item)),
})

const connector = connect<unknown, DispatchProps, CartItemProps, RootState>(
  null,
  mapDispatchToProps
)(CartItem)

export default connector
