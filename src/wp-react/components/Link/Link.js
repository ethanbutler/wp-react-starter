import React, { Component }   from "react"
import { connect }            from "react-redux"
import { push }               from "react-router-redux"
import { bindActionCreators } from "redux"

class Link extends Component {
  render() {
    const {
      children,
      path,
      go,
      authorId,
      taxonomy,
      termId,
      terms,
      authors,
      display,
      handleAuthor,
      handleTerms
    } = this.props

    let destination = path
    let inner = children
    let action = null

    if(authorId){
      const match = authors.filter((author) => author.id === authorId)[0]
      destination = `/author/${match.slug}`
      inner = match[display]
      action = () => { handleAuthor(match) }
    } else if(termId){
      const match = terms[taxonomy].filter((term) => term.id === termId)[0]
      destination = `/${taxonomy}/${match.slug}`
      inner = match[display]
      action = () => { handleTerms({
        id: match.id,
        taxonomy
      })}
    }

    return (
      <a
        tabIndex={0}
        onClick={() => {
          go(destination)
          if(action) action()
        }}
      >{inner}</a>
    )
  }
}

const mapStateToProps = ({authors, terms}) => {
  return { authors, terms }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  go: (path) => push(path),
  handleAuthor: ({id}) => dispatch({
    type: 'UPDATE_AUTHOR',
    item: { id }
  }),
  handleTerms: ({id, taxonomy}) => dispatch({
    type: 'UPDATE_TERM',
    filter: 'terms',
    item: { id, taxonomy },
    force: true
  })
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)
