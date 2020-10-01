import { shallow } from "enzyme"
import { EditExpensePage } from "../../components/EditExpensePage"
import React from 'react'
import expenses from "../fixtures/expenses"

let startEditExpense, history, wrapper, startRemoveExpense

beforeEach(() => {
  startEditExpense = jest.fn()
  startRemoveExpense = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      history={history}
      startRemoveExpense={startRemoveExpense}
      expense={expenses[2]}
    />
  )
})

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should dispatch remove expense on button click', () => {
  wrapper.find('button').prop('onClick')()
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id })
  expect(history.push).toHaveBeenLastCalledWith('/')
})

test('should dispatch expense updates on submit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[0])
  expect(history.push).toHaveBeenLastCalledWith('/')
})