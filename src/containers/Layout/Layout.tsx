import cn from 'classnames'
import React, { PureComponent } from 'react'
import { Outlet } from 'react-router-dom'
import { CartOverlayContext } from '../../context/CartOverlay/CartOverlayContext'
import Navigation from '../Navigation'
import styles from './Layout.module.scss'

export class Layout extends PureComponent {
  static contextType = CartOverlayContext

  context!: React.ContextType<typeof CartOverlayContext>

  render() {
    const { isModal } = this.context

    return (
      <div
        className={cn(styles.Container, {
          [styles.modalActive]: isModal,
        })}
      >
        <Navigation />
        <div className={styles.Wrapper}>
          <Outlet />
        </div>
      </div>
    )
  }
}

export default Layout
