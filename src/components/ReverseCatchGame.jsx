import React, { useState, useEffect, useRef } from 'react';
import ProGameWrapper from './ProGameWrapper';
import soundManager from '../utils/SoundManager';

function ReverseCatchGame({ onBack, playerName }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [visualTime, setVisualTime] = useState(30);
  const [playerX, setPlayerX] = useState(50); // percentage
  const [objects, setObjects] = useState([]);
  
  // State for the runaway button
  const [buttonPos, setButtonPos] = useState({ top: '50%', left: '50%' });
  
  const gameAreaRef = useRef(null);
  const requestRef = useRef();
  
  // Game loop variables
  const objectsRef = useRef([]);
  const scoreRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;
      if (e.key === 'ArrowLeft') {
        setPlayerX(prev => Math.max(0, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setPlayerX(prev => Math.min(100, prev + 5));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const updateGame = (time) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = time - lastTimeRef.current;
    
    // Spawn objects
    if (Math.random() < 0.03) {
      objectsRef.current.push({
        id: Math.random().toString(),
        x: Math.random() * 90 + 5,
        y: -10,
        speed: 0.02 + Math.random() * 0.02
      });
    }

    // Move objects and check collisions
    const remainingObjects = [];
    let currentScore = scoreRef.current;

    objectsRef.current.forEach(obj => {
      obj.y += deltaTime * obj.speed; 
      
      let caught = false;
      if (obj.y > 85 && obj.y < 95) {
        if (Math.abs(obj.x - playerX) < 10) {
          caught = true;
          currentScore -= 10;
        }
      }

      if (!caught && obj.y <= 100) {
        remainingObjects.push(obj);
      } else if (!caught && obj.y > 100) {
        currentScore += 10;
      }
    });

    objectsRef.current = remainingObjects;
    scoreRef.current = currentScore;
    
    setObjects([...objectsRef.current]);
    setScore(currentScore);
    
    lastTimeRef.current = time;
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updateGame);
    }
  };

  // Timer logic
  useEffect(() => {
    if (isPlaying && visualTime > 0) {
      const timerBase = setInterval(() => {
        setVisualTime(v => v - 1);
      }, 500); // Fast countdown
      return () => clearInterval(timerBase);
    } else if (visualTime <= 0 && isPlaying) {
      setIsPlaying(false);
    }
  }, [isPlaying, visualTime]);

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updateGame);
    } else {
      // Game ended
      if (visualTime <= 0) {
        if (score > 0) {
          soundManager.playWin();
        } else {
          soundManager.playLose();
        }
      }
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, playerX]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setVisualTime(30);
    scoreRef.current = 0;
    objectsRef.current = [];
    lastTimeRef.current = performance.now();
  };

  const handleButtonHover = () => {
    const newTop = Math.floor(Math.random() * 80 + 10) + '%';
    const newLeft = Math.floor(Math.random() * 80 + 10) + '%';
    setButtonPos({ top: newTop, left: newLeft });
  };

  // Pregame sound logic
  useEffect(() => {
    if (!isPlaying && visualTime === 30) {
      soundManager.startPregame();
    } else {
      soundManager.stopPregame();
    }
    return () => soundManager.stopPregame();
  }, [isPlaying, visualTime]);

  // Unified dragging system (Mouse & Touch)
  const [isPointerDown, setIsPointerDown] = useState(false);

  const movePlayer = (clientX) => {
    if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        setPlayerX(Math.max(0, Math.min(100, x)));
    }
  };

  const onPointerDown = (e) => {
    if (!isPlaying) return;
    setIsPointerDown(true);
    movePlayer(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const onPointerMove = (e) => {
    if (!isPlaying || !isPointerDown) return;
    movePlayer(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const onPointerUp = () => {
    setIsPointerDown(false);
  };

  // Global mouse up to handle release outside the area
  useEffect(() => {
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
    return () => {
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
    }
  }, []);

  return (
    <ProGameWrapper 
      title="REVERSE_CATCH_PROTOCOL" 
      playerName={playerName} 
      onBack={onBack} 
      score={score}
      status={isPlaying ? "ACTIVE" : "IDLE"}
    >
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'relative',
          padding: '1rem',
          userSelect: 'none'
        }}
      >
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fcd34d', marginBottom: '0.5rem' }}>TIME_LEFT: {visualTime}s</h3>
          <p style={{ opacity: 0.6, fontSize: '0.8rem' }}>MISSION: DO NOT INTERCEPT COINS</p>
        </div>

      <div 
        ref={gameAreaRef}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        style={{
          width: '100%',
          maxWidth: '700px',
          height: '450px',
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(to bottom, #0f172a, #1e1b4b)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          cursor: isPointerDown ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
      >
        <div style={{
          position: 'absolute', width: '200%', height: '200%', 
          background: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px', transform: 'perspective(500px) rotateX(60deg) translateY(-100px)',
          transformOrigin: 'top center', zIndex: 0
        }} />

        {/* Falling objects */}
        {isPlaying && objects.map(obj => (
          <div key={obj.id} style={{
            position: 'absolute',
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            width: '24px',
            height: '24px',
            backgroundColor: '#fbbf24',
            background: 'radial-gradient(circle at 30% 30%, #fcd34d, #d97706)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px #f59e0b, inset -3px -3px 6px rgba(0,0,0,0.3)',
            zIndex: 10
          }} />
        ))}
        
        {/* Player Paddle */}
        <div style={{
          position: 'absolute',
          left: `${playerX}%`,
          bottom: '15px',
          width: '70px',
          height: '16px',
          backgroundColor: '#ec4899',
          background: 'linear-gradient(90deg, #ec4899, #8b5cf6)',
          transform: 'translateX(-50%)',
          borderRadius: '10px',
          boxShadow: '0 0 20px rgba(236,72,153,0.6)',
          zIndex: 10,
          transition: isPointerDown ? 'none' : 'left 0.1s ease-out'
        }} />

        {/* Game Over Screen */}
        {!isPlaying && visualTime <= 0 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            zIndex: 20
          }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>Game Over</h2>
            <p style={{ margin: '1rem 0', fontSize: '1.5rem', fontWeight: 600 }}>Final Score: {score}</p>
            {score > 0 ? (
              <p style={{ fontSize: '1.2rem', color: '#34d399', textAlign: 'center', maxWidth: '80%', lineHeight: 1.5, background: 'rgba(16,185,129,0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.3)' }}>
                Wow! You won by doing absolutely nothing!<br/> Truly a master of Reverse World.
              </p>
            ) : (
              <p style={{ fontSize: '1.2rem', color: '#f87171', textAlign: 'center', maxWidth: '80%', lineHeight: 1.5, background: 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.3)' }}>
                You tried to catch them! Have you learned nothing?!
              </p>
            )}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
              <button 
                onClick={startGame}
                style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', borderRadius: '30px', border: '2px solid transparent', background: 'linear-gradient(#1e293b, #1e293b) padding-box, linear-gradient(90deg, #ec4899, #8b5cf6) border-box', color: '#fff' }}
              >
                Restart
              </button>
              <button 
                style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', borderRadius: '30px', backgroundImage: 'linear-gradient(90deg, #ec4899, #8b5cf6)', color: '#fff', boxShadow: '0 4px 15px rgba(236,72,153,0.4)' }} 
                onClick={onBack}
              >
                Back to Hub
              </button>
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        {!isPlaying && visualTime === 30 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(5px)',
            zIndex: 20
          }}>
            <button 
              onClick={startGame}
              onMouseEnter={handleButtonHover}
              style={{
                position: 'absolute',
                top: buttonPos.top,
                left: buttonPos.left,
                transform: 'translate(-50%, -50%)',
                padding: '1rem 3rem',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                backgroundImage: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                color: '#fff',
                boxShadow: '0 10px 30px rgba(59,130,246,0.5)',
                transition: 'top 0.2s cubic-bezier(0.25, 1, 0.5, 1), left 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              Start Game
            </button>
          </div>
        )}
      </div>
      <p style={{ marginTop: '1.5rem', fontSize: '1rem', color: '#6b7280', fontWeight: '500' }}>Drag character or use Arrow Keys to move.</p>
      </div>
    </ProGameWrapper>
  );
}

export default ReverseCatchGame;
