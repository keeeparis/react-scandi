/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, PureComponent } from 'react'
import { connect } from 'react-redux'
import ClickOutside from '../../components/ClickOutside'
import { CartOverlayContext } from '../../context/CartOverlay/CartOverlayContext'
import { addItemToCart, ProductInCart } from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Product } from '../../redux/types'
import { KeyofOnlyString, ValueOf } from '../../types'
import PopUp from './PopUp'
import styles from './ProductItem.module.scss'
import {
  AttributesStateType,
  DispatchProps,
  OwnProps,
  ProductItemState,
  Props,
  StateProps,
} from './types'

class ProductItem extends PureComponent<Props, ProductItemState> {
  static contextType = CartOverlayContext

  context!: React.ContextType<typeof CartOverlayContext>

  constructor(props: Props) {
    super(props)
    this.state = { isPopUp: false, attributes: {} }
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  handleAddToCart(product: Product) {
    const { addToCart } = this.props
    const { toggleModal } = this.context

    const isSelectAttributes = !!product.attributes.length

    if (isSelectAttributes) {
      toggleModal()
      this.openVisibility()
    } else {
      addToCart({
        ...product,
        attributes: null,
      })
    }
  }

  handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    const { addToCart, product } = this.props
    const { attributes } = this.state

    e.preventDefault()
    addToCart({
      ...product,
      attributes,
    })
    this.resetAttributes()
    this.handleClosePopUp()
  }

  handleClosePopUp = () => {
    const { closeModal } = this.context
    closeModal()
    this.closeVisibility()
  }

  openVisibility = () => {
    this.setState({ isPopUp: true })
  }

  closeVisibility = () => {
    this.setState({ isPopUp: false })
  }

  resetAttributes = () => {
    this.setState({ attributes: {} })
  }

  handleInputChange =
    (
      name: KeyofOnlyString<AttributesStateType>,
      value: ValueOf<AttributesStateType>
    ) =>
    () => {
      const { attributes } = this.state

      this.setState({
        attributes: {
          ...attributes,
          [name]: value,
        },
      })
    }

  render() {
    const { product, currentCurrency } = this.props
    const { isPopUp, attributes } = this.state
    const { isModal } = this.context

    const currencyToShow = product.prices.find(
      ({ currency }) => currency.label === currentCurrency.label
    )

    const isPopUpVisible = isModal && isPopUp

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
            aria-label="addToCart"
          />
        </div>

        {/* Attributes Selection PopUp */}
        {isPopUpVisible && (
          <ClickOutside callback={this.handleClosePopUp}>
            <PopUp
              handleSubmitForm={this.handleSubmitForm}
              handleInputChange={this.handleInputChange}
              product={product}
              attributes={attributes}
            />
          </ClickOutside>
        )}
      </article>
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  currentCurrency: state.base.currentCurrency,
})

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product: ProductInCart) => dispatch(addItemToCart(product)),
})

const connector = connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem)

export default connector
