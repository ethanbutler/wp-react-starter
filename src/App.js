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

import "./App.css"

class App extends Component {
  render() {
    const {
      posts,
      terms,
      authors,
      isOffline
    } = this.props

    const taxonomies = Object.getOwnPropertyNames(terms)

    return (
      <div className="App">
        {isOffline ? <div>You appear to be offline.</div> : null}
        <Header terms={terms} />
        <main className="Main">
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
        <Footer className="Footer" />
      </div>
    )
  }
}

const mapStateToProps = (state) => state

export default withRouter(connect(
  mapStateToProps
)(App))
