import configureMockStore from 'redux-mock-store'
import { removeExpense, editExpense, addExpense, startAddExpense } from "../../actions/expenses"
import expenses from "../fixtures/expenses"
import thunk from 'redux-thunk'
import {db} from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

test("should return an action to remove an expense", () => {
  const result = removeExpense({ id: "asd123" })
  expect(result).toEqual({
    type: "REMOVE_EXPENSE",
    id: "asd123",
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

test('should add expense to database and store', (done) => {
  const store = createMockStore({})
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

    return db.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData)
    done()
  })
})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({})
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

    return db.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpense)
    done()
  })
})

test("should return an add expense action with provided values", () => {
  const expense = expenses[0]
  const addAction = addExpense(expense)

  expect(addAction).toEqual({
    type: "ADD_EXPENSE",
    expense
  })
})

