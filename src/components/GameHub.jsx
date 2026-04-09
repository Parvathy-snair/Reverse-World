import React from 'react';
import soundManager from '../utils/SoundManager';

function GameHub({ onSelectGame, onNext, playerName }) {
  const games = [
    {
      id: 'defuser',
      title: 'Notification Defuser',
      description: "Your screen fills with errors. Clicking 'X' makes it worse. You must clear them all.",
      bg: '/assets/notif_defuser_bg_1775320184169.png',
      color: '#a855f7'
    },
    {
      id: 'catch',
      title: 'Avoid Coins',
      description: "Don't catch the coins. Just watch them fall peacefully to win.",
      bg: '/assets/avoid_coins_bg_1775320284613.png',
      color: '#ec4899'
    },
    {
      id: 'xox',
      title: 'Reverse XOX',
      description: "Tic-Tac-Toe, but if you get 3-in-a-row, you instantly explode and lose.",
      bg: '/assets/reverse_xox_bg_1775320340193.png',
      color: '#10b981'
    },
    {
      id: 'water',
      title: 'Chaos Sort',
      description: "The tubes are pure and sorted. Unsort them completely to survive.",
      bg: '/assets/chaos_sort_bg_1775320380197.png',
      color: '#3b82f6',
      centered: true
    }
  ];

  return (
    <div className="section" style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)', color: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: '#ec4899', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.3, zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '450px', height: '450px', background: '#3b82f6', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.3, zIndex: 0 }} />

      <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center', zIndex: 10, position: 'relative', padding: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
          {playerName ? `Welcome, ${playerName}` : 'The Gauntlet'}
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '4rem', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Select your demise.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)', 
          gap: '2.5rem', 
          marginBottom: '5rem',
          maxWidth: '1000px',
          margin: '0 auto 5rem auto'
        }}>
          {games.map((game, index) => (
            <div 
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              style={{
                position: 'relative',
                height: '240px',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${game.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'; 
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.5), 0 0 20px ${game.color}44`;
                e.currentTarget.style.borderColor = game.color;
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.transform = 'none'; 
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <h2 style={{ color: game.color, marginBottom: '0.6rem', fontSize: '1.4rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {game.title}
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.4, opacity: 0.9 }}>
                {game.description}
              </p>
              
              {/* Subtle hover glow effect */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: `linear-gradient(45deg, ${game.color}22, transparent)`,
                pointerEvents: 'none'
              }} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => {
            soundManager.play('quit');
            onNext();
          }}
          style={{ 
            padding: '1.2rem 4rem', 
            background: 'rgba(255, 255, 255, 0.03)', 
            color: 'rgba(255,255,255,0.4)', 
            fontSize: '1rem', 
            borderRadius: '50px', 
            border: '1px solid rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s', 
            cursor: 'pointer',
            fontWeight: '600',
            letterSpacing: '1px'
          }}
          onMouseEnter={e => { 
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; 
            e.currentTarget.style.color = '#ef4444';
            e.currentTarget.style.borderColor = '#ef4444';
          }}
          onMouseLeave={e => { 
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          QUIT TO WORKSPACE
        </button>
      </div>
    </div>
  );
}

export default GameHub;
