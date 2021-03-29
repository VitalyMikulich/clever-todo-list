import { createStore } from 'redux'
import reducers from './reducers'

// const initialState = {
//   activeTheme: 'light'
// }

const store = createStore(reducers)

export default store
