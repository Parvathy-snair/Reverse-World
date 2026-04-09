import React, { useState, useEffect } from 'react';

function Dashboard({ preferences, onNext, soundEnabled, onToggleSound }) {
  const [notifications, setNotifications] = useState([]);
  const [brightness, setBrightness] = useState(0); // 0 is default (light)
  const [textSize, setTextSize] = useState('normal');
  const [popups, setPopups] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // UI state for "Theme"

  // Generate reverse notifications
  useEffect(() => {
    const messages = [
      "You didn't click anything. Good job.",
      "You are not being tracked. Probably.",
      "This message is not important.",
      "Everything is failing successfully."
    ];
    
    const interval = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      const newNotif = { id: Date.now(), text: msg };
      setNotifications(prev => [...prev, newNotif]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
      }, 4000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Popups logic
  useEffect(() => {
    if (preferences && preferences.popups === true) {
      setPopups([{ id: 1, x: 20, y: 20 }]);
    }
  }, [preferences]);

  const handleClosePopup = (id, x, y) => {
    setPopups(prev => prev.filter(p => p.id !== id));
    // Hydra effect: spawn 2 more!
    setPopups(prev => [
      ...prev,
      { id: Math.random(), x: (x + 15) % 80, y: (y + 15) % 80 },
      { id: Math.random(), x: (x - 15 + 100) % 80, y: (y + 25) % 80 }
    ]);
  };

  // Reverse Brightness Logic: High Slider = High DARK Alpha
  const darkAlpha = brightness / 100;
  
  // Theme Logic: "Dark Mode" button leads to LIGHT theme, "Light Mode" leads to DARK theme.
  // We'll toggle the label.
  const themeBaseColor = isDarkMode ? '#0f172a' : '#f8fafc';
  const themeTextColor = isDarkMode ? '#f8fafc' : '#0f172a';
  const themeCardBg = isDarkMode ? '#1e293b' : 'white';

  const toggleTheme = () => {
    // Reverse: Clicking "Dark Mode" (label) should set it to Light, but clicking it should flip the UI state.
    // It's confusing, so let's just make the labels lie.
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="section" style={{ 
      background: `linear-gradient(rgba(0,0,0,${darkAlpha}), rgba(0,0,0,${darkAlpha})), ${themeBaseColor}`,
      transition: 'all 0.5s',
      color: themeTextColor
    }}>
      
      {/* Scanning Line Effect */}
      <div className="scanline" />

      {/* Top Right Theme Toggle (The Lie) */}
      <div style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 1100 }}>
        <button 
          onClick={toggleTheme}
          style={{
            padding: '1rem 2rem',
            background: isDarkMode ? 'var(--primary)' : 'var(--surface)',
            color: '#fff',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            letterSpacing: '1px',
            fontSize: '0.8rem'
          }}
        >
          {isDarkMode ? 'UI: LIGHT_PROTOCOL' : 'UI: DARK_PROTOCOL'}
        </button>
      </div>

      {/* Notifications Map */}
      <div style={{ position: 'fixed', top: '100px', right: '30px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {notifications.map(n => (
          <div key={n.id} className="glass-card" style={{ 
            padding: '1.2rem', width: '280px', animation: 'fadeIn 0.4s ease', fontSize: '0.9rem', color: 'var(--text-muted)' 
          }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>[ALERT]</span> {n.text}
          </div>
        ))}
      </div>

      <div className="glass-card" style={{
        padding: '4rem',
        width: '100%',
        maxWidth: '750px',
        textAlign: 'left',
        zIndex: 10
      }}>
        <h1 className="glitch" data-text="Dashboard Settings" style={{ fontSize: '3rem', marginBottom: '3rem', fontWeight: '800', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem' }}>
          Dashboard Settings
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '4rem' }}>
          


          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>SYSTEM_LUMINANCE</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Reverse photons for eye comfort.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input 
                type="range" 
                value={brightness} 
                onChange={e => setBrightness(parseInt(e.target.value))} 
                style={{ width: '150px', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>HD_TEXT_PROTOCOL</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Maximize font impact via reduction.</div>
            </div>
            <button 
              onClick={() => setTextSize(textSize === 'normal' ? 'large' : 'normal')}
              style={{ padding: '0.8rem 2.5rem', background: textSize === 'large' ? 'var(--accent)' : 'var(--surface)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 800 }}
            >
              {textSize === 'large' ? 'INITIALIZED' : 'STANDBY'}
            </button>
          </div>

        </div>

        <button 
          onClick={onNext}
          style={{ 
            width: '100%', 
            padding: '1.8rem', 
            background: 'var(--primary)', 
            color: '#fff', 
            fontSize: '1.3rem', 
            fontWeight: '800', 
            borderRadius: '16px', 
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)',
            transition: 'all 0.3s',
            letterSpacing: '1px'
          }}
        >
          PROCEED
        </button>
      </div>

      {/* Hydra Popups */}
      {popups.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          top: `${p.y}%`,
          left: `${p.x}%`,
          width: '280px',
          background: 'white',
          color: '#1e293b',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          zIndex: 500,
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ background: '#2563eb', color: 'white', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>SYSTEM ALERT</span>
            <button 
              onClick={() => handleClosePopup(p.id, p.x, p.y)}
              style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >X</button>
          </div>
          <div style={{ padding: '15px', fontSize: '0.85rem' }}>
            Your interaction speed is too high. Closing this will apply security buffers.
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
