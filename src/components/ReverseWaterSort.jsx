import React, { useState, useEffect } from 'react';
import ProGameWrapper from './ProGameWrapper';
import soundManager from '../utils/SoundManager';

function ReverseWaterSort({ onBack, playerName }) {
  // 3 tubes, 4 slots each. Starts sorted.
  const [tubes, setTubes] = useState([
    ['red', 'red', 'red', 'red'],
    ['blue', 'blue', 'blue', 'blue'],
    ['green', 'green', 'green', 'green'],
    [],
    [] // Two empty tubes
  ]);
  
  const [selectedTube, setSelectedTube] = useState(null);
  const [pours, setPours] = useState(0);
  const [status, setStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    if (status === 'won') {
      soundManager.playWin();
    } else if (status === 'lost') {
      soundManager.playLose();
    }
  }, [status]);
  // Available random chaotic colors
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];

  const isAnyBottleSorted = (currentTubes) => {
    return currentTubes.some(tube => {
      // A tube is "sorted" if it has 4 elements and all are the same color
      return tube.length === 4 && tube.every(color => color === tube[0]);
    });
  };

  const handleTubeClick = (index) => {
    if (status !== 'playing') return;

    if (selectedTube === null) {
      if (tubes[index].length > 0) {
        setSelectedTube(index);
      }
    } else {
      if (selectedTube === index) {
        setSelectedTube(null);
      } else {
        if (tubes[index].length < 4) {
          const newTubes = [...tubes.map(t => [...t])];
          const colorToPour = newTubes[selectedTube].pop();
          
          const mutatedColor = colors[Math.floor(Math.random() * colors.length)];
          newTubes[index].push(mutatedColor);
          
          const newPours = pours + 1;
          setTubes(newTubes);
          setSelectedTube(null);
          setPours(newPours);
          
          if (Math.random() < 0.2) {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 500);
          }
          
          if (newPours >= 10) {
            if (isAnyBottleSorted(newTubes)) {
              setStatus('lost');
            } else {
              setStatus('won');
            }
          }
        } else {
          setSelectedTube(null);
        }
      }
    }
  };

  return (
    <ProGameWrapper 
      title="CHAOS_SORT_DYNAMICS" 
      playerName={playerName} 
      onBack={onBack} 
      score={pours * 10}
      status={status === 'won' ? "STABILIZED" : (status === 'lost' ? "CRITICAL_ORDER" : "ERROR_ACTIVE")}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem', background: '#0f172a' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem', maxWidth: '600px', textAlign: 'center', color: '#94a3b8' }}>
          <strong>MISSION_GOAL:</strong> These tubes are far too organized. Ruin them by pouring. 
          <em> Fluid dynamics are currently unstable.</em>
        </p>

        {/* Chaos Meter */}
        <div style={{ width: '100%', maxWidth: '400px', height: '12px', background: '#334155', borderRadius: '10px', marginBottom: '3rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ 
            width: `${Math.min(100, pours * 10)}%`, 
            height: '100%', 
            background: `linear-gradient(90deg, #3b82f6, ${pours > 7 ? '#ef4444' : '#8b5cf6'})`, 
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
          }} />
          <div style={{ position: 'absolute', top: 0, right: '10px', fontSize: '0.6rem', color: '#fff', fontWeight: 'bold', lineHeight: '12px' }}>
            CHAOS_LEVEL: {pours * 10}%
          </div>
        </div>

        {status === 'won' && (
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '1rem 2rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '1.2rem' }}>
            MAXIMUM CHAOS ACHIEVED: SYSTEM DEGRADED SUCCESSFULLY
          </div>
        )}

        {status === 'lost' && (
          <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#ef4444', padding: '1rem 2rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '1.2rem', textAlign: 'center' }}>
            <strong>SYSTEM FAILURE:</strong> Potential Order Detected!<br/>
            Organization is strictly prohibited in Reverse World.
          </div>
        )}

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', height: '250px', alignItems: 'flex-end' }}>
          {tubes.map((tube, tIdx) => (
            <div 
              key={tIdx}
              onClick={() => handleTubeClick(tIdx)}
              style={{
                width: '60px',
                height: '200px',
                border: '3px solid #334155',
                borderTop: 'none',
                borderRadius: '0 0 30px 30px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden',
                cursor: 'pointer',
                transform: selectedTube === tIdx ? 'translateY(-20px)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                background: 'rgba(255,255,255,0.05)',
                boxShadow: selectedTube === tIdx ? '0 10px 40px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              {[...tube].map((col, cIdx) => (
                <div 
                  key={cIdx} 
                  style={{
                    height: '25%', 
                    width: '100%',
                    backgroundColor: col,
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background-color 0.5s'
                  }} 
                />
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {status !== 'playing' && (
            <button 
              onClick={() => {
                setTubes([
                  ['red', 'red', 'red', 'red'],
                  ['blue', 'blue', 'blue', 'blue'],
                  ['green', 'green', 'green', 'green'],
                  [], []
                ]);
                setPours(0);
                setStatus('playing');
                setSelectedTube(null);
              }}
              style={{ padding: '0.8rem 2rem', background: '#3b82f6', color: '#fff', border: 'none', fontSize: '1.1rem', borderRadius: '4px', cursor: 'pointer' }}
            >
              {status === 'lost' ? 'RE-TRY_CHAOS' : 'RE-ORDER_FLUIDS'}
            </button>
          )}
        </div>
      </div>
    </ProGameWrapper>
  );
}

export default ReverseWaterSort;
