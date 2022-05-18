import { mapDispatchToProps, mapStateToProps } from './CartNav'

export interface CartNavState {
  isCartOverlay: boolean
}

export type StateProps = ReturnType<typeof mapStateToProps>
export type DispatchProps = ReturnType<typeof mapDispatchToProps>

export type Props = StateProps & DispatchProps
