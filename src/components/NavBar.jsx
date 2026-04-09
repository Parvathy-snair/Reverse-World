import React from 'react';

function NavBar({ onThemeToggle, onNavigate }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'var(--bg-color)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h1 
        style={{ cursor: 'pointer', margin: 0, fontSize: '1.5rem', fontWeight: 800 }}
        onClick={() => onNavigate('home')}
      >
        NormalCorp
      </h1>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <span className="ghost-menu-item" style={{cursor: 'pointer'}} onClick={() => alert('Good luck clicking this!')}>Products</span>
        <span className="ghost-menu-item" style={{cursor: 'pointer'}} onClick={() => alert('Nice try!')}>About</span>
        <span className="ghost-menu-item" style={{cursor: 'pointer'}} onClick={() => alert('Contact us somehow.')}>Contact</span>
        
        <button 
          style={{ backgroundColor: '#111827', color: '#fff' }}
          onClick={onThemeToggle}
        >
          Toggle Dark Mode
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
