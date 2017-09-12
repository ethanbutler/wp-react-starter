import React, { Component } from "react"
import { connect }          from "react-redux"
import { withRouter }       from "react-router"
import { Route }            from "react-router-dom"

import {
  Footer,
  Header
} from "./wp-react/components"

import {
  Archive,
  Author,
  Index,
  Single
} from "./wp-react/layouts"

class App extends Component {
  render() {
    const {
      posts,
      terms,
      authors
    } = this.props

    const taxonomies = Object.getOwnPropertyNames(terms)

    return (
      <div>
        <Header />
        <main>
          <Route path="/" exact render={() => <Index terms={terms}/>} />
          <Route path="/post/:slug" render={(props) => {
            const { slug } = props.match.params
            const post = posts.filter((post) => post.slug === slug)
            return <Single data={post[0]} slug={slug} />
          }} />
          <Route path="/author/:slug" render={(props) => {
            const { slug } = props.match.params
            const author = authors.filter((author) => author.slug === slug)[0]
            return <Author data={author} />
          }} />
          {taxonomies.map(taxonomy => (
            <Route key={taxonomy} path={`/${taxonomy}/:slug`} render={(props) => {
              const { slug } = props.match.params
              const term = terms[taxonomy].filter((term) => term.slug === slug)[0] || {}
              term.taxonomy = taxonomy
              return <Archive taxonomy={taxonomy} data={term} />
            }}/>
          ))}
        </main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => state

export default withRouter(connect(
  mapStateToProps
)(App))
