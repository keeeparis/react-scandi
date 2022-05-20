import React, { PropsWithChildren, PureComponent } from 'react'
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
      <>
        <GlobalStyles isModal={isModalActive} />
        {children}
      </>
    )
  }
}

export default AddGlobalStyles
