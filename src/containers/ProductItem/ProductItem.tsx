/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent, PureComponent } from 'react'
import { connect } from 'react-redux'
import ClickOutside from '../../components/ClickOutside'
import { updateProduct } from '../../redux/slices/attributesSlice'
import { addItemToCart } from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Product } from '../../redux/types'
import styles from './ProductItem.module.scss'

interface OwnProps {
  product: Product
}

interface ProductItemState {
  isPopUp: boolean
}

const mapStateToProps = (state: RootState) => ({
  currentCurrency: state.base.currentCurrency,
  // attributesSelectProduct: state.attributes.product,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product: Product) => dispatch(addItemToCart(product)),
  updateAttributesProduct: (product: Product) =>
    dispatch(updateProduct(product)),
})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = StateProps & DispatchProps & OwnProps

export class ProductItem extends PureComponent<Props, ProductItemState> {
  constructor(props: Props) {
    super(props)
    this.state = { isPopUp: false }
  }

  handleAddToCart(product: Product) {
    const { addToCart, updateAttributesProduct } = this.props
    this.setState({ isPopUp: true })

    // If there is any attributes to select, show PopUp
    if (product.attributes.length) {
      updateAttributesProduct(product)
    } else {
      // otherwise, add to cart
      addToCart(product)
    }
  }

  handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    const { addToCart } = this.props
    e.preventDefault()
    console.log(e.target)
    // addToCart(newProduct)
  }

  handleClosePopUp = () => {
    this.setState({ isPopUp: false })
  }

  render() {
    const { product, currentCurrency } = this.props
    const { isPopUp } = this.state

    const currencyToShow = product.prices.find(
      ({ currency }) => currency.label === currentCurrency.label
    )

    return (
      <article className={styles.Container}>
        <div className={styles.Inner}>
          {/* Image */}
          <div className={styles.ImageWrapper}>
            <img src={product.gallery[0]} alt={product.name} />
          </div>

          {/* Name */}
          <div className={styles.Name}>{product.name}</div>

          {/* Price */}
          <div className={styles.Price}>
            {currencyToShow && (
              <>
                <span>{currencyToShow.currency.symbol}</span>
                <span>{currencyToShow.amount}</span>
              </>
            )}
          </div>

          {/* AddToCart Button */}
          <div
            className={styles.AddToCart}
            onClick={this.handleAddToCart.bind(this, product)}
            role="button"
            tabIndex={0}
          />

          {/* Attributes Selection PopUp */}
          {/* TODO: */}
          {isPopUp && (
            <div className={styles.PopUp}>
              <ClickOutside callback={this.handleClosePopUp}>
                <div className={styles.PopUPInner}>
                  <form onSubmit={this.handleSubmitForm.bind(this)}>
                    {product.attributes.map((attrSet) => (
                      <div key={attrSet.id}>
                        <div>{attrSet.name}</div>
                        <div>
                          {attrSet.items.map((attribute) => (
                            <div key={attribute.id}>
                              <label htmlFor={attribute.id}>
                                {attribute.displayValue}
                              </label>
                              <input
                                type="radio"
                                id={attribute.id}
                                value={attribute.value}
                                name={attrSet.name}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button type="submit">Add To Cart</button>
                  </form>
                </div>
              </ClickOutside>
            </div>
          )}
        </div>
      </article>
    )
  }
}

/* 
При нажатии на добавить в корзину, если у товара массив аттрибутов (цвет/размер)
не пустой, значит рендерить модалку с данными выбранного товара. Иначе => 
=> добавить сразу в корзину.

При выборе всех полей из аттрибутов и сабмите этой формы, добавить товар в корзину.

В корзине уже искать, если ли такой же товар с одинаковыми аттрибутами в корзине,
и если да, то увеличить count++, если нет => добавить новый товар.
*/

const connector = connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem)

export default connector
