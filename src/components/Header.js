import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <header>
    <h3>Expensify</h3>
    <NavLink activeClassName="is-active" to="/" exact>Home</NavLink>
    <NavLink activeClassName="is-active" to="/create">Add Expense</NavLink>
    <NavLink activeClassName="is-active" to="/edit">Edit Expense</NavLink>
    <NavLink activeClassName="is-active" to="/help">Help</NavLink>
  </header>
)

export default Header