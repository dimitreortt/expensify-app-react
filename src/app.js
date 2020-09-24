import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense, removeExpense, editExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'


const store = configureStore()

store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000, amount: 5000 }))
// store.dispatch(addExpense({ description: 'Food bill', createdAt: 2000, amount: 20000 }))
// store.dispatch(addExpense({ description: 'Rent', createdAt: 3000, amount: 1000 }))
store.dispatch(setTextFilter('bill'))

const state = store.getState()

console.log(getVisibleExpenses(state.expenses, state.filters))

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))
