import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'
import React, { Component } from 'react'

export class EditExpensePage extends Component {
  onRemoveButtonClick = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id })
    this.props.history.push('/')
  }
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense)
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemoveButtonClick}>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  }
}

const mapDispatchToProps = (dispatch) => ({
  startRemoveExpense: (id) =>
    dispatch(startRemoveExpense(id))
  ,
  startEditExpense: (id, expense) =>
    dispatch(startEditExpense(id, expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)
