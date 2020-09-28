import { removeExpense, editExpense, addExpense } from "../../actions/expenses"

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

test("should return an add expense action with provided values", () => {
  const expense = {
    createdAt: 100,
    amount: 3500,
    description: "Rent bill",
    note: "Pay fast man",
  }

  const addAction = addExpense(expense)
  expect(addAction).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expense,
      id: expect.any(String),
    },
  })
})

test("should return an add expense action with default values", () => {
  const addAction = addExpense()

  expect(addAction).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String),
    },
  })
})
