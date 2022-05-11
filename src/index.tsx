import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import AppRouter from './containers/AppRouter'
import { ModalContext } from './context/ModalContext'
import ModalProvider from './context/ModalProvider'
import { store } from './redux/store/store'
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ModalProvider Context={ModalContext}>
      <AppRouter />
    </ModalProvider>
  </Provider>
  // </React.StrictMode>
)
