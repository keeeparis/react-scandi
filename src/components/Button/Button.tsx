/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  fill?: boolean
  disabled?: boolean
}

export class Button extends PureComponent<ButtonProps, unknown> {
  render() {
    const { children, fill, ...props } = this.props
    return (
      <button
        type="button"
        {...props}
        className={cn(styles.Button, { [styles.Fill]: fill })}
      >
        {children}
      </button>
    )
  }
}

export default Button
