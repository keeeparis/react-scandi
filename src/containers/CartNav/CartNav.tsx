import React, { PureComponent } from 'react'
import ClickOutside from '../../components/ClickOutside'
import { CartOverlayContext } from '../../context/CartOverlay/CartOverlayContext'
import KeyboardEvent from '../../utils/KeyboardEvent'
import styles from './CartNav.module.scss'
import Container from './Container'

interface CartNavState {
  isCartOverlay: boolean
}

export class CartNav extends PureComponent<unknown, CartNavState> {
  static contextType = CartOverlayContext

  context!: React.ContextType<typeof CartOverlayContext>

  constructor(props: unknown) {
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

    const isCartOverlayVisible = isModal && isCartOverlay

    return isCartOverlayVisible ? (
      <ClickOutside callback={this.closeCartOverlay}>
        <Container
          toggleCartOverlay={this.toggleCartOverlay}
          toggleKeyDownOnCartOverlay={this.toggleKeyDownOnCartOverlay}
        >
          <div className={styles.Modal}>
            Modal Window Modal Window Modal Window
          </div>
        </Container>
      </ClickOutside>
    ) : (
      <Container
        toggleCartOverlay={this.toggleCartOverlay}
        toggleKeyDownOnCartOverlay={this.toggleKeyDownOnCartOverlay}
      />
    )
  }
}

export default CartNav
