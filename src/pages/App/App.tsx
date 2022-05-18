import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import ProductItem from '../../containers/ProductItem'
import { fetchProducts } from '../../redux/slices/productsSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import styles from './App.module.scss'
import { DispatchProps, Props, StateProps } from './types'

export class App extends PureComponent<Props, unknown> {
  componentDidMount() {
    const { fetchProductList, category } = this.props
    /* When we enter index page - current category 
    has not been fetched and so we don't fetch products list. 
    When we enter index page from another page, we fetch
    products because current category exists after it had been fetched 
    in <CategoriesNav />. */
    if (category.name) {
      fetchProductList()
    }
  }

  componentDidUpdate(prev: Props) {
    const { fetchProductList, category } = this.props
    /* When category changes we compare previous and 
    current value of category and if they are different,
    we fetch new products list */
    if (prev.category !== category) {
      fetchProductList()
    }
  }

  render() {
    const { products, category, status } = this.props

    return (
      <div className={styles.Container}>
        <div className={styles.Title}>{category.name}</div>

        {status === 'pending' && <Spinner />}
        {status === 'failed' && <Error />}
        {status === 'success' && (
          <div className={styles.Products}>
            {products.map((item) => (
              <ProductItem key={item.id} product={item} />
            ))}
          </div>
        )}
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
