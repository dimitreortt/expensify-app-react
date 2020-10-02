import { login, logout } from "../../actions/auth"

test('should login user', () => {
  const uid = '123'
  const action = login(uid)
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  })
})

test('should logout user', () => {
  const uid = '123'
  const action = logout(uid)
  expect(action).toEqual({
    type: 'LOGOUT',
    uid
  })
})