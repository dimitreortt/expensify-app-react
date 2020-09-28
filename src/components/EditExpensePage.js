import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, removeExpense } from '../actions/expenses'
import React, { Component } from 'react'

export class EditExpensePage extends Component {
  onRemoveButtonClick = () => {
    this.props.removeExpense({ id: this.props.expense.id })
    this.props.history.push('/')
  }
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense)
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
  removeExpense: (id) =>
    dispatch(removeExpense(id))
  ,
  editExpense: (id, expense) =>
    dispatch(editExpense(id, expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)
