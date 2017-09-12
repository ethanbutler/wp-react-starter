import { Component }          from "react"
import { connect }            from "react-redux"
import { bindActionCreators } from "redux"
import * as axios             from "axios"

const config = require("../../../config")

class Query extends Component {
  constructor() {
    super()
    this.baseUrl = `${config.baseUrl}/wp-json/wp/v2/posts`
  }

  buildQuery(args = {}) {
    let query = "?"

    Object.entries(args).forEach(([key, value]) => {
      query += `${key}=${value}&`
    })

    return query
  }

  runQuery() {
    const {
      args,
      dispatchLoading,
      dispatchErr,
      dispatchPosts,
      onComplete
    } = this.props

    dispatchLoading(true)
    console.log('Loading begins')

    console.log(`${this.baseUrl}${this.buildQuery(args)}`)
    axios.get(`${this.baseUrl}${this.buildQuery(args)}`)
      .then(res => {
        console.log('Loading ends')
        dispatchLoading(false)
        dispatchPosts(res.data)
        if(typeof onComplete === 'function'){
          onComplete(res.data)
        }
      })
      .catch(err => {
        console.log('Error')
        dispatchErr(err)
      })
  }

  componentDidMount() {
    this.runQuery()
  }

  render() {
    const {
      isLoading,
      error,
      loader,
      errorMessage
    } = this.props

    if(error){
      return errorMessage()
    } else {
      return isLoading ? loader() : null
    }
  }
}

const mapStateToProps = ({
  isLoading,
  error
}) => {
  return { isLoading, error }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  dispatchLoading: (isLoading) => dispatch({
    type: 'SET_LOADING',
    isLoading
  }),
  dispatchErr: (err) => dispatch({
    type: 'SET_ERROR',
    err
  }),
  dispatchPosts: (posts) => dispatch({
    type: 'ADD_POSTS_TO_STACK',
    posts
  })
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Query)
