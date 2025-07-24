'use client';

import { useState } from 'react';

export default function GamePage() {
  const [step, setStep] = useState<'intro' | 'challenge' | 'complete'>('intro');
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const challenges = [
    {
      instruction: 'Type the word "HTML" inside a paragraph.',
      tip: 'Use <p> to define a paragraph. It wraps your text and displays it on the page, like <p>HTML</p>.',
      placeholder: '<p>HTML</p>',
      check: (input: string) => /<p>\s*html\s*<\/p>/i.test(input)
    },
    {
      instruction: 'Show the word "Welcome" as a heading.',
      tip: 'Use <h1> for big headings, like <h1>Welcome</h1>.',
      placeholder: '<h1>Welcome</h1>',
      check: (input: string) => /<h1>\s*welcome\s*<\/h1>/i.test(input)
    },
    {
      instruction: 'Make a link that says "Go" and points to https://example.com.',
      tip: 'Use <a> to create a link. Add href="URL" to set the destination, and put the visible text between the tags, like <a href="https://example.com">Go</a>.',
      placeholder: '<a href="https://example.com">Go</a>',
      check: (input: string) => /<a\s+href=["']https:\/\/example\.com["']\s*>\s*go\s*<\/a>/i.test(input)
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = challenges[currentIndex];

  const handleSubmit = () => {
    if (current.check(inputValue.trim())) {
      setScore(score + 1);
      setFeedback('✅ Great job!');
    } else {
      setFeedback('❌ Oops! Tip: ' + current.tip);
      return;
    }

    setTimeout(() => {
      setFeedback('');
      setInputValue('');
      if (currentIndex + 1 < challenges.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setStep('complete');
      }
    }, 1200);
  };

  return (
    <div className="wrapper" style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#cce6ff' }}>
        🌐 Learn HTML by Playing!
      </h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#eef' }}>
        This mini-game is part of CodeQuest — a colorful adventure that helps you learn web development step-by-step.
      </p>

      {step === 'intro' && (
        <div>
          <p style={{ fontSize: '1.2rem' }}>
            Practice writing simple HTML code. It's interactive, beginner-friendly, and fun!
          </p>
          <button onClick={() => setStep('challenge')} style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            background: '#6c5ce7',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>Start Learning</button>
        </div>
      )}

      {step === 'challenge' && (
        <div style={{
          background: 'rgba(0,0,50,0.3)',
          padding: '1.5rem',
          borderRadius: '15px',
          maxWidth: '700px',
          margin: '0 auto',
          boxShadow: '0 0 15px rgba(0,0,0,0.5)'
        }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{current.instruction}</p>
          <p style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#aaf' }}>💡 Tip: {current.tip}</p>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={2}
            placeholder={current.placeholder}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '10px',
              border: '1px solid #888',
              fontSize: '1rem',
              fontFamily: 'monospace'
            }}
          />
          <br />
          <button onClick={handleSubmit} style={{
            marginTop: '1rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '10px',
            background: 'linear-gradient(to right, #00c6ff, #8e2de2)',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>Submit</button>
          <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{feedback}</p>
        </div>
      )}

      {step === 'complete' && (
        <div>
          <p style={{ fontSize: '1.2rem' }}>🎉 You did it!</p>
          <p>Your score: {score} / {challenges.length}</p>
          <button onClick={() => {
            setScore(0);
            setCurrentIndex(0);
            setStep('challenge');
          }} style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            background: '#8a2be2',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>Play Again</button>
        </div>
      )}
    </div>
  );
}
