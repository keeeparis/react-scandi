import { mapDispatchToProps, mapStateToProps } from './App'

export type StateProps = ReturnType<typeof mapStateToProps>
export type DispatchProps = ReturnType<typeof mapDispatchToProps>

export type Props = StateProps & DispatchProps
