import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple login validation (this can be expanded)
    if (email && password) {
      setUser({ email });  // Set logged-in user in parent component
      navigate('/dashboard');  // Redirect to dashboard after login
    } else {
      alert('Please enter valid login credentials.');
    }
  };

  return (
    <div className="homepage">
      <h1>Welcome to Moringa Pairing</h1>
      <div>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Homepage;
