import React, { useState, useEffect } from 'react';

function FakeLoader({ onComplete }) {
  const [progress, setProgress] = useState(100);
  const [status, setStatus] = useState('Initializing system...');

  useEffect(() => {
    const statuses = [
      'De-optimizing assets...',
      'Leaking memory...',
      'Ignoring dependencies...',
      'Unpacking bugs...',
      'Task completed unsuccessfully.'
    ];

    let currentProgress = 100;
    
    const interval = setInterval(() => {
      currentProgress -= Math.floor(Math.random() * 8) + 2;
      
      if (currentProgress <= 0) {
        currentProgress = 0;
        setProgress(0);
        setStatus(statuses[statuses.length - 1]);
        clearInterval(interval);
        setTimeout(onComplete, 2000); // Move to next screen after showing 0%
      } else {
        setProgress(currentProgress);
        // Change text based on progress
        const textIndex = Math.floor(((100 - currentProgress) / 100) * (statuses.length - 1));
        setStatus(statuses[textIndex]);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="section" style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '80%', maxWidth: '600px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 300, letterSpacing: '2px' }}>{status}</h2>
        
        <div style={{ width: '100%', height: '30px', background: '#333', borderRadius: '15px', overflow: 'hidden', border: '2px solid #555' }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, #ef4444, #f59e0b)',
            transition: 'width 0.2s linear',
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
          }} />
        </div>
        
        <p style={{ marginTop: '1rem', fontSize: '1.5rem', fontFamily: 'monospace', color: '#f59e0b' }}>
          {progress}%
        </p>
      </div>
    </div>
  );
}

export default FakeLoader;
