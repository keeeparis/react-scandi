import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { Product } from '../../redux/types'
import { selectPriceInCurrentCurrency } from '../../utils/selectPriceInCurrentCurrency'

interface OwnProps {
  product: Product
}

export const mapStateToProps = (state: RootState) => ({
  currentCurrency: state.currency.currentCurrency,
})

type StateProps = ReturnType<typeof mapStateToProps>
type Props = StateProps & OwnProps

export class Price extends PureComponent<Props, unknown> {
  render() {
    const { product, currentCurrency } = this.props

    const price = selectPriceInCurrentCurrency(product, currentCurrency)
    const priceToFixed = price.amount.toFixed(2)

    return (
      <>
        <span>{currentCurrency.symbol} </span>
        <span>{priceToFixed}</span>
      </>
    )
  }
}

const connector = connect<StateProps, unknown, OwnProps, RootState>(
  mapStateToProps,
  null
)(Price)

export default connector
