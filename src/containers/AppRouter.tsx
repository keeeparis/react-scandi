import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from '../pages/App'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Layout from './Layout'

export class AppRouter extends PureComponent {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
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
