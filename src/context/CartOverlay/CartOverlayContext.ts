import { createContext } from 'react'

export interface CartOverlayState {
  isModal: boolean
  toggleModal: () => void
  closeModal: () => void
}

export const CartOverlayContext = createContext<CartOverlayState | null>(null)

export type CartOverlayType = typeof CartOverlayContext
