/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import ProductItem from '../../containers/ProductItem'
import { fetchProducts } from '../../redux/slices/productsSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import styles from './App.module.scss'
import { DispatchProps, Props, StateProps } from './types'

const SUPPOSED_NUMBER_OF_PRODUCTS = 3

export class App extends PureComponent<Props, unknown> {
  componentDidMount() {
    const { fetchProductList, category } = this.props
    /* When we enter index page - current category 
    has not been fetched yet, so we don't fetch products list. 
    When we enter index page from another page, we fetch 
    products list because current category exists
    after it has been fetched from <CategoriesNav />. */
    if (category.name) {
      fetchProductList()
    }
  }

  componentDidUpdate(prev: Props) {
    const { fetchProductList, category } = this.props
    /* When current category changes we compare previous and 
    current value of category and if they are different,
    we fetch new products list */
    if (prev.category !== category) {
      fetchProductList()
    }
  }

  render() {
    const { products, category, status } = this.props

    const isPendingDiv = status === 'pending' && (
      <div className={styles.Products}>
        {Array.from(Array(SUPPOSED_NUMBER_OF_PRODUCTS)).map((_e, i) => (
          <Spinner key={i} />
        ))}
      </div>
    )

    const isErrorDiv = status === 'failed' && (
      <Error msg="Unable to fetch products" />
    )

    const isSuccessDiv = status === 'success' && (
      <div className={styles.Products}>
        {products.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    )

    return (
      <div className={styles.Container}>
        <div className={styles.Title}>{category.name}</div>

        {isPendingDiv}
        {isErrorDiv}
        {isSuccessDiv}
      </div>
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  category: state.categories.current_category,
  products: state.products.products,
  status: state.products.status,
})

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchProductList: () => dispatch(fetchProducts(null)),
})

export default connect<StateProps, DispatchProps, unknown, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(App)
