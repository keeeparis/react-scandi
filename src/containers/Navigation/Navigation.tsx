import React, { PureComponent } from 'react'
import CartNav from '../CartNav'
import CategoriesNav from '../CategoriesNav'
import CurrencyNav from '../CurrencyNav'
import { LayoutContext } from '../Layout/LayoutProvider'
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

          <LayoutContext.Consumer>
            {(value) =>
              value && (
                <CartNav
                  toggleModal={value.toggleModal}
                  closeModal={value.closeModal}
                  isModal={value.isModal}
                />
              )
            }
          </LayoutContext.Consumer>
        </div>
      </div>
    )
  }
}

export default Navigation
