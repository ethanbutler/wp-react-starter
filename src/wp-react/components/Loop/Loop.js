import React, { Component } from "react"
import { connect }          from "react-redux"

class Loop extends Component {
  constructor(props){
    super(props)

    this.applyFilters      = this.applyFilters.bind(this)
    this.applyPagination   = this.applyPagination.bind(this)
    this.applySort         = this.applySort.bind(this)
    this.author            = this.author.bind(this)
    this.post              = this.post.bind(this)
    this.search            = this.search.bind(this)
    this.terms             = this.terms.bind(this)
  }

  /**
   * Given an array of posts and a tree of filter terms, returns an array of posts matching those terms.
   * @param  {Array}  posts   WP REST API post objects.
   * @param  {Object} filters Tree of filter terms.
   * @return {Array}          Matching posts.
   */
  applyFilters(posts, filters) {
    const props = Object.getOwnPropertyNames(filters)

    // If no filters, return posts array
    return !props.length ? posts :
      // Loop over filters and check if filter name has a matching method on this class
      props.reduce((acc, prop) => {
        const cb     = this[prop]
        const value  = filters[prop]

        // If a method exists, apply it as a callback to Array.filter and pass value of filter
        // If not, return the array of posts at its current state
        return cb ? acc.filter((post) => {
          return cb(post, value)
        }) : acc
      }, posts)
  }

  /**
   * Returns a "page" of posts given a per-page count and the page index (one-based index).
   * @param  {Array}  posts Array of posts.
   * @param  {Number} count Per-page count.
   * @param  {Number} page  Page number.
   * @return {Array}        Slice array of posts.
   */
  applyPagination(posts, { count, page }) {
    const index = count * (page - 1)
    return posts.slice(index, index + count)
  }

  /**
   * [sort description]
   * @param  {[type]} order   [description]
   * @param  {[type]} orderby [description]
   * @return {[type]}         [description]
   */
  applySort({order, orderby}){
    return (a, b) => {
      const asc = (value) => value * (order === 'asc' ? 1 : -1)
      const terms = {
        a: a[orderby].rendered || a[orderby],
        b: b[orderby].rendered || b[orderby]
      }

      if(
        typeof terms['a'] === 'string' &&
        typeof terms['b'] === 'string'
      ) {
        return asc(terms['a'].localeCompare(terms['b']))
      } else {
        return asc(terms['a'] - terms['b'])
      }
    }
  }

  /**
   * Given a post, determines if it was written by the currently selected author.
   * @param  {Object}  post WP REST API single post data.
   * @return {Boolean}      Returns true if post matches author, or if no author is provided.
   */
  author(post, author = 0) {
    return !author || (post.author === author)
  }

  /**
   * Given a post, determine if a property "field" matches a value.
   * Uses for this would be filtering posts by an array of IDs, slugs, or titles.
   * @param  {Object}       post  WP REST API single post data.
   * @param  {String}       field Name of the field to be accessed. Default "id".
   * @param  {Array/Number} value An array of values or a single value.
   * @return {Boolean}      Returns true if post matches provided criteria.
   */
  post(post, { field, value }) {
    field = field || "id"
    return !value || (Array.isArray(value) ? value.includes(post[field]) : value === post[value])
  }

  /**
   * Given a post, determine if given fields contain a given serach term.
   * @param  {Object} post     WP REST API single post data.
   * @param  {String} term     A string of text to use. Case-insensitive.
   * @param  {Array}  [fields] Optional. An array of properties to look in. Defaults to "title" and "content". If any
   * @return {Boolean}  Returns true if any post fields contain provided search term OR if search is empty.
   */
  search(post, term, fields = ["title", "content"]) {
    return !term.length || fields.some(field => {
      const value = post[field].rendered || post[field]
      return value.toUpperCase().includes(term.toUpperCase())
    })
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
   * @param  {Object}          post  WP REST API single post data.
   * @param  {Array<Object>}   terms An array of term filters matching the shape above.
   * @return {Boolean}         Returns true if post matches each term filter, ignoring terms with taxonomies that don't describe the post.
   */
  terms(post, terms = []){
    return terms.every((term) => {
      const { taxonomy, id, exclude } = term
      return !post[taxonomy] || (post[taxonomy].includes(id) !== !!exclude)
    })
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
            this.applyPagination(
              this
              .applyFilters(posts, filters)
              .sort(this.applySort(sort))
              .map(post => {
                return <div key={post.id}>{ renderer(post) }</div>
              }),
              filters.pagination
            ):
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
