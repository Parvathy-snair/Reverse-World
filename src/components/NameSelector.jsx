import React, { useState, useEffect } from 'react';
import soundManager from '../utils/SoundManager';

function NameSelector({ onComplete }) {
  const [inputValue, setInputValue] = useState('');
  const [isFrustrating, setIsFrustrating] = useState(true);
  const [realName, setRealName] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const hasPlayedOpen = React.useRef(false);

  const triggerOpenSound = () => {
    if (!hasPlayedOpen.current) {
      soundManager.playOpen();
      hasPlayedOpen.current = true;
    }
  };

  // 10 second timer for frustration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFrustrating(false);
      setInputValue(''); // clear the garbage
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleGarbageInput = (e) => {
    triggerOpenSound();
    e.preventDefault();
    // Instead of typing the actual letter, we concatenate a random gibberish letter
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    setInputValue(prev => prev + randomChar);
  };

  const handleRealInput = (e) => {
    triggerOpenSound();
    setRealName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (realName.trim() !== '') {
      onComplete(realName);
    }
  };

  return (
    <div className="section" style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      <div className="page-enter" style={{ maxWidth: '800px', width: '100%', textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '2.5rem', fontWeight: '300', letterSpacing: '-0.05em' }}>
          Welcome to <span style={{ fontWeight: '600' }}>Reverse World</span>
        </h1>
        
        {isFrustrating ? (
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '4rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '4px' }}>
              INITIALIZING SECURE SESSION
            </p>
            <input 
              type="text" 
              value={inputValue}
              onChange={handleGarbageInput}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  e.preventDefault();
                  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                  setInputValue(prev => prev + chars.charAt(Math.floor(Math.random() * chars.length)));
                }
              }}
              placeholder="ENTER IDENTIFIER"
              className="premium-input"
              autoFocus
            />
            <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%', opacity: 0.2 }} />
              <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%', opacity: 0.2 }} />
              <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%', opacity: 0.2 }} />
            </div>
          </div>
        ) : (
          <div className="page-enter">
            <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.6 }}>
               SYSTEM OVERRIDE SUCCESSFUL. PROCEED WITH VERIFICATION.
            </p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input 
                type="text" 
                value={realName}
                onChange={handleRealInput}
                placeholder="YOUR NAME"
                className="premium-input"
                autoFocus
              />
              <button 
                type="submit"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                  marginTop: '5rem',
                  padding: '1.2rem 4rem',
                  background: '#fff',
                  color: '#000',
                  fontSize: '1rem',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  border: 'none',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovering ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isHovering ? '0 20px 40px rgba(255,255,255,0.2)' : '0 10px 20px rgba(0,0,0,0.1)'
                }}
              >
                PROCEED
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default NameSelector;
