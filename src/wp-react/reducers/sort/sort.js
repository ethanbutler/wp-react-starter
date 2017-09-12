const sort = (state = {
  orderby: 'date',
  order: 'desc'
}, action ) => {
  switch(action.type){
    case 'SET_ORDER':
      return Object.assign({}, state, {
        order: action.order
      })
    case 'SET_ORDERBY':
      return Object.assign({}, state, {
        orderby: action.orderby
      })
    default:
      return state
  }
}

export default sort
