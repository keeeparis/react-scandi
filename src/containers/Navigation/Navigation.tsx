import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
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

        <Link to="/">
          <div className={styles.Center} />
        </Link>

        <div className={styles.RightSide}>
          <CurrencyNav />
          <CartNav />
        </div>
      </div>
    )
  }
}

export default Navigation
