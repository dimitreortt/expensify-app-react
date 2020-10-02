import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

export const PrivateRoute = ({
  component: Component,
  isAutheticaded,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAutheticaded ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  )

const mapStateToProps = (state) => ({
  isAutheticaded: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute)