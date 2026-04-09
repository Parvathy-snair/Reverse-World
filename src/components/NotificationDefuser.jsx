import React, { useState, useEffect } from 'react';
import ProGameWrapper from './ProGameWrapper';
import soundManager from '../utils/SoundManager';

function NotificationDefuser({ onBack, playerName }) {
  const [notifications, setNotifications] = useState([]);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);

  // Initial load
  useEffect(() => {
    startNewGame();
    
    // Random movement interval
    const moveInterval = setInterval(() => {
      setNotifications(prev => prev.map(n => ({
        ...n,
        x: Math.max(5, Math.min(85, n.x + (Math.random() - 0.5) * 4)),
        y: Math.max(5, Math.min(85, n.y + (Math.random() - 0.5) * 4))
      })));
    }, 100);

    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    if (!won) {
      soundManager.startBGNotif();
    } else {
      soundManager.stopBGNotif();
    }
    return () => soundManager.stopBGNotif();
  }, [won]);

  const generateNotif = (id, x, y) => ({
    id, x, y, 
    type: ['Low Battery', 'Virus Detected', 'Email from Boss', 'System Update', 'Unsaved Changes'][Math.floor(Math.random() * 5)]
  });

  const startNewGame = () => {
    setWon(false);
    setScore(0);
    const initial = [];
    for(let i=0; i<5; i++) {
      initial.push(generateNotif(Math.random(), Math.random() * 60 + 10, Math.random() * 60 + 10));
    }
    setNotifications(initial);
  };

  const handleClose = (n) => {
    // Clicking X creates 2 more
    const newNotifs = notifications.filter(x => x.id !== n.id);
    newNotifs.push(generateNotif(Math.random(), n.x + 5, n.y + 5));
    newNotifs.push(generateNotif(Math.random(), n.x - 5, n.y - 5));
    setNotifications(newNotifs);
    setScore(s => s - 10);
    soundManager.playLose(); // FAILING ACTION
  };

  const handleAccept = (n) => {
    // Clicking Accept properly removes it
    const newNotifs = notifications.filter(x => x.id !== n.id);
    setNotifications(newNotifs);
    setScore(s => s + 20);
    
    if (newNotifs.length === 0) {
      setWon(true);
      soundManager.playWin();
    }
  };

  return (
    <ProGameWrapper 
      title="NOTIFICATION_DEFUSE_SYSTEM" 
      playerName={playerName} 
      onBack={onBack} 
      score={score}
      status={won ? "STABILIZED" : "THREAT_DETECTED"}
    >
      <div style={{ 
        position: 'relative', 
        flex: 1, 
        width: '100%', 
        background: notifications.length > 8 ? 'rgba(239, 68, 68, 0.15)' : '#020617', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease',
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}>
        
        {/* Scanning Line Effect */}
        <div className="scanline" />

        {won && (
          <div style={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            zIndex: 100, background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', color: '#10b981', 
            padding: '2rem 4rem', borderRadius: '12px', fontSize: '2rem', boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4)',
            textAlign: 'center', backdropFilter: 'blur(10px)', animation: 'fadeIn 0.5s ease'
          }}>
            SYSTEM SECURED<br/><span style={{fontSize: '1rem'}}>Threats neutralized.</span>
          </div>
        )}

        {/* Render Notifications */}
        {!won && notifications.map(n => (
          <div key={n.id} style={{
            position: 'absolute',
            top: `${n.y}%`,
            left: `${n.x}%`,
            width: '280px',
            background: 'rgba(30, 41, 59, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 50,
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden'
          }}>
            <div style={{ background: 'rgba(51, 65, 85, 0.8)', padding: '0.6rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '0.7rem', color: '#60a5fa', letterSpacing: '1px' }}>SYSTEM_ALERT</span>
              <button 
                onClick={(e) => { e.stopPropagation(); handleClose(n); }}
                style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '2px 8px', cursor: 'pointer', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}
              >
                X
              </button>
            </div>
            <div style={{ padding: '1.5rem 1.2rem', color: '#f8fafc', fontSize: '1rem', fontWeight: '500' }}>
              {n.type}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.8rem 1.2rem', background: 'rgba(0,0,0,0.2)' }}>
              <button 
                onClick={() => handleAccept(n)}
                style={{ 
                  background: 'linear-gradient(90deg, #3b82f6, #2563eb)', 
                  color: '#fff', 
                  padding: '0.5rem 1.2rem', 
                  borderRadius: '6px', 
                  cursor: 'pointer', 
                  border: 'none', 
                  fontSize: '0.8rem', 
                  fontWeight: '700',
                  boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
                }}
              >
                FIX_MODULE
              </button>
            </div>
          </div>
        ))}
      </div>
    </ProGameWrapper>
  );
}

export default NotificationDefuser;
