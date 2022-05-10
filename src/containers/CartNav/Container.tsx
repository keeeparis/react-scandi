import React, { PureComponent, ReactNode } from 'react'
import styles from './CartNav.module.scss'

interface ContainerProps {
  children?: ReactNode
  toggleCartOverlay: () => void
  toggleKeyDownOnCartOverlay: (e: React.KeyboardEvent<HTMLDivElement>) => void
  amountOfItemsInCart: number
}

export class Container extends PureComponent<ContainerProps> {
  render() {
    const {
      children,
      toggleCartOverlay,
      toggleKeyDownOnCartOverlay,
      amountOfItemsInCart,
    } = this.props

    return (
      <div className={styles.Container}>
        <div
          className={styles.ImageWrapper}
          onClick={toggleCartOverlay}
          onKeyDown={toggleKeyDownOnCartOverlay}
          role="menuitem"
          aria-label="cart"
          tabIndex={0}
        >
          {amountOfItemsInCart ? (
            <div className={styles.AmountInCart}>{amountOfItemsInCart}</div>
          ) : null}
        </div>
        {children}
      </div>
    )
  }
}

export default Container
