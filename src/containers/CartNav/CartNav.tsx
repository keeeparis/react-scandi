import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ClickOutside from '../../components/ClickOutside'
import { selectAmountOfItemsInCart } from '../../redux/selectors'
import { close, toggle } from '../../redux/slices/modalSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import KeyboardEvent from '../../utils/KeyboardEvent'
import CartOverlay from '../CartOverlay/CartOverlay'
import Container from './Container'
import { CartNavState, DispatchProps, Props, StateProps } from './types'

export class CartNav extends PureComponent<Props, CartNavState> {
  constructor(props: Props) {
    super(props)
    this.state = { isCartOverlay: false }
  }

  toggleCartOverlayAndModal = () => {
    const { toggleModal } = this.props
    toggleModal()
    this.toggleCartOverlay()
  }

  toggleKeyDownOnCartOverlay = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const isSpaceOrEnterPressed = KeyboardEvent.isSpaceOrEnterPressed(e)
    if (isSpaceOrEnterPressed) {
      this.toggleCartOverlayAndModal()
    }
  }

  toggleCartOverlay = () => {
    this.setState(({ isCartOverlay }) => ({
      isCartOverlay: !isCartOverlay,
    }))
  }

  closeCartOverlayAndModal = () => {
    const { closeModal } = this.props
    closeModal()
    this.closeCartOverlay()
  }

  closeCartOverlay = () => {
    this.setState({ isCartOverlay: false })
  }

  render() {
    const { isCartOverlay } = this.state
    const { amountOfItemsInCart } = this.props

    return isCartOverlay ? (
      <ClickOutside callback={this.closeCartOverlayAndModal}>
        <Container
          toggleCartOverlay={this.toggleCartOverlayAndModal}
          toggleKeyDownOnCartOverlay={this.toggleKeyDownOnCartOverlay}
          amountOfItemsInCart={amountOfItemsInCart}
        >
          <CartOverlay closeCartOverlay={this.closeCartOverlayAndModal} />
        </Container>
      </ClickOutside>
    ) : (
      <Container
        toggleCartOverlay={this.toggleCartOverlayAndModal}
        toggleKeyDownOnCartOverlay={this.toggleKeyDownOnCartOverlay}
        amountOfItemsInCart={amountOfItemsInCart}
      />
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  amountOfItemsInCart: selectAmountOfItemsInCart(state),
})

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleModal: () => dispatch(toggle()),
  closeModal: () => dispatch(close()),
})

const connector = connect<StateProps, DispatchProps, unknown, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CartNav)

export default connector
