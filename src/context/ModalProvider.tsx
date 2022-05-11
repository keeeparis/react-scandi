/* eslint-disable react/no-unused-state */
import React, { Component, ReactNode } from 'react'
import { ModalContextState, ModalContextType } from './ModalContext'

interface ModalContextProps {
  children: ReactNode
  Context: ModalContextType
}

/**
 * Component that manages Modal visibility. Uses Context API.
 */
export class ModalProvider extends Component<
  ModalContextProps,
  ModalContextState
> {
  constructor(props: ModalContextProps) {
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

export default ModalProvider
