import { SET_USER_ID, SET_CURRENT_DATE, SET_THEME } from './actionTypes'

const setUserId = (id) => ({
  type: SET_USER_ID,
  id,
})

const setDate = (date) => ({
  type: SET_CURRENT_DATE,
  date,
})

const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
})

export { setUserId, setDate, setTheme }
