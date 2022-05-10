import React, { PureComponent, ReactNode } from 'react'
import styles from './CartNav.module.scss'

interface ContainerProps {
  children?: ReactNode
  toggleCartOverlay: () => void
  toggleKeyDownOnCartOverlay: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

export class Container extends PureComponent<ContainerProps> {
  render() {
    const { children, toggleCartOverlay, toggleKeyDownOnCartOverlay } =
      this.props

    return (
      <div className={styles.Container}>
        <div
          className={styles.ImageWrapper}
          onClick={toggleCartOverlay}
          onKeyDown={toggleKeyDownOnCartOverlay}
          role="menuitem"
          aria-label="cart"
          tabIndex={0}
        />
        {children}
      </div>
    )
  }
}

export default Container
