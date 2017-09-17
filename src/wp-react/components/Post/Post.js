import React, { Component }   from "react"
import * as moment            from "moment"
import "./Post.css"

import {
  Link
} from '../'

class Post extends Component {
  html(__html){
    return { __html }
  }

  render() {
    const {
      data,
    } = this.props
    const {
      id,
      date,
      title,
      excerpt,
      slug,
      author,
      categories,
      tags,
      featured_media_objects
    } = data
    const linkText = this.props.linkText || 'Read More';

    return (
      <article key={id} className={`post post-${id}`}>
        <h2 className="heading" dangerouslySetInnerHTML={this.html(title.rendered)}></h2>
        <div className="meta">
          <span className="author">
            by&nbsp;
            <Link authorId={author} display="name" />
          </span>
          <span className="date">&nbsp;on {moment(date).format('MMM d, YYYY, h:mm:ss a')}</span>
        </div>
        <div className="thumbnailWrap">
          {featured_media_objects[3] ? <img className="thumbnail" src={featured_media_objects[3][0]} alt={`Post Thumbnail`}/> : null}
        </div>
        <div className="main">
          <div className="excerpt" dangerouslySetInnerHTML={this.html(excerpt.rendered)}></div>
          <Link path={`/post/${slug}`}>{linkText}</Link>
        </div>
        <div className="taxonomies">
          <h3 className="taxonomyHeader">Categories:</h3>
          {categories.length ? categories.map((category, i) => (
            <span className="taxonomy" key={category}>
              { i > 0 ? ', ' : '' }
              <Link termId={category} taxonomy="categories" display="name" />
            </span>
          )) : <span className="taxonomy">None</span>}
          <h3 className="taxonomyHeader">Tags:</h3>
          {tags.length ? tags.map((tag, i) => (
            <span className="taxonomy" key={tag}>
              { i > 0 ? ', ' : '' }
              <Link termId={tag} taxonomy="tags" display="name" />
            </span>
          )) : <span className="taxonomy">None</span>}
        </div>
      </article>
    );
  }
}

export default Post
