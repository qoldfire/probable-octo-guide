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
      tip: 'A paragraph is made using the <p> element. It wraps blocks of text.',
      failTip: 'Try wrapping the word using the paragraph element with angle brackets.',
      placeholder: 'Type your HTML here...',
      check: (input: string) => /<p>\s*html\s*<\/p>/i.test(input)
    },
    {
      instruction: 'Show the word "Welcome" as a heading.',
      tip: 'Headings are created using <h1> to <h6> depending on importance.',
      failTip: 'Use the <h1> tag to make a main heading.',
      placeholder: 'Type your HTML here...',
      check: (input: string) => /<h1>\s*welcome\s*<\/h1>/i.test(input)
    },
    {
      instruction: 'Make a link that says "Go" and points to https://example.com.',
      tip: 'Links use the <a> tag with an href attribute to set the destination.',
      failTip: 'Try using <a href="...">text</a> for the link.',
      placeholder: 'Type your HTML here...',
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
      setFeedback('❌ Try again. Hint: ' + current.failTip);
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
    <div className="wrapper" style={{
      padding: '2rem',
      textAlign: 'center',
      color: '#ffffff',
      background: 'linear-gradient(to bottom right, #1a1a3d, #2c3e50)',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#aee2ff' }}>
        🌐 Learn HTML by Playing!
      </h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#eee' }}>
        This mini-game is part of CodeQuest — a colorful adventure that helps you learn web development step-by-step.
      </p>

      {step === 'intro' && (
        <div>
          <p style={{ fontSize: '1.2rem', color: '#f0f8ff' }}>
            Practice writing simple HTML code. It&rsquo;s interactive, beginner-friendly, and fun!
          </p>
          <button onClick={() => setStep('challenge')} style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            background: 'linear-gradient(to right, #6c5ce7, #00cec9)',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer',
            border: 'none'
          }}>Start Learning</button>
        </div>
      )}

      {step === 'challenge' && (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '1.5rem',
          borderRadius: '15px',
          maxWidth: '700px',
          margin: '0 auto',
          boxShadow: '0 0 15px rgba(0,0,0,0.5)'
        }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#ffff88' }}>{current.instruction}</p>
          <p style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#84ffff' }}>💡 Tip: {current.tip}</p>
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
              fontFamily: 'monospace',
              backgroundColor: '#ffffff',
              color: '#000000'
            }}
          />
          <br />
          <button onClick={handleSubmit} style={{
            marginTop: '1rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '10px',
            background: 'linear-gradient(to right, #8e2de2, #f093fb)',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            border: 'none'
          }}>Submit</button>
          <p style={{ marginTop: '1rem', fontWeight: 'bold', color: '#ffb6c1' }}>{feedback}</p>
        </div>
      )}

      {step === 'complete' && (
        <div>
          <p style={{ fontSize: '1.2rem', color: '#f5f5f5' }}>🎉 You did it!</p>
          <p style={{ color: '#ffeaa7' }}>Your score: {score} / {challenges.length}</p>
          <button onClick={() => {
            setScore(0);
            setCurrentIndex(0);
            setStep('challenge');
          }} style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            background: 'linear-gradient(to right, #00cec9, #6c5ce7)',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer',
            border: 'none'
          }}>Play Again</button>
        </div>
      )}
    </div>
  );
}
