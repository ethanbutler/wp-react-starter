const error = (state = null, action) => {
  switch(action.type){
    case 'SET_ERROR':
      return action.err
    default:
      return state
  }
}

export default error
