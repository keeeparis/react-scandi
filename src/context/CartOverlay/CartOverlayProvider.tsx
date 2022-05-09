/* eslint-disable react/no-unused-state */
import React, { Component, ReactNode } from 'react'
import { CartOverlayState, CartOverlayType } from './CartOverlayContext'

interface CartOverlayContextProps {
  children: ReactNode
  Context: CartOverlayType
}

/**
 * Component that manages Modal visibility. Uses Context API.
 */
export class CartOverlayProvider extends Component<
  CartOverlayContextProps,
  CartOverlayState
> {
  constructor(props: CartOverlayContextProps) {
    super(props)
    this.state = {
      isModal: false,
      toggleModal: this.toggleModal,
      closeModal: this.closeModal,
    }
  }

  toggleModal = () => {
    this.setState(({ isModal }) => ({ isModal: !isModal }))
  }

  closeModal = () => {
    this.setState({ isModal: false })
  }

  render() {
    const { children, Context } = this.props

    return <Context.Provider value={this.state}>{children}</Context.Provider>
  }
}

export default CartOverlayProvider
