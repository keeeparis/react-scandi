import { createContext } from 'react'

export interface ModalContextState {
  isModal: boolean
  toggleModal: () => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextState>(
  {} as ModalContextState
)

export type ModalContextType = typeof ModalContext
