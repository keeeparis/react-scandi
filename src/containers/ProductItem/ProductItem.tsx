/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, PureComponent } from 'react'
import { connect } from 'react-redux'
import ClickOutside from '../../components/ClickOutside'
import { CartOverlayContext } from '../../context/CartOverlay/CartOverlayContext'
import { addItemToCart } from '../../redux/slices/cartSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Attribute, AttributeSet, Product } from '../../redux/types'
import PopUp from './PopUp'
import styles from './ProductItem.module.scss'

/* USEFul types TODO: вынести */
export type ValueOf<T> = T[keyof T]
export type KeyofOnlyString<T> = keyof T & string
/*  */

interface OwnProps {
  product: Product
}

export type AttributesStateType = {
  [x: AttributeSet['id']]: Attribute['value']
}

export interface ProductItemState {
  isPopUp: boolean
  attributes: AttributesStateType
}

const mapStateToProps = (state: RootState) => ({
  currentCurrency: state.base.currentCurrency,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product: Product) => dispatch(addItemToCart(product)),
})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>
type Props = StateProps & DispatchProps & OwnProps

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
      this.setState({ isPopUp: true }) // TODO: function showPopUp()
    } else {
      addToCart(product)
    }
  }

  handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    const { addToCart, product } = this.props
    const { attributes } = this.state
    // TODO: передать в диспатч продакт и аттрибьютс
    e.preventDefault()
    console.log('PRODUCT')
    console.log(product)
    console.log('ATTRIBUTES')
    console.log(attributes)
    // addToCart(newProduct)
  }

  handleClosePopUp = () => {
    const { closeModal } = this.context
    closeModal()
    this.setState({ isPopUp: false }) // TODO: create func closePopUp()
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

const connector = connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem)

export default connector
