/* eslint-disable react/no-array-index-key */
import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import {
  fetchCategories,
  updateCurrentCategory,
} from '../../redux/slices/categoriesSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Category } from '../../redux/types'
import KeyboardEvent from '../../utils/KeyboardEvent'
import styles from './CategoryNav.module.scss'
import { DispatchProps, Props, StateProps } from './types'

const SUPPOSED_NUMBER_OF_CATEGORIES = 3

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
    const { categories, currentCategory, status } = this.props

    const stylesActive = (category: Category) => ({
      [styles.active]: category.name === currentCategory.name,
    })

    const isSuccessDiv =
      status === 'success' &&
      categories.map((category) => (
        <Link to="/" key={category.name}>
          <div
            className={cn(styles.CategoryItem, stylesActive(category))}
            onClick={this.handleClickOnCategory.bind(this, category)}
            onKeyDown={this.handleKeyDownOnCategory.bind(this, category)}
            role="menuitem"
            tabIndex={0}
          >
            {category.name}
          </div>
        </Link>
      ))

    const isPendingDiv =
      status === 'pending' &&
      Array.from(Array(SUPPOSED_NUMBER_OF_CATEGORIES)).map((_e, i) => (
        <div className={styles.CategoryItem} key={i}>
          <Spinner size="md" />
        </div>
      ))

    const isErrorDiv = status === 'failed' && (
      <Error msg="Unable to fetch categories" />
    )

    return (
      <>
        {isSuccessDiv}
        {isPendingDiv}
        {isErrorDiv}
      </>
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories,
  currentCategory: state.categories.current_category,
  status: state.categories.status,
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
