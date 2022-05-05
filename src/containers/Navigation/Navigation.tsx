import { DeepReadonlyArray } from '@tilework/opus'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { fetchCategories } from '../../redux/slices/categoriesSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import styles from './Navigation.module.scss'

export class Navigation extends PureComponent<
  {
    fetchCategoryList: () => void
    categories: DeepReadonlyArray<{ name: any }>
  },
  unknown
> {
  componentDidMount() {
    const { fetchCategoryList } = this.props
    fetchCategoryList()
  }

  render() {
    const { categories } = this.props
    return (
      <div className={styles.Container}>
        <div className={styles.LeftSide}>
          {categories.map((category) => (
            <div className={styles.CategoryItem} key={category.name}>
              {category.name}
            </div>
          ))}
        </div>
        <div className={styles.Center} />
        <div className={styles.RightSide}>Something</div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCategoryList: () => dispatch(fetchCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
