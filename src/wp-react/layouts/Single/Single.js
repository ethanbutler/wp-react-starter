import React, { Component } from "react"
import {
  Error,
  Loader,
  NotFound,
  Query
} from "../../components"

class Single extends Component {
  constructor(props) {
    super(props)

    this.state = {
      is404: false,
      data: props.data
    }

    this.handleQueryResponse = this.handleQueryResponse.bind(this)
  }

  html(__html){
    return { __html }
  }

  renderLoader() {
    return <Loader />
  }

  render404() {
    return <NotFound />
  }

  renderError() {
    return <Error message={`Something went wrong!`}/>
  }

  handleQueryResponse(data) {
    if(!data.length){
      this.setState((prev) => Object.assign({}, prev, {
        is404: true
      }))
    } else {
      this.setState((prev) => Object.assign({}, prev, {
        is404: false,
        data: data[0]
      }))
    }
  }

  render() {
    const {
      is404
    } = this.state

    const {
      slug
    } = this.props

    const data = this.props.data || this.state.data

    if(is404){
      return(
        <main>{this.render404()}</main>
      )
    }

    if(!data){
      return <Query
        args={{slug}}
        loader={this.renderLoader}
        errorMessage={this.renderError}
        onComplete={this.handleQueryResponse}
      />
    }

    return (
      <article>
        <h1 dangerouslySetInnerHTML={this.html(data.title.rendered)} />
        <div dangerouslySetInnerHTML={this.html(data.content.rendered)} />
      </article>
    )
  }
}

export default Single
