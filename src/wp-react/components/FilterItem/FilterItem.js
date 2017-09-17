import React, { Component } from "react"
import { connect } from "react-redux"
import "./FilterItem.css"

class FilterItem extends Component {
  constructor(props){
    super(props)

    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleKeyUp(evt){
    console.log(evt)
    if(evt.which !== 13) return
    this.props.handleChange(this.props)
  }

  render() {
    const {
      children,
      filters,
      handleChange,
      id
    } = this.props

    const term = filters.terms.filter(term => id === term.id)[0] || false
    let status = null
    if(term){
      status = term.exclude ? 'excluded' : 'included'
    }

    return (
      <span
        className={`FilterItem FilterItem--${status ? status : 'none'}`}
        tabIndex="0"
        onClick={() => {handleChange(this.props)}}
        onKeyUp={this.handleKeyUp}
      >
        {children}
      </span>
    )
  }
}

const mapStateToProps = ({
  filters
}) => {
  return { filters }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleChange: ({
      id,
      multi,
      exclude,
      taxonomy
    }) => dispatch({
      type: 'UPDATE_TERM',
      filter: 'terms',
      item: {
        taxonomy,
        id,
        exclude: !!exclude,
        multi: !!multi
      }
    })
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterItem)
