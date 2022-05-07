import React, { PureComponent } from 'react'
import { BaseSliceType, Currency } from '../../redux/types'

import styles from './CurrencySelect.module.scss'

interface CurrencySelectProps {
  items: BaseSliceType['currencies']
  defaultValue: Currency
}

export class CurrencySelect extends PureComponent<
  CurrencySelectProps,
  unknown
> {
  render() {
    const { items, defaultValue } = this.props

    return (
      <div className={styles.Container}>
        {/* TODO: Finish selector */}
        <div className={styles.DefaultValue}>{defaultValue.symbol}</div>
        {items.map((currency) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            key={currency.label}
            // onClic
            role="menuitem"
            tabIndex={0}
          >
            {currency.symbol}
          </div>
        ))}
      </div>
    )
  }
}

export default CurrencySelect
