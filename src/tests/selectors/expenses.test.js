import selectExpenses from "../../selectors/expenses"
import moment from "moment"
import expenses from "../fixtures/expenses"

test("should filter expenses by text provided", () => {
  const result = selectExpenses(expenses, {
    text: 'a',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  })
  expect(result).toEqual([expenses[2], expenses[1]])
})

test('should filter by start date', () => {
  const result = selectExpenses(expenses, {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  })
  expect(result).toEqual([expenses[2], expenses[0]])
})

test('should filter by endDate', () => {
  const result = selectExpenses(expenses, {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  })
  expect(result).toEqual([expenses[0], expenses[1]])
})

test('should sort by date', () => {
  const result = selectExpenses(expenses, {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  })
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
})

test('should sort by amount', () => {
  const result = selectExpenses(expenses, {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  })
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]])
})