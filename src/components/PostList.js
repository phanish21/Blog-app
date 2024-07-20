import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../services/api';
import './PostList.css';

const PostList = ({ posts, onPostDeleted }) => {
  // State hooks for pagination, search query, and loading status
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Set loading to false when posts are loaded
  useEffect(() => {
    if (posts.length > 0) {
      setLoading(false);
    }
  }, [posts]);

  // Handle deletion of a post
  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      onPostDeleted(id);
    } catch (err) {
      console.error('Failed to delete post:', err.message);
    }
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="posts-container">
      <input
        type="text"
        placeholder="Search posts by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {currentPosts.map(post => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.body.substring(0, 100)}...</p>
              <div className="buttons">
                <button>
                  <Link to={`/posts/${post.id}`}>Read More</Link>
                </button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </div>
          ))}
          <nav>
            <ul className="pagination">
              {pageNumbers.map(number => (
                <li key={number} className="page-item">
                  <button onClick={() => paginate(number)} className="page-link">
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default PostList;
