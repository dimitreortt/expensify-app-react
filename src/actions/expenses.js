import { db } from '../firebase/firebase'

export const expensesArrayToObject = (expenses) => {
  let expensesData = {}
  expenses.forEach(({ description, id, note, amount, createdAt }) => {
    expensesData[id] = { description, amount, note, createdAt }
  })
  return expensesData
}

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
})

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData
    const expense = { description, note, amount, createdAt }

    return db.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })
  }
}

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// SET_EXPENSE
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
})

const expensesSnapshotToArray = (expensesSnapshot) => {
  let expenses = []
  expensesSnapshot.forEach((childExpenseSnapshot) => {
    expenses.push({
      id: childExpenseSnapshot.key,
      ...childExpenseSnapshot.val()
    })
  })
  return expenses
}

export const startSetExpenses = () => {
  // const expensesObject = expensesArrayToObject(expenses)
  return (dispatch) => {
    return db.ref('expenses').once('value').then((snapshot) => {
      const expenses = expensesSnapshotToArray(snapshot)
      dispatch(setExpenses(expenses))
    })
  }
}