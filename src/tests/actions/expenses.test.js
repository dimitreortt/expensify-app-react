import configureMockStore from 'redux-mock-store'
import {
  removeExpense,
  startRemoveExpense,
  editExpense,
  addExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  expensesArrayToObject,
  startEditExpense
} from "../../actions/expenses"
import expenses from "../fixtures/expenses"
import thunk from 'redux-thunk'
import { db } from '../../firebase/firebase'

const uid = 'thisisatestuid'
const defaultAuthState = { auth: { uid } }
const expensesObject = expensesArrayToObject(expenses)
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
  db.ref(`users/${uid}/expenses`).set(expensesObject).then(() => done())
})

test("should return an add expense action with provided values", () => {
  const expense = expenses[0]
  const addAction = addExpense(expense)

  expect(addAction).toEqual({
    type: "ADD_EXPENSE",
    expense
  })
})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState)
  const defaultExpense = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }

  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultExpense
      }
    })

    return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpense)
    done()
  })
})

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState)
  const expenseData = {
    description: 'flower to loveoflife',
    amount: 1000,
    note: 'she deserves all',
    createdAt: 1000
  }

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    })

    return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData)
    done()
  })
})

test('should return a set expenses action', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})

test('should fetch expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState)

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
    done()
  })
})

test("should return an action to remove an expense", () => {
  const result = removeExpense({ id: "asd123" })
  expect(result).toEqual({
    type: "REMOVE_EXPENSE",
    id: "asd123",
  })
})

test("should remove expense from firebase and store", (done) => {
  const store = createMockStore(defaultAuthState)
  const id = expenses[0].id
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    })

    db.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
      expect(snapshot.val()).toBeFalsy()
      // const dbExpenses = expensesSnapshotToArray(snapshot)
      // expect(dbExpenses).toContainEqual(expenses[1])
      // expect(dbExpenses).toContainEqual(expenses[2])
      // expect(expenses.length).toBe(2)
      done()
    })
  })
})

test("should return an action to edit an expense", () => {
  const updates = {
    createdAt: 100,
    amount: 3500,
    description: "Rent bill",
    note: "Pay fast man",
  }
  const result = editExpense("asd123", updates)
  expect(result).toEqual({
    type: "EDIT_EXPENSE",
    id: "asd123",
    updates: {
      ...updates,
    },
  })
})

test('should edit expense in firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  const updates = {
    createdAt: 100,
    amount: 3500,
    description: "Rent bill",
    note: "Pay fast man",
  }
  const id = expenses[1].id
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    })

    db.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
      expect(snapshot.val()).toEqual(updates)
      done()
    })
  })
})