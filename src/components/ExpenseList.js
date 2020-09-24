import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'
import ExpenseListFilters from './ExpenseListFilters'

const ExpenseList = (props) => (
  <div>
    <h2>Expense List</h2>
    <ExpenseListFilters />
    {props.expenses.map((expense) => {
      console.log(expense)
      console.log(expense)
      return <ExpenseListItem key={expense.id} {...expense} />
    })}
  </div>
)

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList)
