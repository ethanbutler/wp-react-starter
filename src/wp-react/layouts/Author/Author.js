import React, { Component } from "react"

import {
  Error,
  Loader,
  Loop,
  NoResults,
  Post,
  Query
} from '../../components'

class Author extends Component {
  renderSingle(post) {
    return <Post data={post}/>
  }

  renderNoResults() {
    return <NoResults />
  }

  renderLoader() {
    return <Loader />
  }

  renderError() {
    return <Error message={`Something went wrong!`}/>
  }

  render() {
    const {
      data
    } = this.props

    const args = {
      author: data.id
    }

    return (
      <div>
        <h1>Posts By {data.name}</h1>
        <div>
          <Query
            args={args}
            errorMessage={this.renderError}
            loader={this.renderLoader}
          />
          <Loop
            posts={[]}
            renderer={this.renderSingle}
            empty={this.renderNoResults}
          />
        </div>
      </div>
    )
  }
}

export default Author
