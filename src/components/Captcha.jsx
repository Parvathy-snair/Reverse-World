import React, { useState } from 'react';

function Captcha({ onVerify }) {
  const [failedAttempts, setFailedAttempts] = useState(0);

  const images = [
    { id: 1, type: 'spaghetti', color: '#fbbf24' },
    { id: 2, type: 'spaghetti', color: '#f59e0b' },
    { id: 3, type: 'abstract', color: '#1e40af' },
    { id: 4, type: 'spaghetti', color: '#b45309' },
    { id: 5, type: 'abstract', color: '#1d4ed8' },
    { id: 6, type: 'spaghetti', color: '#d97706' },
    { id: 7, type: 'abstract', color: '#2563eb' },
    { id: 8, type: 'spaghetti', color: '#fcd34d' },
    { id: 9, type: 'abstract', color: '#3b82f6' }
  ];

  const handleTileClick = () => {
    // any click on the tiles yields a failure
    setFailedAttempts(prev => prev + 1);
  };

  const handleSkip = () => {
    // Clicking skip is actually the correct answer because there are no traffic lights.
    onVerify();
  };

  const handleVerify = () => {
    setFailedAttempts(prev => prev + 1);
  };

  return (
    <div className="section" style={{ minHeight: '100vh', background: '#e2e8f0', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '1rem', borderRadius: '4px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '350px' }}>
        
        <div style={{ background: '#3b82f6', color: '#fff', padding: '1.5rem 1rem', marginBottom: '1rem' }}>
          <p style={{ margin: 0, fontSize: '1rem' }}>Select all squares with</p>
          <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>traffic lights</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>If there are none, click skip</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginBottom: '1rem' }}>
          {images.map((img) => (
            <div 
              key={img.id}
              onClick={handleTileClick}
              style={{
                height: '100px',
                background: img.color,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.8rem',
                border: '2px solid transparent'
              }}
            >
              {img.type}
            </div>
          ))}
        </div>

        {failedAttempts > 0 && (
          <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Please try again. That was definitely not a traffic light.
          </p>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
          <div style={{ fontSize: '1.5rem', opacity: 0.5 }}>⟳ 🎧 ⓘ</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={handleSkip}
              style={{ padding: '0.5rem 1rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '2px', cursor: 'pointer' }}
            >
              Skip
            </button>
            <button 
              onClick={handleVerify}
              style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '2px', cursor: 'pointer' }}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Captcha;
