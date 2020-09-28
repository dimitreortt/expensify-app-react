import filterReducer from '../../reducers/filters'
import moment from 'moment'

test('should setup default filter values', () => {
  const result = filterReducer(undefined, { type: '@@INIT' })
  expect(result).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should set sortBy to amount', () => {
  const result = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' })
  expect(result.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  }
  const action = { type: 'SORT_BY_DATE' }
  const state = filterReducer(currentState, action)
  expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
  const state = filterReducer(undefined, {
    type: 'SET_TEXT_FILTER',
    text: 'reborn'
  })
  expect(state.text).toBe('reborn')
})

test('should set startDate filter', () => {
  const startDate = moment()
  const state = filterReducer(undefined, {
    type: 'SET_START_DATE',
    startDate
  })
  expect(state.startDate).toEqual(startDate)
})

test('should set endDate filter', () => {
  const endDate = moment()
  const state = filterReducer(undefined, {
    type: 'SET_END_DATE',
    endDate: moment()
  })
  expect(state.endDate).toEqual(endDate)
})

