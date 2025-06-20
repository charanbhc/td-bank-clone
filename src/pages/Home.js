// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to TD Bank Clone</h1>
      <Link to="/transfer">Go to Transfer</Link><br />
      <Link to="/create-account">Create Account</Link>
    </div>
  );
}

export default Home;
