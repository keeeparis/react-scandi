import cn from 'classnames'
import React, { PureComponent } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../Navigation'
import styles from './Layout.module.scss'
import { LayoutContext } from './LayoutProvider'

export class Layout extends PureComponent {
  render() {
    return (
      <LayoutContext.Consumer>
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
      </LayoutContext.Consumer>
    )
  }
}

export default Layout
