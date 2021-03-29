import { combineReducers } from 'redux'

const userID = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return action.id
    default:
      return state
  }
}

const currentDate = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_DATE':
      return action.date
    default:
      return state
  }
}

const activeTheme = (state = 'light', action) => {
  switch (action.type) {
    case 'SET_THEME':
      return action.theme
    default:
      return state
  }
}

const reducers = combineReducers({
  activeTheme,
  userID,
  currentDate,
})

export default reducers
