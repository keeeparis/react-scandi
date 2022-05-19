import cn from 'classnames'
import React, { PureComponent } from 'react'
import styles from './Spinner.module.scss'

interface Props {
  size?: 'lg' | 'md' | 'sm'
}

export class Spinner extends PureComponent<Props, unknown> {
  render() {
    const { size } = this.props

    return (
      <div
        className={cn(styles.ldsRoller, {
          [styles.md]: size === 'md',
          [styles.sm]: size === 'sm',
        })}
      >
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    )
  }
}

export default Spinner
