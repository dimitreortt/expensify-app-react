import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export const PublicRoute = ({
  component: Component,
  isAuthenticaded,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticaded ? (
        <Redirect to="/dashboard" />
      ) : (
          <Component {...props} />
        )
    )} />
  )

const mapStateToProps = (state) => ({
  isAuthenticaded: !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)