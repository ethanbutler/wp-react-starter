const filters = (state = {
  author: 0,
  terms: []
}, action) => {
  const { type, filter, item, force } = action
  const newState = {}
  switch(type){
    case 'UPDATE_AUTHOR':
      return Object.assign({}, state, {
        author: item.id
      })

    case 'UPDATE_TERM':
      if(state[filter].length && !force){
        let matchingTerm = false
        const updated = state[filter].reduce((acc, prev) => {
          const {
            id,
            exclude,
            multi
          } = item

          // Check for same term
          if(id === prev.id) {
            matchingTerm = true
            // Check for deeper equality
            if(exclude !== prev.exclude) {
              acc.push(item)
            } else {
              // Remove item if deeply equal
            }
          } else {
            if(multi) {
              acc.push(prev)
            }
          }
          return acc
        }, [])
        newState[filter] = matchingTerm ? updated : [...updated, item]
      } else {
        newState[filter] = [item]
      }

      return Object.assign({}, state, newState)

    case 'RESET_FILTERS':
      return {
        author: 0,
        terms: []
      }
    default:
      return state
  }
}

export default filters
