import React, { Component } from "react"
import { connect }          from "react-redux"

class Loop extends Component {
  constructor(props){
    super(props)

    this.applyFilters = this.applyFilters.bind(this)
    this.author       = this.author.bind(this)
    // this.pagination   = this.pagination.bind(this)
    // this.post         = this.post.bind(this)
    // this.status       = this.status.bind(this)
    // this.search       = this.search.bind(this)
    this.terms        = this.terms.bind(this)
    this.applySort    = this.applySort.bind(this)
  }

  /**
   * Given an array of posts and a tree of filter terms, returns an array of posts matching those terms.
   * @param  {Array}  posts   WP REST API post objects.
   * @param  {Object} filters Tree of filter terms.
   * @return {Array}          Matching posts.
   */
  applyFilters(posts, filters){
    const props = Object.getOwnPropertyNames(filters)

    return !props.length ? posts :
      props.reduce((acc, prop) => {
        const cb     = this[prop]
        const value  = filters[prop]

        return cb ? acc.filter((post) => {
          return cb(post, value)
        }) : acc
      }, posts)
  }

  /**
   * Given a post, determines if it was written by the currently selected author.
   * @param  {Object}  post WP REST API single post data.
   * @return {Boolean}      Returns true if post matches author, or if no author is provided.
   */
  author(post, author = 0){
    return !author || (post.author === author)
  }

  /**
   * Given a post, determines if it meets every active term filters. Term filters will match the following shape:
   *
   * {
   *   taxonomy: String,
   *   id: Number,
   *   exclude: Boolean
   * }
   *
   * @param  {Object}  post  WP REST API single post data.
   * @return {Boolean}       Returns true if post matches each term filter, ignoring terms with taxonomies that don't describe the post.
   */
  terms(post, terms){
    return terms.every((term) => {
      const { taxonomy, id, exclude } = term
      return !post[taxonomy] || (post[taxonomy].includes(id) !== !!exclude)
    })
  }

  /**
   * [sort description]
   * @param  {[type]} order   [description]
   * @param  {[type]} orderby [description]
   * @return {[type]}         [description]
   */
  applySort({order, orderby}){
    return (a, b) => {
      const asc = ( order === 'asc' )
      const terms = {
        a: a[orderby].rendered || a[orderby],
        b: b[orderby].rendered || b[orderby]
      }

      if(
        typeof terms['a'] === 'string' &&
        typeof terms['b'] === 'string'
      ) {
        return terms['a'].localeCompare(terms['b']) * (asc ? 1 : -1)
      } else {
        return terms['a'] - terms['b'] * (asc ? 1 : -1)
      }
    }
  }

  render() {
    const {
      posts,
      sort,
      filters,
      renderer,
      empty,
    } = this.props

    return (
      <div>
        {
          posts.length ?
            this
            .applyFilters(posts, filters)
            .sort(this.applySort(sort))
            .map(post => {
              return <div key={post.id}>{ renderer(post) }</div>
            }) :
            empty()
        }
      </div>
    )
  }
}

const mapStateToProps = ({
  filters,
  posts,
  sort
}) => {
  return {
    filters,
    posts,
    sort
  }
}

export default connect(
  mapStateToProps
)(Loop)
