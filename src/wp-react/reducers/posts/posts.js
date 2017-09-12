const posts = (state = [], action) => {
  switch(action.type){
    case 'ADD_POSTS_TO_STACK':
      const ids = []
      return [...state, ...action.posts].filter(post => {
        if(!ids.includes(post.id)){
          ids.push(post.id)
          return true
        }
        return false
      })
    default:
      return state
  }
}

export default posts
