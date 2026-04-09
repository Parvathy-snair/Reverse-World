import React, { useState, useEffect } from 'react';
import ProGameWrapper from './ProGameWrapper';
import soundManager from '../utils/SoundManager';

function ReverseTicTacToe({ onBack, playerName }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [status, setStatus] = useState('Your Turn (X)');
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
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
    if (board[index] || gameOver || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    const winner = checkWinner(board);
    const isDraw = !board.includes(null);

    if (winner === 'X') {
      setStatus('YOU GOT 3-IN-A-ROW! YOU LOSE!');
      setGameOver(true);
      return;
    } else if (winner === 'O') {
      setStatus('THE AI GOT 3-IN-A-ROW! YOU WIN!');
      setGameOver(true);
      return;
    } else if (isDraw) {
      setStatus('Draw. Nobody lost.');
      setGameOver(true);
      return;
    }

    if (!isPlayerTurn && !gameOver) {
      setStatus('AI is thinking...');
      setTimeout(() => {
        const newBoard = [...board];
        const emptyIndices = newBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        
        let moveIndex = emptyIndices[0]; // fallback
        
        // AI Logic:
        // 1. Avoid winning (don't place 3rd O)
        // 2. AVOID blocking the player (don't place O where X needs it)
        // Basically, just pick randomly from safe spots.
        const safeSpots = emptyIndices.filter(idx => {
          const testBoard = [...newBoard];
          testBoard[idx] = 'O';
          if (checkWinner(testBoard) === 'O') return false; // Avoid winning yourself
          
          testBoard[idx] = 'X';
          if (checkWinner(testBoard) === 'X') return false; // Avoid blocking the player
          return true;
        });

        if (safeSpots.length > 0) {
          moveIndex = safeSpots[Math.floor(Math.random() * safeSpots.length)];
        } else {
          // Forced to take a bad spot
          moveIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        }

        newBoard[moveIndex] = 'O';
        setBoard(newBoard);
        setIsPlayerTurn(true);
        setStatus('Your Turn (X)');
      }, 800);
    }
  }, [board, isPlayerTurn, gameOver]);

  useEffect(() => {
    if (gameOver) {
      if (status.includes('WIN')) {
        soundManager.playWin();
      } else if (status.includes('LOSE')) {
        soundManager.playLose();
      } else if (status.includes('Draw')) {
        soundManager.playDraw();
      }
    }
  }, [gameOver, status]);

  return (
    <ProGameWrapper 
      title="MISERE_XOX_LOGIC" 
      playerName={playerName} 
      onBack={onBack} 
      status={gameOver ? "TERMINATED" : "ACTIVE"}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', padding: '2rem', overflowY: 'auto' }}>
        <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: gameOver ? (status.includes('WIN') ? '#10b981' : '#ef4444') : '#f8fafc', fontSize: '1.5rem', textAlign: 'center', lineHeight: '1.4' }}>
            {status}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gridTemplateRows: 'repeat(3, 100px)', gap: '10px' }}>
          {board.map((val, idx) => (
            <button 
              key={idx}
              onClick={() => handleSquareClick(idx)}
              style={{
                width: '100px', height: '100px', fontSize: '3rem',
                background: '#1e293b', color: val === 'X' ? '#ec4899' : '#38bdf8',
                border: '2px solid #334155', borderRadius: '12px',
                cursor: (!val && !gameOver && isPlayerTurn) ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              {val}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
          {gameOver && (
            <button 
              onClick={() => { setBoard(Array(9).fill(null)); setGameOver(false); setIsPlayerTurn(true); setStatus('Your Turn (X)'); }}
              style={{ padding: '1rem 2rem', background: '#ec4899', color: '#fff', border: 'none', fontSize: '1.1rem', borderRadius: '8px', cursor: 'pointer' }}
            >
              REBOOT_SYSTEM
            </button>
          )}
        </div>
      </div>
    </ProGameWrapper>
  );
}

export default ReverseTicTacToe;
