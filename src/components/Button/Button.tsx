/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent, ReactNode } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  children: ReactNode
}

export class Button extends PureComponent<ButtonProps, unknown> {
  render() {
    const { children, ...props } = this.props
    return (
      <button type="button" {...props} className={styles.Button}>
        {children}
      </button>
    )
  }
}

export default Button
