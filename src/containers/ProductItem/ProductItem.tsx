/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames'
import React, { FormEvent, MouseEvent, PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ClickOutside from '../../components/ClickOutside'
import { addItemToCart } from '../../redux/slices/cartSlice'
import { close, toggle } from '../../redux/slices/modalSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import {
  Product,
  ProductInCart,
  SelectedAttributesType,
} from '../../redux/types'
import { KeyofOnlyString, ValueOf } from '../../types'
import { selectPriceInCurrentCurrency } from '../../utils/selectPriceInCurrentCurrency'
import AttributesPopUp from '../AttributesPopUp'
import styles from './ProductItem.module.scss'
import {
  DispatchProps,
  OwnProps,
  ProductItemState,
  Props,
  StateProps,
} from './types'

class ProductItem extends PureComponent<Props, ProductItemState> {
  constructor(props: Props) {
    super(props)
    this.state = { isPopUp: false, selectedAttributes: {} }
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  handleClickOnCartButton =
    (product: Product) => (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault()

      const { addToCart, toggleModal } = this.props

      const isSelectAttributes = !!product.attributes.length

      if (isSelectAttributes) {
        toggleModal()
        this.openPopUp()
      } else {
        addToCart({
          ...product,
          selectedAttributes: {},
        })
      }
    }

  handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    const { addToCart, product } = this.props
    const { selectedAttributes } = this.state

    e.preventDefault()
    addToCart({
      ...product,
      selectedAttributes,
    })
    this.resetAttributes()
    this.handleClosePopUpAndModal()
  }

  handleClosePopUpAndModal = () => {
    const { closeModal } = this.props
    closeModal()
    this.closePopUp()
  }

  openPopUp = () => {
    this.setState({ isPopUp: true })
  }

  closePopUp = () => {
    this.setState({ isPopUp: false })
  }

  resetAttributes = () => {
    this.setState({ selectedAttributes: {} })
  }

  handleInputChange =
    (
      name: KeyofOnlyString<SelectedAttributesType>,
      value: ValueOf<SelectedAttributesType>
    ) =>
    () => {
      const { selectedAttributes } = this.state

      this.setState({
        selectedAttributes: {
          ...selectedAttributes,
          [name]: value,
        },
      })
    }

  render() {
    const { product, currentCurrency } = this.props
    const { isPopUp, selectedAttributes } = this.state

    const price = selectPriceInCurrentCurrency(product, currentCurrency)

    return (
      <article className={styles.Container}>
        <Link to={`/product/${product.id}`}>
          <div
            className={cn(styles.Inner, {
              [styles.OutOfStock]: !product.inStock,
            })}
          >
            {/* Image */}
            <div className={styles.ImageWrapper}>
              <img src={product.gallery[0]} alt={product.name} />
              {!product.inStock && (
                <div className={styles.OufOfStock}>out of stock</div>
              )}
            </div>

            {/* Name */}
            <div className={styles.Name}>
              <span>{product.brand}</span>
              <span>{product.name}</span>
            </div>

            {/* Price */}
            <div className={styles.Price}>
              <span>{price.currency.symbol}</span>
              <span>{price.amount}</span>
            </div>

            {/* AddToCart Button */}
            <div
              className={styles.AddToCart}
              onClick={this.handleClickOnCartButton(product)}
              role="button"
              tabIndex={0}
              aria-label="Add To Cart"
            />
          </div>
        </Link>

        {/* Attributes Selection PopUp */}
        {isPopUp && (
          <ClickOutside callback={this.handleClosePopUpAndModal}>
            <AttributesPopUp
              handleSubmitForm={this.handleSubmitForm}
              handleInputChange={this.handleInputChange}
              product={product}
              selectedAttributes={selectedAttributes}
            />
          </ClickOutside>
        )}
      </article>
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  currentCurrency: state.currency.currentCurrency,
})

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product: ProductInCart) => dispatch(addItemToCart(product)),
  toggleModal: () => dispatch(toggle()),
  closeModal: () => dispatch(close()),
})

const connector = connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem)

export default connector
