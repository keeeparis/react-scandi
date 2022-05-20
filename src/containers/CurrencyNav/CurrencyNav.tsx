import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ClickOutside from '../../components/ClickOutside'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import {
  fetchCurrencies,
  updateCurrentCurrency,
} from '../../redux/slices/currencySlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Currency } from '../../redux/types'
import KeyboardEvent from '../../utils/KeyboardEvent'
import styles from './CurrencyNav.module.scss'
import { CurrencyNavState, DispatchProps, Props, StateProps } from './types'
import { stylesActive, stylesRotate } from './util'

export class CurrencyNav extends PureComponent<Props, CurrencyNavState> {
  constructor(props: Props) {
    super(props)
    this.state = { isOptionsVisible: false }
  }

  componentDidMount() {
    const { fetchCurrencyList } = this.props
    fetchCurrencyList()
  }

  handleClickOnValue = (newCurrency: Currency) => () => {
    const { updateCurrency, currentCurrency } = this.props
    if (newCurrency.label !== currentCurrency.label) {
      updateCurrency(newCurrency)
      this.closeOptions()
    }
  }

  handleKeyDownOnValue =
    (newCurrency: Currency) => (e: React.KeyboardEvent<HTMLLIElement>) => {
      const { updateCurrency, currentCurrency } = this.props
      const isDifferentCategory = currentCurrency.label !== newCurrency.label
      const isSpaceOrEnterPressed = KeyboardEvent.isSpaceOrEnterPressed(e)

      if (isDifferentCategory && isSpaceOrEnterPressed) {
        updateCurrency(newCurrency)
        this.closeOptions()
      }
    }

  handleKeyDownOnDefaultValue = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const isSpaceOrEnterPressed = KeyboardEvent.isSpaceOrEnterPressed(e)
    if (isSpaceOrEnterPressed) {
      this.toggleOptions()
    }
  }

  handleClickOnDefaultValue = () => {
    this.toggleOptions()
  }

  closeOptions = () => {
    this.setState({ isOptionsVisible: false })
  }

  toggleOptions = () => {
    this.setState(({ isOptionsVisible }) => ({
      isOptionsVisible: !isOptionsVisible,
    }))
  }

  render() {
    const { currencies, currentCurrency, status } = this.props
    const { isOptionsVisible } = this.state

    const isPendingDiv = status === 'pending' && (
      <div className={styles.DefaultValue}>
        <Spinner size="sm" />
      </div>
    )

    const isErrorDiv = status === 'failed' && (
      <Error msg="Unable t0 fetch currencies" />
    )

    const isSuccess = status === 'success'

    return (
      <ClickOutside callback={this.closeOptions}>
        {isPendingDiv}
        {isErrorDiv}
        {isSuccess && (
          <div className={cn(styles.Container, stylesRotate(isOptionsVisible))}>
            <div
              className={styles.DefaultValue}
              onClick={this.handleClickOnDefaultValue}
              onKeyDown={this.handleKeyDownOnDefaultValue}
              role="menuitem"
              tabIndex={0}
            >
              {currentCurrency.symbol}
            </div>

            {isOptionsVisible && (
              <ul className={styles.Ul}>
                {currencies.map((currency) => (
                  <li
                    key={currency.label}
                    className={cn(
                      styles.Li,
                      stylesActive(currency, currentCurrency)
                    )}
                    onClick={this.handleClickOnValue(currency)}
                    onKeyDown={this.handleKeyDownOnValue(currency)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    {currency.symbol} {currency.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </ClickOutside>
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  currencies: state.currency.currencies,
  currentCurrency: state.currency.currentCurrency,
  status: state.currency.status,
})

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCurrencyList: () => dispatch(fetchCurrencies()),
  updateCurrency: (currency: Currency) =>
    dispatch(updateCurrentCurrency(currency)),
})

export default connect<StateProps, DispatchProps, unknown, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyNav)
