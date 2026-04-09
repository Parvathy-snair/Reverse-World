import React, { useState } from 'react';

function PreferenceTest({ onComplete }) {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({});

  const questions = [
    {
      id: 'darkMode',
      q: 'Do you like dark mode?',
      options: ['Yes, absolutely', 'No, I prefer light mode']
    },
    {
      id: 'animations',
      q: 'Do you enjoy smooth animations?',
      options: ['Yes, make it dynamic', 'No, keep it static']
    },
    {
      id: 'popups',
      q: 'Do you hate popups?',
      options: ['Yes, they are annoying', 'No, they are fine']
    },
    {
      id: 'simpleUI',
      q: 'Do you prefer a simple UI?',
      options: ['Yes, minimal is better', 'No, give me complexity']
    }
  ];

  const handleAnswer = (answerIndex) => {
    // Record what they said so we can ignore it
    const updatedPrefs = { ...preferences, [questions[step].id]: answerIndex === 0 };
    setPreferences(updatedPrefs);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(step + 1); // Go to final message
      setTimeout(() => {
        onComplete(updatedPrefs);
      }, 3000);
    }
  };

  return (
    <div className="section" style={{ minHeight: '100vh', background: '#1e293b', color: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#334155', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', width: '90%', maxWidth: '500px', textAlign: 'center' }}>
        
        {step < questions.length ? (
          <>
            <h2 style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '1rem', textTransform: 'uppercase', tracking: '2px' }}>
              Step {step + 1} of {questions.length}
            </h2>
            <h1 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>{questions[step].q}</h1>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {questions[step].options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  style={{
                    padding: '1rem',
                    fontSize: '1.1rem',
                    background: '#475569',
                    color: '#fff',
                    borderRadius: '8px',
                    border: '2px solid transparent',
                    transition: 'background 0.2s, border 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = '#64748b';
                    e.target.style.borderColor = '#38bdf8';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = '#475569';
                    e.target.style.borderColor = 'transparent';
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ animation: 'fadeIn 1s' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#38bdf8', marginBottom: '1rem' }}>Configuration Complete</h1>
            <p style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>
              We carefully ignored your preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PreferenceTest;
