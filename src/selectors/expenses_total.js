// import selectExpenses from "./expenses"

// export default (expenses, filters) => {
//   const selectedExpenses = selectExpenses(expenses, filters)
//   // const expensesAmounts = selectExpenses.map((expense) => expense.amount)
//   const expensesTotal = selectedExpenses.reduce((a, b) => a + b.amount, 0)
//   return expensesTotal
// }

export default (expenses) => {
  return expenses
    .map((expense) => expense.amount)
    .reduce((sum, value) => sum + value, 0)
}