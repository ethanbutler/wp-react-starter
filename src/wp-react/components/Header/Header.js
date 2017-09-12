import React, { Component } from "react"

import {
  Link
} from "../../components"

class Header extends Component {
  render() {
    return (
      <header>
        <Link path="/">Home</Link>
      </header>
    )
  }
}

export default Header
