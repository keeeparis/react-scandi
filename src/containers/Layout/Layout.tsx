import cn from 'classnames'
import React, { PureComponent } from 'react'
import { Outlet } from 'react-router-dom'
import { ModalContext } from '../../context/ModalContext'
import Navigation from '../Navigation'
import styles from './Layout.module.scss'

export class Layout extends PureComponent {
  static contextType = ModalContext

  context!: React.ContextType<typeof ModalContext>

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
