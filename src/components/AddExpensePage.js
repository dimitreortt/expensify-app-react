import React from 'react'
import ExpenseForm from './ExpenseForm'
import { connect } from 'react-redux'
import { addExpense } from '../actions/expenses'
import { setTextFilter } from '../actions/filters'

const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={(expense) => {
        console.log(expense, 'oaushdkaushd  ')
        console.log(addExpense(expense))
        props.dispatch(addExpense(expense))
        console.log(addExpense(expense))
        props.history.push('/help')
      }}
    />
  </div>
)

export default connect()(AddExpensePage)