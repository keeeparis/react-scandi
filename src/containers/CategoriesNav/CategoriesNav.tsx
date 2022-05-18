import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchCategories,
  updateCurrentCategory,
} from '../../redux/slices/categoriesSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Category } from '../../redux/types'
import KeyboardEvent from '../../utils/KeyboardEvent'
import styles from './CategoryNav.module.scss'
import { DispatchProps, Props, StateProps } from './types'

export class CategoriesNav extends PureComponent<Props, unknown> {
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
          <Link to="/" key={category.name}>
            <div
              className={cn(styles.CategoryItem, {
                [styles.active]: category.name === currentCategory.name,
              })}
              onClick={this.handleClickOnCategory.bind(this, category)}
              onKeyDown={this.handleKeyDownOnCategory.bind(this, category)}
              role="menuitem"
              tabIndex={0}
            >
              {category.name}
            </div>
          </Link>
        ))}
      </>
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories,
  currentCategory: state.categories.current_category,
})

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCategoryList: () => dispatch(fetchCategories()),
  updateCategory: (category: Category) =>
    dispatch(updateCurrentCategory(category)),
})

export default connect<StateProps, DispatchProps, unknown, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesNav)
