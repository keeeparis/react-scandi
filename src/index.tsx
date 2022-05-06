// eslint-disable-next-line import/extensions
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import AppRouter from './containers/AppRouter'
import { store } from './redux/store/store'
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppRouter />
  </Provider>
  // </React.StrictMode>
)
