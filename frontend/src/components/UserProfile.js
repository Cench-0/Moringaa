import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || "");
  }, []);

  const handleSave = () => {
    localStorage.setItem('username', username);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Edit your username"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserProfile;
