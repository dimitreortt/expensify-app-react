import { filter, filters, altFilters } from "../fixtures/filters"
import React from 'react'
import { shallow } from "enzyme"
import { ExpenseListFilters } from "../../components/ExpenseListFilters"
import moment from 'moment'

let setTextFilter, setStartDate, setEndDate, sortByAmount, sortByDate, wrapper

beforeEach(() => {
  setTextFilter = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()
  sortByAmount = jest.fn()
  sortByDate = jest.fn()
  wrapper = shallow(<ExpenseListFilters
    filters={filters}
    setTextFilter={setTextFilter}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    sortByAmount={sortByAmount}
    sortByDate={sortByDate}
  />)
})

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters correctly', () => {
  wrapper.setProps({
    filters: altFilters
  })
  expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
  const value = 'newTextValue'
  wrapper.find('input').simulate('change', {
    target: { value }
  })
  expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should sort by date', () => {
  const value = 'date'
  wrapper.setProps({
    filters: altFilters
  })
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByDate).toHaveBeenCalled()
  expect(sortByAmount).not.toHaveBeenCalled()
})

test('should sort by amount', () => {
  const value = 'amount'
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByDate).not.toHaveBeenCalled()
  expect(sortByAmount).toHaveBeenCalled()
})

test('should handle date changes', () => {
  const startDate = moment(0)
  const endDate = moment(0).add(3, 'days')
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate })
  expect(setStartDate).toHaveBeenLastCalledWith(startDate)
  expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate'
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused)
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})

