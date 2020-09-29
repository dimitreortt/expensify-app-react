import { shallow } from "enzyme"
import { ExpenseSummary } from '../../components/ExpenseSummary'
import React from 'react'

test('should render ExpenseSummary correctly with 1 expense', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={1} expensesTotal={124} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseSummary correctly with 1 expense', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={3} expensesTotal={25245} />)
  expect(wrapper).toMatchSnapshot()
})