import React, { Component } from "react";

import "./Post.css";

class Post extends Component {

  render() {
    const nickname = this.props.nickname;
    const avatar = this.props.avatar;
    const image = this.props.image;
    const caption = this.props.caption;
    return (
      <article className="Post" ref="Post">
  
        <div className="Post-image">
          <div className="Post-image-bg">
            <img alt={caption} src={image} />
          </div>
        </div>
        <div className="Post-caption">

        </div>
      </article>
    );
  }
}

export default Post;
