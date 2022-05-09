import cn from 'classnames'
import React, { PureComponent } from 'react'
import { Outlet } from 'react-router-dom'
import { CartOverlayContext } from '../../context/CartOverlay/CartOverlayContext'
import Navigation from '../Navigation'
import styles from './Layout.module.scss'

export class Layout extends PureComponent {
  render() {
    return (
      <CartOverlayContext.Consumer>
        {(value) =>
          value && (
            <div
              className={cn(styles.Container, {
                [styles.modalActive]: value.isModal,
              })}
            >
              <Navigation />
              <div className={styles.Wrapper}>
                <Outlet />
              </div>
            </div>
          )
        }
      </CartOverlayContext.Consumer>
    )
  }
}

export default Layout
