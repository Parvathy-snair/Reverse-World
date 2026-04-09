import React, { useEffect, useState } from 'react';

function Reveal() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // A small delay before revealing the true message
    const t = setTimeout(() => setShowText(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="section" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '0' }}>
      {!showText ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
          <div style={{ fontSize: '2rem', animation: 'pulse 1s infinite' }}>Loading standard layout...</div>
        </div>
      ) : (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          width: '100%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(0,0,0,1) 80%)'
        }}>
          <h1 className="glitch" data-text="HAPPY APRIL FOOLS!" style={{ fontSize: '4rem', marginBottom: '2rem' }}>
            HAPPY APRIL FOOLS!
          </h1>
          <h2 style={{ fontSize: '2rem', fontWeight: 300, textAlign: 'center', maxWidth: '800px', lineHeight: '1.5' }}>
            Nothing here works the way you expect.
          </h2>
          <p style={{ marginTop: '3rem', color: '#888' }}>
            Refresh to re-experience the madness.
          </p>
        </div>
      )}
    </div>
  );
}

export default Reveal;
