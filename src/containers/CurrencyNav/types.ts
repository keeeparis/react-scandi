import { mapDispatchToProps, mapStateToProps } from './CurrencyNav'

export interface CurrencyNavState {
  isOptionsVisible: boolean
}

export type DispatchProps = ReturnType<typeof mapDispatchToProps>
export type StateProps = ReturnType<typeof mapStateToProps>

export type Props = DispatchProps & StateProps
