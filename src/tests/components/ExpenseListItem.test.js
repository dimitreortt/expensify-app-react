import expenses from "../fixtures/expenses"
import ExpenseListItem from "../../components/ExpenseListItem"
import { shallow } from "enzyme"
import React from 'react'

test('should test ExpenseListItem with given expense', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[1]} />)
  expect(wrapper).toMatchSnapshot()
})