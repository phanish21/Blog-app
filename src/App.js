import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import { getPosts } from './services/api';

// Main application component
const App = () => {
  // State hooks for posts, loading status, and error message
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Function to handle creation of a new post
  const handlePostCreated = (newPost) => {
    setPosts([...posts, newPost]);
  };

  // Function to handle deletion of a post
  const handlePostDeleted = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={<PostList posts={posts} onPostDeleted={handlePostDeleted} />} 
        />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route 
          path="/create" 
          element={<CreatePost onPostCreated={handlePostCreated} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
