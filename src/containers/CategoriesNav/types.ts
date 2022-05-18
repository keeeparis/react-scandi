import { mapDispatchToProps, mapStateToProps } from './CategoriesNav'

export type DispatchProps = ReturnType<typeof mapDispatchToProps>
export type StateProps = ReturnType<typeof mapStateToProps>

export type Props = DispatchProps & StateProps
