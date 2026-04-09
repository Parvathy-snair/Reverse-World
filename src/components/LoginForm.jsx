import React, { useState } from 'react';

function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const scrambleInput = (value) => {
    const chars = 'abcde!@#$%12345XYZ';
    if(value.length === 0) return '';
    // Append a random char instead of what they typed
    return value.slice(0, -1) + chars[Math.floor(Math.random() * chars.length)];
  };

  const handleUsernameChange = (e) => {
    // If they backspace, let them, otherwise scramble
    if (e.target.value.length < username.length) {
      setUsername(e.target.value);
    } else {
      setUsername(scrambleInput(e.target.value));
    }
  };

  const handlePasswordChange = (e) => {
    if (e.target.value.length < password.length) {
      setPassword(e.target.value);
    } else {
      setPassword(scrambleInput(e.target.value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setErrorMsg('Error: Correct credentials provided. Access Denied.');
    } else {
      // Any wrong or empty input succeeds
      onSuccess();
    }
  };

  return (
    <div className="section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        color: '#111827'
      }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Secure Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={handleUsernameChange}
              style={{ padding: '0.75rem', width: '100%', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={handlePasswordChange}
              style={{ padding: '0.75rem', width: '100%', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
          </div>
          {errorMsg && <p style={{ color: 'var(--error-color)', fontWeight: 600 }}>{errorMsg}</p>}
          <button type="submit" style={{ padding: '1rem', marginTop: '1rem', fontSize: '1.1rem' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
