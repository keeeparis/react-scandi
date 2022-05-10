import { createContext } from 'react'

export interface CartOverlayState {
  isModal: boolean
  toggleModal: () => void
  closeModal: () => void
}

export const CartOverlayContext = createContext<CartOverlayState>(
  {} as CartOverlayState
)

export type CartOverlayType = typeof CartOverlayContext
