/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

/** https://reactrouter.com/docs/en/v6/getting-started/faq#what-happened-to-withrouter-i-need-it */
function withRouter(Component: any) {
  function ComponentWithRouterProp(props: unknown) {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()

    return <Component {...props} router={{ location, navigate, params }} />
  }

  return ComponentWithRouterProp
}

export default withRouter
