import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ClickOutside from '../../components/ClickOutside'
import { CartOverlayContext } from '../../context/CartOverlay/CartOverlayContext'
import { AppDispatch, RootState } from '../../redux/store/store'
import KeyboardEvent from '../../utils/KeyboardEvent'
import styles from './CartNav.module.scss'
import Container from './Container'

interface CartNavState {
  isCartOverlay: boolean
}

const mapStateToProps = (state: RootState) => ({
  amountOfItemsInCart: state.cart.items.reduce(
    (total, { count }) => total + count,
    0
  ),
  itemsInCart: state.cart.items,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  // addToCart: (product: ProductInCart) => dispatch(addItemToCart(product)),
})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = StateProps & DispatchProps

export class CartNav extends PureComponent<Props, CartNavState> {
  static contextType = CartOverlayContext

  context!: React.ContextType<typeof CartOverlayContext>

  constructor(props: Props) {
    super(props)
    this.state = { isCartOverlay: false }
  }

  toggleCartOverlay = () => {
    const { toggleModal } = this.context
    toggleModal()
    this.toggleVisibility()
  }

  toggleKeyDownOnCartOverlay = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const isSpaceOrEnterPressed = KeyboardEvent.isSpaceOrEnterPressed(e)
    if (isSpaceOrEnterPressed) {
      this.toggleCartOverlay()
    }
  }

  toggleVisibility = () => {
    this.setState(({ isCartOverlay }) => ({
      isCartOverlay: !isCartOverlay,
    }))
  }

  closeCartOverlay = () => {
    const { closeModal } = this.context
    closeModal()
    this.closeVisibility()
  }

  closeVisibility = () => {
    this.setState({ isCartOverlay: false })
  }

  render() {
    const { isModal } = this.context
    const { isCartOverlay } = this.state
    const { amountOfItemsInCart, itemsInCart } = this.props

    const isCartOverlayVisible = isModal && isCartOverlay

    return isCartOverlayVisible ? (
      <ClickOutside callback={this.closeCartOverlay}>
        <Container
          toggleCartOverlay={this.toggleCartOverlay}
          toggleKeyDownOnCartOverlay={this.toggleKeyDownOnCartOverlay}
          amountOfItemsInCart={amountOfItemsInCart}
        >
          <div className={styles.Modal}>
            {itemsInCart.map(({ item, count }) => (
              <div key={item.id}>
                <div>
                  {item.name} - amount {count}
                </div>
                <div>
                  {item.attributes &&
                    [...Object.entries(item.attributes)].map(([key, value]) => (
                      <div key={key}>
                        {key} - {value}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </ClickOutside>
    ) : (
      <Container
        toggleCartOverlay={this.toggleCartOverlay}
        toggleKeyDownOnCartOverlay={this.toggleKeyDownOnCartOverlay}
        amountOfItemsInCart={amountOfItemsInCart}
      />
    )
  }
}

const connector = connect<StateProps, DispatchProps, unknown, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CartNav)

export default connector

// export default CartNav
