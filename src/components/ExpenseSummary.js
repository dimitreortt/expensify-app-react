import selectExpensesTotal from "../selectors/expenses_total"
import selectExpenses from "../selectors/expenses"
import React from 'react'
import { connect } from "react-redux"

export const ExpenseSummary = ({ expensesCount, expensesTotal }) => {
  const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'

  return (
    <div>
      <h3>Viewing {expensesCount} {expenseWord} totalling {expensesTotal}</h3>
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