/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, FormEvent, PureComponent } from 'react'
import { connect } from 'react-redux'
import ClickOutside from '../../components/ClickOutside'
import { ModalContext } from '../../context/ModalContext'
import { addItemToCart } from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import {
  Product,
  ProductInCart,
  SelectedAttributesType,
} from '../../redux/types'
import { KeyofOnlyString, ValueOf } from '../../types'
import AttributesPopUp from '../AttributesPopUp'
import styles from './ProductItem.module.scss'
import {
  DispatchProps,
  OwnProps,
  ProductItemState,
  Props,
  StateProps,
} from './types'
/* TODO: component rerenders because of isModal */
class ProductItem extends PureComponent<Props, ProductItemState> {
  static contextType = ModalContext

  context!: React.ContextType<typeof ModalContext>

  constructor(props: Props) {
    super(props)
    this.state = { isPopUp: false, selectedAttributes: {} }
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  handleClickOnCartButton(product: Product) {
    const { addToCart } = this.props
    const { toggleModal } = this.context

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
    const { closeModal } = this.context
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
    const { isModal } = this.context

    const currencyToShow = product.prices.filter(
      ({ currency }) => currency.label === currentCurrency.label
    )[0]

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
            <span>{currencyToShow.currency.symbol}</span>
            <span>{currencyToShow.amount}</span>
          </div>

          {/* AddToCart Button */}
          <div
            className={styles.AddToCart}
            onClick={this.handleClickOnCartButton.bind(this, product)}
            role="button"
            tabIndex={0}
            aria-label="addToCart"
          />
        </div>

        {/* Attributes Selection PopUp */}
        {isPopUpVisible && (
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
