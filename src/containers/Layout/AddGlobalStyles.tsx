import React, { PropsWithChildren, PureComponent, ReactNode } from 'react'
import GlobalStyles from '../../styles/global'

interface OwnProps {
  isModalActive: boolean
}

export class AddGlobalStyles extends PureComponent<
  PropsWithChildren<OwnProps>
> {
  render() {
    const { children, isModalActive } = this.props

    return (
      <div>
        <GlobalStyles isModal={isModalActive} />
        {children}
      </div>
    )
  }
}

export default AddGlobalStyles
