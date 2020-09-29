import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import moment from 'moment'

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <div>
    <NavLink to={'edit/' + id}>
      <h3>{description}</h3>
    </NavLink>
    <p>
      {amount}{' - '}
      {moment(createdAt).format('MMMM Do, YYYY')}
    </p>
  </div>
)

export default ExpenseListItem
