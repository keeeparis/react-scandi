import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  fetchCategories,
  updateCurrentCategory,
} from '../../redux/slices/categoriesSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Category, CategoryType } from '../../redux/types'
import KeyboardEvent from '../../utils/KeyboardEvent'
import styles from './CategoryNav.module.scss'

interface CategoriesNavProps {
  fetchCategoryList: () => void
  updateCategory: (category: Category) => void
  categories: CategoryType['categories']
  currentCategory: Category
}

export class CategoriesNav extends PureComponent<CategoriesNavProps, unknown> {
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

    const isDifferentCategory = currentCategory.name !== newCategory.name
    const isSpaceOrEnterPressed = KeyboardEvent.isSpaceOrEnterPressed(e)

    if (isDifferentCategory && isSpaceOrEnterPressed) {
      updateCategory(newCategory)
    }
  }

  render() {
    const { categories, currentCategory } = this.props

    return (
      <>
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
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesNav)
