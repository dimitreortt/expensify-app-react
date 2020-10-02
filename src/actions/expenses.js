import { db } from '../firebase/firebase'

export const expensesArrayToObject = (expenses) => {
  let expensesData = {}
  expenses.forEach(({ description, id, note, amount, createdAt }) => {
    expensesData[id] = { description, amount, note, createdAt }
  })
  return expensesData
}

export const expensesSnapshotToArray = (expensesSnapshot) => {
  let expenses = []
  expensesSnapshot.forEach((childExpenseSnapshot) => {
    expenses.push({
      id: childExpenseSnapshot.key,
      ...childExpenseSnapshot.val()
    })
  })
  return expenses
}

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
})

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData
    const expense = { description, note, amount, createdAt }

    return db.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
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

export const startRemoveExpense = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return db.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }))
    })
  }
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return db.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates))
    })
  }
}

// SET_EXPENSE
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
})

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return db.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      const expenses = expensesSnapshotToArray(snapshot)
      dispatch(setExpenses(expenses))
    })
  }
}