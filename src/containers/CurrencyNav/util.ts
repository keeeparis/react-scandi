import { Currency } from '../../redux/types'
import styles from './CurrencyNav.module.scss'

export const stylesRotate = (isVisible: boolean) => ({
  [styles.rotate]: isVisible,
})

export const stylesActive = (
  currency: Currency,
  currentCurrency: Currency
) => ({
  [styles.active]: currency.label === currentCurrency.label,
})
