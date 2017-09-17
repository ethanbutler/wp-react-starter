const isOffline = (state = false, action) => {
  switch(action.type){
    case 'SET_OFFLINE':
      return action.isOffline
    default:
      return state
  }
}


export default isOffline
