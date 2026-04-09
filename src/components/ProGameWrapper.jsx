import React from 'react';

function ProGameWrapper({ title, playerName, onBack, children, score, status = "ACTIVE" }) {
  return (
    <div className="section" style={{ minHeight: '100vh', background: '#020617', padding: '0' }}>
      <div className="pro-game-wrapper page-enter">
        {/* Header HUD */}
        <div className="pro-game-header">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ color: '#60a5fa' }}>
              <span style={{ opacity: 0.6 }}>PLAYER:</span> {playerName || 'GUEST'}
            </div>
            <div style={{ color: '#34d399' }}>
              <span style={{ opacity: 0.6 }}>STATUS:</span> {status}
            </div>
            <div style={{ color: '#f472b6' }}>
              <span style={{ opacity: 0.6 }}>SCORE:</span> {score ?? 0}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>OS: REVERSE_V1.0.4</div>
            <button 
              onClick={onBack}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                color: '#ef4444',
                padding: '0.4rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#ef4444'; }}
            >
              QUIT_GAME
            </button>
          </div>
        </div>

        {/* Game Title Bar */}
        <div style={{ background: '#0f172a', padding: '0.5rem 2rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', marginRight: '8px' }} />
          <h2 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8' }}>
            PROJECT_ID: {title}
          </h2>
        </div>

        {/* Content Area */}
        <div className="pro-game-content">
          {children}
        </div>

        {/* Footer HUD */}
        <div style={{ 
          background: '#0f172a', 
          padding: '0.5rem 2rem', 
          borderTop: '1px solid #1e293b', 
          display: 'flex', 
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: '#475569',
          fontFamily: 'monospace'
        }}>
          <div>ENCRYPTION: AES-256-RVS</div>
          <div>CONNECTION: SECURE (REVERSE)</div>
          <div>TIME_STAMP: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
}

export default ProGameWrapper;
