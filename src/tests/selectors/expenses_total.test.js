import selectExpensesTotal from '../../selectors/expenses_total'
import expenses from '../fixtures/expenses'

test('should return total of 0 if no expenses', () => {
  const total = selectExpensesTotal([])
  expect(total).toBe(0)
})

test('should return total correctly for 1 expense', () => {
  const total = selectExpensesTotal([expenses[0]])
  expect(total).toBe(60)
})

test('should return total correctly for multiple', () => {
  const total = selectExpensesTotal(expenses)
  expect(total).toBe(400060)
})
