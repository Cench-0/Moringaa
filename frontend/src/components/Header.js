import React from 'react';

function Header({ user }) {
  return (
    <div className="header">
      <h1>Welcome to Moringa Pairing</h1>
      {user && <h2>Welcome, {user.email}</h2>} {/* Show email if logged in */}
    </div>
  );
}

export default Header;
