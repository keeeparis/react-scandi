import React, { PureComponent } from 'react'
import { CartOverlayContext } from '../../context/CartOverlay/CartOverlayContext'
import CartNav from '../CartNav'
import CategoriesNav from '../CategoriesNav'
import CurrencyNav from '../CurrencyNav'
import styles from './Navigation.module.scss'

export class Navigation extends PureComponent {
  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.LeftSide}>
          <CategoriesNav />
        </div>

        <div className={styles.Center} />

        <div className={styles.RightSide}>
          <CurrencyNav />
          <CartNav />
        </div>
      </div>
    )
  }
}

export default Navigation
