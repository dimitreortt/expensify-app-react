// Higher Order Component - A Component that renders another component
import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
  <div>
    <p>Here are some informations. {props.info}</p>
  </div>
)

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticaded ? <WrappedComponent {...props} /> : 'This info is not authenticaded!'}
    </div>
  )
}

const AuthInfo = requireAuthentication(Info)

ReactDOM.render(<AuthInfo isAuthenticaded={false} info={'Here are a few details'} />, document.getElementById('app'))