import React, { Component }   from "react"

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
      tags
    } = data
    const linkText = this.props.linkText || 'Read More';

    return (
      <article key={id} className={`post post-${id}`}>
        <h2 className="post-heading" dangerouslySetInnerHTML={this.html(title.rendered)}></h2>
        <div className="post-meta">
          <span className="post-author">
            by&nbsp;
            <Link authorId={author} display="name" />
          </span>
          <span>&nbsp;|&nbsp;</span>
          <span className="post-date">on {date}</span>
        </div>
        <div className="post-excerpt" dangerouslySetInnerHTML={this.html(excerpt.rendered)}></div>
        <Link path={`/post/${slug}`}>{linkText}</Link>
        <div className="post-taxonomies">
          <h3>Categories:</h3>
          {categories.map((category, i) => (
            <span key={category}>
              { i > 0 ? ', ' : '' }
              <Link termId={category} taxonomy="categories" display="name" />
            </span>
          ))}
          <h3>Tags:</h3>
          {tags.map((tag, i) => (
            <span key={tag}>
              { i > 0 ? ', ' : '' }
              <Link termId={tag} taxonomy="tags" display="name" />
            </span>
          ))}
        </div>
      </article>
    );
  }
}

export default Post
