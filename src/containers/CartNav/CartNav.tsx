import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ClickOutside from '../../components/ClickOutside'
import { close, toggle } from '../../redux/slices/modalSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import KeyboardEvent from '../../utils/KeyboardEvent'
import CartOverlay from '../CartOverlay/CartOverlay'
import Container from './Container'

interface CartNavState {
  isCartOverlay: boolean
}

const mapStateToProps = (state: RootState) => ({
  amountOfItemsInCart: state.cart.items.reduce(
    (total, { count }) => total + count,
    0
  ),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleModal: () => dispatch(toggle()),
  closeModal: () => dispatch(close()),
})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

type Props = StateProps & DispatchProps

export class CartNav extends PureComponent<Props, CartNavState> {
  constructor(props: Props) {
    super(props)
    this.state = { isCartOverlay: false }
  }

  toggleCartOverlay = () => {
    const { toggleModal } = this.props
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
    const { closeModal } = this.props
    closeModal()
    this.closeVisibility()
  }

  closeVisibility = () => {
    this.setState({ isCartOverlay: false })
  }

  render() {
    const { isCartOverlay } = this.state
    const { amountOfItemsInCart } = this.props

    return isCartOverlay ? (
      <ClickOutside callback={this.closeCartOverlay}>
        <Container
          toggleCartOverlay={this.toggleCartOverlay}
          toggleKeyDownOnCartOverlay={this.toggleKeyDownOnCartOverlay}
          amountOfItemsInCart={amountOfItemsInCart}
        >
          <CartOverlay closeCartOverlay={this.closeCartOverlay} />
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
