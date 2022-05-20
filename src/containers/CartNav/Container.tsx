import React, { PropsWithChildren, PureComponent } from 'react'
import styles from './CartNav.module.scss'

interface ContainerProps {
  toggleCartOverlay: () => void
  toggleKeyDownOnCartOverlay: (e: React.KeyboardEvent<HTMLDivElement>) => void
  amountOfItemsInCart: number
}

export class Container extends PureComponent<
  PropsWithChildren<ContainerProps>
> {
  render() {
    const {
      children,
      toggleCartOverlay,
      toggleKeyDownOnCartOverlay,
      amountOfItemsInCart,
    } = this.props

    const numberOfItems = amountOfItemsInCart ? (
      <div className={styles.AmountInCart}>{amountOfItemsInCart}</div>
    ) : null

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
          {numberOfItems}
        </div>
        {children}
      </div>
    )
  }
}

export default Container
