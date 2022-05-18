import { mapStateToProps } from './CartOverlay'

export type OwnProps = {
  closeCartOverlay: () => void
}

export type StateProps = ReturnType<typeof mapStateToProps>

export type Props = StateProps & OwnProps
