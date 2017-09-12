import React, { Component } from "react"
import FilterItem from '../FilterItem/FilterItem'

class FilterBank extends Component {
  render() {
    const {
      taxonomy,
      items,
      multi,
      exclude
    } = this.props

    return items.length ? (
      <ul>{items.map(item => {
        const {
          name,
          id
        } = item

        return (
          <li key={id}>
            <FilterItem
              id={id}
              taxonomy={taxonomy}
              multi={multi}
              exclude={exclude}
            >
              {name}
            </FilterItem>
          </li>
        )
      })}</ul>
    ) : null
  }
}

export default FilterBank
