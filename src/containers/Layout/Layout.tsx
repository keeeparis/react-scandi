import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { RootState } from '../../redux/store/store'
import Navigation from '../Navigation'
import { AddGlobalStyles } from './AddGlobalStyles'
import styles from './Layout.module.scss'
import { StateProps } from './types'

export class Layout extends PureComponent<StateProps, unknown> {
  render() {
    const { isModalActive } = this.props

    return (
      <AddGlobalStyles isModalActive={isModalActive}>
        <div
          className={cn(styles.Container, {
            [styles.modalActive]: isModalActive,
          })}
        >
          <Navigation />
          <div className={styles.Wrapper}>
            <div className={styles.Inner}>
              <Outlet />
            </div>
          </div>
        </div>
      </AddGlobalStyles>
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  isModalActive: state.modal.isModal,
})

const connector = connect<StateProps, unknown, unknown, RootState>(
  mapStateToProps,
  null
)(Layout)

export default connector
