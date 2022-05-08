/* eslint-disable react/no-unused-state */
import React, { createContext, Component, ReactNode } from 'react'

interface LayoutContextProps {
  children: ReactNode
}

interface LayoutState {
  isModal: boolean
  toggleModal: () => void
  closeModal: () => void
}

/* TODO: Переименовать в Модальный? контекст, так как тут только логика по модалке.
И в будущем, если добавить контекст с темой (светлая/темная), то названия контекстов
будут путаться */
export const LayoutContext = createContext<LayoutState | null>(null)

/**
 * Component that manages Modal visibility. Uses Context API.
 */
export class LayoutProvider extends Component<LayoutContextProps, LayoutState> {
  constructor(props: LayoutContextProps) {
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
    const { children } = this.props

    return (
      <LayoutContext.Provider value={this.state}>
        {children}
      </LayoutContext.Provider>
    )
  }
}

export default LayoutProvider
