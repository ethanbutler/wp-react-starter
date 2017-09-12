import React, { Component }   from "react"
import { connect }            from "react-redux"
import { bindActionCreators } from "redux"

class Sort extends Component {
  constructor(props) {
    super(props)
    this.orderby = [
      'date',
      'modified',
      'title'
    ]

    this.order = [
      'desc',
      'asc'
    ]
  }

  render() {
    const {
      dispatchOrder,
      dispatchOrderby
    } = this.props

    return (
      <div>
        <select onChange={(evt) => { dispatchOrderby(evt.target.value) }}>
          {this.orderby.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <select onChange={(evt) => { dispatchOrder(evt.target.value) }}>
          {this.order.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    )
  }
}

const mapStateToProps = ({
  sort
}) => {
  return { sort }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  dispatchOrder: (order) => dispatch({
    type: 'SET_ORDER',
    order
  }),
  dispatchOrderby: (orderby) => dispatch({
    type: 'SET_ORDERBY',
    orderby
  })
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sort)
