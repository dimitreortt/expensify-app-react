import React from 'react'
import { removeExpense } from '../actions/expenses'
import { connect } from 'react-redux'

const ExpenseListItem = ({ description, note, amount, createdAt, id, dispatch }) => (
  <div>
    <hr />
    <p>{description}</p>
    <p>{note}</p>
    <p>{amount}</p>
    <p>{createdAt}</p>
    <button onClick={() => {
      dispatch(removeExpense({ id }))
    }}>Remove</button>
  </div>
)

export default connect()(ExpenseListItem)