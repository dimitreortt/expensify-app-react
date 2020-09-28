import { shallow } from "enzyme"
import { EditExpensePage } from "../../components/EditExpensePage"
import React from 'react'
import expenses from "../fixtures/expenses"

let editExpense, history, wrapper, removeExpense

beforeEach(() => {
  editExpense = jest.fn()
  removeExpense = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      history={history}
      removeExpense={removeExpense}
      expense={expenses[2]}
    />
  )
})

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should dispatch remove expense on button click', () => {
  wrapper.find('button').prop('onClick')()
  expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[2].id })
  expect(history.push).toHaveBeenLastCalledWith('/')
})

test('should dispatch expense updates on submit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[0])
  expect(history.push).toHaveBeenLastCalledWith('/')
})