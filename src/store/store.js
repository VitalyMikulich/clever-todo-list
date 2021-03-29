import { createStore } from 'redux'
import reducers from './reducers'

const initialState = {
  theme: 'light'
}

const store = createStore(reducers, initialState)

export default store
