import expenses from "../fixtures/expenses"
import expensesReducer from '../../reducers/expenses'
import moment from 'moment'

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should remove expense with id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

test('should add an expense', () => {
  const expense = {
    id: '100',
    description: 'newaddiction',
    note: 'its new',
    amount: 90000,
    createdAt: moment().valueOf()
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([...expenses, expense])
})

test('should edit an expense with id', () => {
  const updates = {
    description: 'update',
    note: 'has changes',
    amount: 8000,
    createdAt: moment().valueOf()
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates
  }
  const state = expensesReducer(expenses, action)
  expect(state[1]).toEqual({ id: expenses[1].id, ...updates })
})

test('should not edit an expense if id not found', () => {
  const updates = {
    description: 'update',
    note: 'has changes',
    amount: 8000,
    createdAt: moment().valueOf()
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

