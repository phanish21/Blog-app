import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

// Component to display a single post summary
const Post = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.body.substring(0, 100)}...</p>
      <Link to={`/posts/${post.id}`}>Read More</Link>
    </div>
  );
};

export default Post;
