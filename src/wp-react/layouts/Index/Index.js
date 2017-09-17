import React, { Component }   from "react"
import { connect }            from "react-redux"
import { bindActionCreators } from "redux"
import "./Index.css"

import {
  Error,
  FilterBank,
  Loader,
  Loop,
  NoResults,
  Post,
  Query,
  Sort
} from '../../components'

class Index extends Component {
  componentWillMount() {
    const { reset } = this.props
    reset()
  }

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
      args,
      terms
    } = this.props

    return (
      <div className="index">
        <div className="main">
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
        <div className="sidebar">
          <div className="sidebar-inner">
            <div className="sidebar-group">
              <strong>Sort</strong>
              <Sort />
            </div>
            <div className="sidebar-group">
              <strong>Posts categorized:</strong>
              <FilterBank taxonomy={"categories"} items={terms.categories} />
            </div>
            <div className="sidebar-group">
              <strong>Posts tagged:</strong>
              <FilterBank taxonomy={"tags"} items={terms.tags} multi={true} />
            </div>
            <div className="sidebar-group">
              <strong>Posts not in:</strong>
              <FilterBank taxonomy={"categories"} items={terms.categories} exclude={true} multi={true} />
              <FilterBank taxonomy={"tags"} items={terms.tags} exclude={true} multi={true} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  reset: () => dispatch({
    type: 'RESET_FILTERS'
  })
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Index)
