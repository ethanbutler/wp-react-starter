import React, { Component } from "react"

import {
  Error,
  Loader,
  Loop,
  NoResults,
  NotFound,
  Post,
  Query
} from '../../components'

class Archive extends Component {
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

  render404() {
    return <NotFound />
  }

  render() {
    const {
      data
    } = this.props

    const args = {}

    args[data.taxonomy] = data.id

    console.log(data)

    if(!data.id){
      return (
        <main>{this.render404()}</main>
      )
    }

    return (
      <div>
        <h1>{data.name}</h1>
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

export default Archive
