/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { PureComponent } from 'react'
import ClickOutside from '../../components/ClickOutside'
import styles from './CartNav.module.scss'

interface CartNavProps {
  toggleModal: () => void
  closeModal: () => void
  isModal: boolean
}

export class CartNav extends PureComponent<CartNavProps, unknown> {
  handleClickOnCart() {
    const { toggleModal } = this.props
    toggleModal()
  }

  closeCartModal = () => {
    const { closeModal } = this.props
    closeModal()
  }

  render() {
    const { isModal } = this.props

    return (
      <ClickOutside callback={this.closeCartModal}>
        <div className={styles.Container}>
          <div
            className={styles.ImageWrapper}
            onClick={this.handleClickOnCart.bind(this)}
            role="menuitem"
            tabIndex={0}
          />

          {isModal && (
            <div className={styles.Modal}>
              {/* TODO: Реализовать отображение товаров из корзины */}
              Modal Window Modal Window Modal Window
            </div>
          )}
        </div>
      </ClickOutside>
    )
  }
}

export default CartNav
