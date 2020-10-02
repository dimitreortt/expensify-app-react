import selectExpensesTotal from "../selectors/expenses_total"
import selectExpenses from "../selectors/expenses"
import React from 'react'
import { connect } from "react-redux"
import { Link } from "react-router-dom"

export const ExpenseSummary = ({ expensesCount, expensesTotal }) => {
  const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{expensesTotal}</span></h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)

  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  }
}

export default connect(mapStateToProps)(ExpenseSummary)