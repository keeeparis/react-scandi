import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { RootState } from '../../redux/store/store'
import Navigation from '../Navigation'
import styles from './Layout.module.scss'

export const mapStateToProps = (state: RootState) => ({
  isModalActive: state.modal.isModal,
})

type StateProps = ReturnType<typeof mapStateToProps>

export class Layout extends PureComponent<StateProps, unknown> {
  render() {
    const { isModalActive } = this.props

    return (
      <div
        className={cn(styles.Container, {
          [styles.modalActive]: isModalActive,
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

const connector = connect<StateProps, unknown, unknown, RootState>(
  mapStateToProps,
  null
)(Layout)

export default connector
