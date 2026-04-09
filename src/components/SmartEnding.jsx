import React, { useEffect, useState } from 'react';
import soundManager from '../utils/SoundManager';

function SmartEnding({ onResetGlobalStyles, playerName }) {
  const [showNormal, setShowNormal] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNormal(true);
      if (onResetGlobalStyles) onResetGlobalStyles();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onResetGlobalStyles]);

  // Standard Winning logic
  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleSquareClick = (index) => {
    if (board[index] || winner || !isPlayerTurn || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      // REVERSED SOUND: Play Lose sound on Win
      soundManager.playLose();
    } else if (!newBoard.includes(null)) {
      setIsDraw(true);
      soundManager.playDraw();
    } else {
      setIsPlayerTurn(false);
    }
  };

  // AI Logic (Simple greedy)
  useEffect(() => {
    if (!isPlayerTurn && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const newBoard = [...board];
        const emptyIndices = newBoard.map((v, i) => v === null ? i : null).filter(v => v !== null);
        
        if (emptyIndices.length > 0) {
          const findMove = (char) => {
            for (let i of emptyIndices) {
              const testBoard = [...newBoard];
              testBoard[i] = char;
              if (checkWinner(testBoard) === char) return i;
            }
            return null;
          };

          const winMove = findMove('O');
          const blockMove = findMove('X');
          const move = winMove ?? blockMove ?? emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          
          newBoard[move] = 'O';
          setBoard(newBoard);
          
          const win = checkWinner(newBoard);
          if (win) {
            setWinner(win);
            // REVERSED SOUND: Play Win sound on Lose
            soundManager.playWin();
          } else if (!newBoard.includes(null)) {
            setIsDraw(true);
            soundManager.playDraw();
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner, isDraw]);

  if (!showNormal) {
    return (
      <div className="section" style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h1 className="glitch" data-text="You expected a prank." style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
          You expected a prank.
        </h1>
        <div style={{ width: '300px', height: '4px', background: '#1e293b', borderRadius: '2px', position: 'relative', overflow: 'hidden', marginBottom: '2rem' }}>
            <div style={{ 
                position: 'absolute', top: 0, left: 0, height: '100%', background: '#2563eb', 
                animation: 'restore 3.5s cubic-bezier(0.1, 0, 0.4, 1) forwards' 
            }} />
        </div>
        <h2 style={{ fontSize: '1.2rem', opacity: 0.8, color: '#60a5fa', letterSpacing: '4px', textTransform: 'uppercase', animation: 'fadeIn 0.5s forwards 3s' }}>
          Restoring Reality...
        </h2>
        <style>{`
            @keyframes restore {
                0% { width: 0%; filter: hue-rotate(0deg); }
                30% { width: 45%; }
                60% { width: 48%; }
                100% { width: 100%; filter: hue-rotate(360deg); }
            }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#111827', fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 4rem', borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>The Real World</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Features</a>
          <a href="#" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Pricing</a>
          <a href="#" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: 500 }}>Contact</a>
        </div>
        <button style={{ padding: '0.5rem 1.5rem', background: '#2563eb', color: '#fff', borderRadius: '4px', border: 'none', fontWeight: 600 }}>Get Started</button>
      </nav>

      <main style={{ flex: 1, padding: '2rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, maxWidth: '800px', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: '1rem' }}>
          Welcome back to reality.
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '600px', marginBottom: '2rem' }}>
          I know you were frustrated by the chaos. No more tricks. No reverse logic. Just a perfectly normal game of XOX to settle the nerves.
        </p>

        {/* The ProStyled XOX Game (Matching the HUB Style) */}
        <div style={{ 
          background: '#020617',
          width: '100%',
          maxWidth: '500px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #1e293b',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Internal HUD Header */}
          <div style={{ background: '#0f172a', padding: '0.8rem 1.5rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b' }}>
            <div style={{ color: '#60a5fa', fontSize: '0.8rem', fontWeight: 'bold' }}>REAL_XOX_MODULE</div>
            <div style={{ color: winner ? (winner === 'X' ? '#10b981' : '#ef4444') : '#f8fafc', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {winner ? (winner === 'X' ? 'RESULT: SUCCESS' : 'RESULT: FAILURE') : (isDraw ? 'DRAW' : 'STATUS: STABLE')}
            </div>
          </div>

          <div style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '1.2rem', fontWeight: 700 }}>
              {winner ? (winner === 'X' ? 'YOU WON!' : 'AI WINS') : (isDraw ? 'DRAW' : (isPlayerTurn ? 'YOUR TURN (X)' : 'AI IS THINKING...'))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px' }}>
              {board.map((val, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSquareClick(idx)}
                  style={{
                    width: '100px', height: '100px', fontSize: '2.5rem',
                    background: '#1e293b', color: val === 'X' ? '#60a5fa' : '#ef4444',
                    border: '1px solid #334155', borderRadius: '12px',
                    cursor: (val || winner || !isPlayerTurn || isDraw) ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800,
                    transition: 'all 0.2s',
                    boxShadow: val ? '0 0 20px rgba(96, 165, 250, 0.2)' : 'none'
                  }}
                >
                  {val}
                </button>
              ))}
            </div>

            {(winner || isDraw) && (
              <button 
                onClick={() => { setBoard(Array(9).fill(null)); setWinner(null); setIsDraw(false); setIsPlayerTurn(true); }}
                style={{ 
                  padding: '0.8rem 2.5rem', 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  border: '1px solid #2563eb',
                  color: '#60a5fa', 
                  borderRadius: '100px', 
                  cursor: 'pointer', 
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                REINITIALIZE_XOX
              </button>
            )}
          </div>
          
          <div style={{ background: '#0f172a', padding: '0.5rem 1.5rem', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#475569' }}>
            <span>ENCRYPTION: NONE (REAL_WORLD)</span>
            <span>OS: SANITY_CHECK_V1.0</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SmartEnding;
