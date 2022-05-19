import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle<{ isModal: boolean }>`
  body {
    overflow-y: ${({ isModal }) => (isModal ? 'hidden' : 'auto')};
  }
`

export default GlobalStyles
