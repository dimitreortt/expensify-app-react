import { createStore } from 'redux'

// Action Generators
const incrementCount = ({ incrementBy = 1 } = {}) => {
  return {
    type: 'INCREMENT',
    incrementBy
  }
}

const decrementCount = ({ decrementBy = 1 } = {}) => {
  return {
    type: 'DECREMENT',
    decrementBy
  }
}

const setCount = ({ newValue } = {}) => {
  return {
    type: 'SET',
    newValue
  }
}

const resetCount = () => {
  return {
    type: 'RESET'
  }
}

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
    case 'SET':
      return {
        count: action.newValue
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state
  }
})

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(incrementCount({ incrementBy: 2 }))

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(resetCount())

store.dispatch(decrementCount({ decrementBy: 4 }))

store.dispatch(setCount({ newValue: 4 }))

store.dispatch(incrementCount())

store.dispatch(decrementCount())
