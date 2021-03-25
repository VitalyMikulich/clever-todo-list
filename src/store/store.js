import { createStore } from "redux"
import reducers from './reducers'

// const initialState = {
//   userID: '',
//   currentDate: ''
// }
const store = createStore(reducers)

export default store