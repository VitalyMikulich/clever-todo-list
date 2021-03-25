import { SET_USER_ID, SET_CURRENT_DATE } from './actionTypes'

const setUserId = id => ({
  type: SET_USER_ID,
  id
})

const setDate = date => ({
  type: SET_CURRENT_DATE,
  date
})

export { setUserId, setDate }