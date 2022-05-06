import React, { PureComponent } from 'react'
import { Product } from '../../redux/types'
import styles from './ProductItem.module.scss'

interface Props {
  product: Product
}

export class ProductItem extends PureComponent<Props, unknown> {
  render() {
    const { product } = this.props
    return <div className={styles.Container}>{product.name}</div>
  }
}

export default ProductItem
