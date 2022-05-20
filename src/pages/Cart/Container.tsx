import React, { PureComponent, ReactNode } from 'react'
import styles from './Cart.module.scss'

interface Props {
  children: ReactNode
}

export class Container extends PureComponent<Props> {
  render() {
    const { children } = this.props

    return (
      <div className={styles.Container}>
        <div className={styles.Title}>Cart</div>
        {children}
      </div>
    )
  }
}

export default Container
