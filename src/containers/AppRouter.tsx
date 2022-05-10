import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CartOverlayContext } from '../context/CartOverlay/CartOverlayContext'
import CartOverlayProvider from '../context/CartOverlay/CartOverlayProvider'
import App from '../pages/App'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Layout from './Layout'

export class AppRouter extends PureComponent {
  render() {
    return (
      <Router>
        <CartOverlayProvider Context={CartOverlayContext}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </CartOverlayProvider>
      </Router>
    )
  }
}

export default AppRouter
