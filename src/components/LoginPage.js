import React from 'react'
import { startLogin } from '../actions/auth'
import { connect } from 'react-redux'

export const LoginPage = ({ startLogin }) => (
  <div>
    <h1>Please Log In</h1>
    <button onClick={startLogin}>Login</button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)