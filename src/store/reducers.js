const reducers = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER': return {userID: action.value}
    default: return state
  }
}

export default reducers