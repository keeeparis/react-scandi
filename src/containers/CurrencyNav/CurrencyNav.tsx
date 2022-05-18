import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ClickOutside from '../../components/ClickOutside'
import {
  fetchCurrencies,
  updateCurrentCurrency,
} from '../../redux/slices/currencySlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { Currency } from '../../redux/types'
import KeyboardEvent from '../../utils/KeyboardEvent'
import styles from './CurrencyNav.module.scss'
import { CurrencyNavState, DispatchProps, Props, StateProps } from './types'

export class CurrencyNav extends PureComponent<Props, CurrencyNavState> {
  constructor(props: Props) {
    super(props)
    this.state = { isOptionsVisible: false }
  }

  componentDidMount() {
    const { fetchCurrencyList } = this.props
    fetchCurrencyList()
  }

  handleClickOnCurrency(newCurrency: Currency) {
    const { updateCurrency, currentCurrency } = this.props
    if (newCurrency.label !== currentCurrency.label) {
      updateCurrency(newCurrency)
      this.closeOptions()
    }
  }

  handleKeyDownOnCurrency(
    newCurrency: Currency,
    e: React.KeyboardEvent<HTMLLIElement>
  ) {
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
      this.toggleOptionsVisibility()
    }
  }

  handleClickOnDefaultValue() {
    this.toggleOptionsVisibility()
  }

  closeOptions = () => {
    this.setState({ isOptionsVisible: false })
  }

  toggleOptionsVisibility() {
    this.setState(({ isOptionsVisible }) => ({
      isOptionsVisible: !isOptionsVisible,
    }))
  }

  render() {
    const { currencies, currentCurrency } = this.props
    const { isOptionsVisible } = this.state

    return (
      <ClickOutside callback={this.closeOptions}>
        <div
          className={cn(styles.Container, {
            [styles.rotate]: isOptionsVisible,
          })}
        >
          <div
            className={styles.DefaultValue}
            onClick={this.handleClickOnDefaultValue.bind(this)}
            onKeyDown={this.handleKeyDownOnDefaultValue.bind(this)}
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
                  className={cn(styles.Li, {
                    [styles.active]: currency.label === currentCurrency.label,
                  })}
                  onClick={this.handleClickOnCurrency.bind(this, currency)}
                  onKeyDown={this.handleKeyDownOnCurrency.bind(this, currency)}
                  role="menuitem"
                  tabIndex={0}
                >
                  {currency.symbol} {currency.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </ClickOutside>
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  currencies: state.currency.currencies,
  currentCurrency: state.currency.currentCurrency,
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
