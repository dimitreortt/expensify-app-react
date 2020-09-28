import {
  setTextFilter,
  sortByAmount,
  setStartDate,
  setEndDate,
  sortByDate,
} from "../../actions/filters"
import moment from "moment"

test("should return an action to set text filter with provided text", () => {
  const action = setTextFilter("loveoflife")
  expect(action).toEqual({
    text: "loveoflife",
    type: "SET_TEXT_FILTER",
  })
})

test("should return an action to set text filter with default text", () => {
  const action = setTextFilter()
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "",
  })
})

test("should return an action to set sortBy filter to sort by amount", () => {
  const action = sortByAmount()
  expect(action).toEqual({ type: "SORT_BY_AMOUNT" })
})

test("should return an action to set sortBy filter to sort by date", () => {
  const action = sortByDate()
  expect(action).toEqual({ type: "SORT_BY_DATE" })
})

test("should return an action to set start date with date provided", () => {
  const date = moment()
  const action = setStartDate(date)
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: date,
  })
})

test("should return an action to set end date with date provided", () => {
  const date = moment()
  const action = setEndDate(date)
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: date,
  })
})
