import React, { PureComponent } from 'react'

interface Props {
  msg: string
}

export class Error extends PureComponent<Props, unknown> {
  render() {
    const { msg } = this.props
    return <div>{msg}. Try refreshing the page!</div>
  }
}

export default Error
