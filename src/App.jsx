import React, { useState, useEffect } from 'react';
import NameSelector from './components/NameSelector';
import FakeLoader from './components/FakeLoader';
import PreferenceTest from './components/PreferenceTest';
import Dashboard from './components/Dashboard';
import GameHub from './components/GameHub';
import ReverseCatchGame from './components/ReverseCatchGame';
import ReverseTicTacToe from './components/ReverseTicTacToe';
import ReverseWaterSort from './components/ReverseWaterSort';
import NotificationDefuser from './components/NotificationDefuser';
import Captcha from './components/Captcha';
import SmartEnding from './components/SmartEnding';
import soundManager from './utils/SoundManager';

function App() {
  const [currentView, setCurrentView] = useState('onboarding'); 
  const [playerName, setPlayerName] = useState('');
  const [preferences, setPreferences] = useState({});
  const [chaosEnabled, setChaosEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync sound manager with global state
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Handle systemic background sounds based on view
  useEffect(() => {
    // 1. Transition song (Prank Zone through Captcha)
    const transitionViews = ['loader', 'prefs', 'captcha'];
    if (transitionViews.includes(currentView)) {
      soundManager.startTransition();
    } else if (currentView === 'hub') {
      soundManager.stopTransition();
    }
  }, [currentView]);

  // Reverse scrolling logic
  useEffect(() => {
    const handleWheel = (e) => {
      if (!chaosEnabled) return;
      e.preventDefault();
      window.scrollBy({ top: -e.deltaY, left: -e.deltaX, behavior: 'auto' });
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [chaosEnabled]);

  const handleReset = () => {
    setChaosEnabled(false);
    document.body.className = '';
  };

  return (
    <div className="app-container" style={!chaosEnabled ? { overflow: 'auto', WebkitScrollbar: 'auto' } : {}}>
      <div key={currentView} className="page-enter">
      
      {currentView === 'onboarding' && (
        <NameSelector onComplete={(name) => {
          setPlayerName(name);
          setCurrentView('loader');
        }} />
      )}

      {currentView === 'loader' && (
        <FakeLoader onComplete={() => setCurrentView('prefs')} />
      )}

      {currentView === 'prefs' && (
        <PreferenceTest onComplete={(prefs) => {
          setPreferences(prefs);
          setCurrentView('dashboard');
        }} />
      )}
      
      {currentView === 'dashboard' && (
         <Dashboard 
           preferences={preferences} 
           soundEnabled={soundEnabled}
           onToggleSound={() => setSoundEnabled(!soundEnabled)}
           onNext={() => setCurrentView('captcha')} 
         />
      )}

      {currentView === 'captcha' && (
         <Captcha onVerify={() => setCurrentView('hub')} />
      )}

      {currentView === 'hub' && (
         <GameHub 
           playerName={playerName}
           onSelectGame={(gameID) => setCurrentView(`game_${gameID}`)}
           onNext={() => setCurrentView('ending')}
         />
      )}

      {currentView === 'game_catch' && (
         <ReverseCatchGame 
           playerName={playerName}
           onBack={() => setCurrentView('hub')} 
         />
      )}

      {currentView === 'game_xox' && (
         <ReverseTicTacToe 
           playerName={playerName}
           onBack={() => setCurrentView('hub')} 
         />
      )}

      {currentView === 'game_water' && (
         <ReverseWaterSort 
           playerName={playerName}
           onBack={() => setCurrentView('hub')} 
         />
      )}

      {currentView === 'game_defuser' && (
         <NotificationDefuser 
           playerName={playerName}
           onBack={() => setCurrentView('hub')} 
         />
      )}

      {currentView === 'ending' && (
         <SmartEnding 
           playerName={playerName}
           onResetGlobalStyles={handleReset} 
         />
      )}

      </div>
    </div>
  );
}

export default App;
