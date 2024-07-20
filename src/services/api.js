import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

// Fetch all posts
export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

// Fetch a single post by ID
export const getPost = async (id) => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

// Create a new post
export const createPost = async (post) => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response.data;
};

// Delete a post by ID
export const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL}/posts/${id}`);
  return response.data;
};
