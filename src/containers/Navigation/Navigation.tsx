import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CurrencySelect from '../../components/CurrencySelect'
import {
  fetchCurrencies,
  updateCurrentCurrency,
} from '../../redux/slices/baseSlice'
import {
  fetchCategories,
  updateCurrentCategory,
} from '../../redux/slices/categoriesSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import {
  BaseSliceType,
  Category,
  CategoryType,
  Currency,
} from '../../redux/types'
import styles from './Navigation.module.scss'

interface NavigationProps {
  fetchCategoryList: () => void
  fetchCurrencyList: () => void
  updateCategory: (category: Category) => void
  updateCurrency: (currency: Currency) => void
  categories: CategoryType['categories']
  currencies: BaseSliceType['currencies']
  currentCategory: Category
  currentCurrency: Currency
}

export class Navigation extends PureComponent<NavigationProps, unknown> {
  componentDidMount() {
    const { fetchCategoryList, fetchCurrencyList } = this.props
    fetchCategoryList()
    fetchCurrencyList()
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
    const isSpaceOrEnterPressed = e.code === 'Enter' || e.code === 'Space'

    if (isDifferentCategory && isSpaceOrEnterPressed) {
      updateCategory(newCategory)
    }
  }

  handleClickOnCurrency(newCurrency: Currency) {
    const { updateCurrency, currentCurrency } = this.props
    if (newCurrency.label !== currentCurrency.label) {
      updateCurrency(newCurrency)
    }
  }

  render() {
    const { categories, currentCategory, currencies, currentCurrency } =
      this.props

    return (
      <div className={styles.Container}>
        <div className={styles.LeftSide}>
          {/* TODO: Может быть вынести в отдельный компонент */}
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
          <div className={styles.Currencies}>
            <CurrencySelect items={currencies} defaultValue={currentCurrency} />

            {currencies.map((currency) => (
              /* TODO: */
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                key={currency.label}
                onClick={this.handleClickOnCurrency.bind(this, currency)}
                role="menuitem"
                tabIndex={0}
              >
                {currency.symbol}
              </div>
            ))}
          </div>
          <div className="cart">asd</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories.categories,
  currentCategory: state.categories.current_category,
  currencies: state.base.currencies,
  currentCurrency: state.base.currentCurrency,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCategoryList: () => dispatch(fetchCategories()),
  fetchCurrencyList: () => dispatch(fetchCurrencies()),
  updateCategory: (category: Category) =>
    dispatch(updateCurrentCategory(category)),
  updateCurrency: (currency: Currency) =>
    dispatch(updateCurrentCurrency(currency)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
