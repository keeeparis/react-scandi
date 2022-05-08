import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from '../pages/App'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Layout from './Layout'
import LayoutProvider from './Layout/LayoutProvider'

export class AppRouter extends PureComponent {
  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              /* TODO: Подумать чтобы в провайдер пропсом прокинуть контекст, 
              как это сделано в редаксе */
              <LayoutProvider>
                <Layout />
              </LayoutProvider>
            }
          >
            <Route index element={<App />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>
    )
  }
}

export default AppRouter
