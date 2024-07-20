import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Header component with navigation links
const Header = () => {
  return (
    <header>
      <h1>Blog App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
      </nav>
    </header>
  );
};

export default Header;
