/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from 'react-router-dom'
import { SelectedAttributesType } from '../../redux/types'
import { mapDispatchToProps, mapStateToProps } from './Product'

export type OwnProps = {
  router: {
    location: ReturnType<typeof useLocation>
    navigate: ReturnType<typeof useNavigate>
    params: any
  }
}

export type OwnState = {
  selectedAttributes: SelectedAttributesType
  currentPicture?: string
}

export type StateProps = ReturnType<typeof mapStateToProps>
export type DispatchProps = ReturnType<typeof mapDispatchToProps>

export type Props = StateProps & DispatchProps & OwnProps
