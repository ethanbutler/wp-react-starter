import React, { Component } from "react"

class Error extends Component {
  render() {
    const { message } = this.props
    return (
      <span>{message}</span>
    )
  }
}

export default Error
