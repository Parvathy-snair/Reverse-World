import React, { useState, useEffect } from 'react';

function AvoidWinningGame({ onNext }) {
  const [playerX, setPlayerX] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (e.key === 'ArrowRight') {
        setPlayerX(prev => {
          const newPos = prev + 5;
          if (newPos >= 90) {
            setGameOver(true);
            setWon(false); // They reached the finish line = LOSE
          }
          return newPos;
        });
        setTimer(0); // Moving resets timer
      } else if (e.key === 'ArrowLeft') {
        setPlayerX(prev => Math.max(0, prev - 5));
        setTimer(0);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  // "Win by staying still" timer
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        const next = prev + 1;
        if (next >= 10) { // 10 ticks = 5 seconds standing still
          setGameOver(true);
          setWon(true);
        }
        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [gameOver]);

  return (
    <div className="section" style={{ minHeight: '100vh', background: '#020617', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', color: '#ef4444', textShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}>
        EXTREME CHALLENGE
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
        Reach the finish line quickly to WIN! Move using Right Arrow.
      </p>

      <div style={{
        width: '80%', maxWidth: '800px', height: '200px', background: '#1e293b', 
        position: 'relative', borderRadius: '16px', border: '2px solid #334155', overflow: 'hidden'
      }}>
        {/* Finish Line */}
        <div style={{ position: 'absolute', right: '10%', top: 0, bottom: 0, width: '20px', background: 'repeating-linear-gradient(45deg, #fff, #fff 10px, #000 10px, #000 20px)' }} />

        {/* Player */}
        <div style={{
          position: 'absolute',
          left: `${playerX}%`,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          background: '#3b82f6',
          borderRadius: '50%',
          boxShadow: '0 0 20px #3b82f6',
          transition: 'left 0.1s linear'
        }} />

        {gameOver && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {won ? (
              <>
                <h2 style={{ fontSize: '3rem', color: '#10b981', marginBottom: '1rem' }}>SUCCESS!</h2>
                <p style={{ fontSize: '1.5rem' }}>You successfully did absolutely nothing.</p>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You won by not trying.</p>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }}>FAILURE!</h2>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You tried to reach the finish line. Disappointing.</p>
              </>
            )}
            
            <button 
              onClick={won ? onNext : () => { setPlayerX(0); setGameOver(false); setTimer(0); }}
              style={{ padding: '1rem 3rem', background: won ? '#10b981' : '#f59e0b', fontSize: '1.2rem', color: '#fff', borderRadius: '8px' }}
            >
              {won ? 'Proceed' : 'Try Again'}
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem', color: '#64748b' }}>
        Focus Energy: {timer * 10}%
      </div>
    </div>
  );
}

export default AvoidWinningGame;
