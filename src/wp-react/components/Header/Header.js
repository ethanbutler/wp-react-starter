import React, { Component } from "react"
import "./Header.css"

import {
  Link
} from "../../components"

class Header extends Component {
  render() {
    const {
      terms
    } = this.props

    const taxonomies = Object.getOwnPropertyNames(terms)

    console.log(taxonomies)

    return (
      <header className="Header">
        <Link path="/">Home</Link>
        {taxonomies.map(taxonomy => {
          return terms[taxonomy].map(term => {
            const {
              id,
              name
            } = term
            return <Link taxonomy={taxonomy} termId={id}>{name}</Link>
          })
        })}
      </header>
    )
  }
}

export default Header
