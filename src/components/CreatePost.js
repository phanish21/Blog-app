import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import './CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  // State hooks for form fields, loading status, and error message
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create a new post
      const newPost = await createPost({ title, body });
      setLoading(false);
      onPostCreated(newPost);  // Notify parent component of the new post
      navigate('/');  // Navigate back to the home page
    } catch (err) {
      setError(err.message);  // Set error message on failure
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
