import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  fetchCategories,
  updateCurrentCategory,
} from '../../redux/slices/categoriesSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Category, CategoryType } from '../../redux/types'
import styles from './Navigation.module.scss'

interface NavigationProps {
  fetchCategoryList: () => void
  updateCategory: (category: Category) => void
  categories: CategoryType['categories']
  currentCategory: Category
}

export class Navigation extends PureComponent<NavigationProps, unknown> {
  componentDidMount() {
    const { fetchCategoryList } = this.props
    fetchCategoryList()
  }

  handleClickOnCategory(newCategory: Category) {
    const { updateCategory, currentCategory } = this.props
    if (currentCategory.name !== newCategory.name) {
      updateCategory(newCategory)
    }
  }

  handleKeyDownOnCategory(
    newCategory: Category,
    e: React.KeyboardEvent<HTMLDivElement>
  ) {
    const { updateCategory, currentCategory } = this.props
    // TODO: change same to different
    const isSameCategory = currentCategory.name !== newCategory.name
    const isSpaceOrEnterPressed = e.code === 'Enter' || e.code === 'Space'

    if (isSameCategory && isSpaceOrEnterPressed) {
      updateCategory(newCategory)
    }
  }

  render() {
    const { categories, currentCategory } = this.props
    return (
      <div className={styles.Container}>
        <div className={styles.LeftSide}>
          {/* Может быть вынести в отдельный компонент */}
          {categories.map((category) => (
            <div
              className={cn(styles.CategoryItem, {
                [styles.active]: category.name === currentCategory.name,
              })}
              key={category.name}
              onClick={this.handleClickOnCategory.bind(this, category)}
              onKeyDown={this.handleKeyDownOnCategory.bind(this, category)}
              role="menuitem"
              tabIndex={0}
            >
              {category.name}
            </div>
          ))}
        </div>

        <div className={styles.Center} />

        <div className={styles.RightSide}>
          <div className="currencyselector">asd</div>
          <div className="cart">asd</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories,
  currentCategory: state.categories.current_category,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCategoryList: () => dispatch(fetchCategories()),
  updateCategory: (category: Category) =>
    dispatch(updateCurrentCategory(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
