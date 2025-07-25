'use client';

import { useState } from 'react';
import Head from 'next/head';

export default function GamePage() {
  const [step, setStep] = useState<'intro' | 'challenge' | 'complete'>('intro');
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const challenges = [
    {
      instruction: 'Create a paragraph that says: Hello World!',
      tip:
        'A paragraph is created with <p> tags. For example: <p>Hello World!</p>.',
      placeholder: '<p>Hello World!</p>',
      check: (input: string) =>
        /<p>\s*hello world\s*<\/p>/i.test(input),
    },
    {
      instruction: 'Make the word "Welcome" a main heading.',
      tip:
        'Headings are made with <h1> to <h6> tags. The biggest heading is <h1>. Example: <h1>Welcome</h1>.',
      placeholder: '<h1>Welcome</h1>',
      check: (input: string) =>
        /<h1>\s*welcome\s*<\/h1>/i.test(input),
    },
    {
      instruction: 'Create a link to https://example.com that says "Click Here".',
      tip:
        'Use <a> tag with href attribute. Example: <a href="https://example.com">Click Here</a>.',
      placeholder: '<a href="https://example.com">Click Here</a>',
      check: (input: string) =>
        /<a\s+href=['"]https:\/\/example\.com['"]\s*>\s*click here\s*<\/a>/i.test(input),
    },
    {
      instruction: 'Add a list with these items: Apple, Banana, Cherry.',
      tip:
        'Use <ul> for unordered list and <li> for list items. Example: <ul><li>Apple</li></ul>.',
      placeholder:
        '<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Cherry</li>\n</ul>',
      check: (input: string) =>
        /<ul>[\s\S]*<li>\s*apple\s*<\/li>[\s\S]*<li>\s*banana\s*<\/li>[\s\S]*<li>\s*cherry\s*<\/li>[\s\S]*<\/ul>/i.test(input),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = challenges[currentIndex];

  const handleSubmit = () => {
    if (current.check(inputValue.trim())) {
      setScore(score + 1);
      setFeedback('✅ Awesome! You got it right.');
      setTimeout(() => {
        setFeedback('');
        setInputValue('');
        if (currentIndex + 1 < challenges.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setStep('complete');
        }
      }, 1400);
    } else {
      setFeedback('❌ Not quite. Tip: ' + current.tip);
    }
  };

  return (
    <div className="wrapper" style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
      <Head>
        <title>CodeQuest: Learn HTML Basics</title>
      </Head>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#cce6ff' }}>
        🌐 HTML Beginner Challenge
      </h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#eef' }}>
        Start your journey learning HTML — the language of the web!
      </p>

      {step === 'intro' && (
        <div>
          <p style={{ fontSize: '1.2rem' }}>
            You'll learn to write basic HTML tags step-by-step. Try your best, and have fun!
          </p>
          <button
            onClick={() => setStep('challenge')}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              background: '#6c5ce7',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Start Learning
          </button>
        </div>
      )}

      {step === 'challenge' && (
        <div
          style={{
            background: 'rgba(0,0,50,0.4)',
            padding: '1.5rem',
            borderRadius: '15px',
            maxWidth: '700px',
            margin: '0 auto',
            boxShadow: '0 0 15px rgba(0,0,0,0.6)',
          }}
        >
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{current.instruction}</p>
          <p style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#aaf' }}>💡 Tip: {current.tip}</p>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={3}
            placeholder={current.placeholder}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '10px',
              border: '1px solid #888',
              fontSize: '1rem',
              fontFamily: 'monospace',
              resize: 'vertical',
            }}
          />
          <br />
          <button
            onClick={handleSubmit}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '10px',
              background: 'linear-gradient(to right, #00c6ff, #8e2de2)',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
          <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{feedback}</p>
        </div>
      )}

      {step === 'complete' && (
        <div>
          <p style={{ fontSize: '1.3rem' }}>🎉 Congratulations! You completed the beginner challenges.</p>
          <p style={{ marginBottom: '1rem' }}>
            Your score: {score} / {challenges.length}
          </p>
          <button
            onClick={() => {
              setScore(0);
              setCurrentIndex(0);
              setStep('challenge');
              setFeedback('');
              setInputValue('');
            }}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              background: '#8a2be2',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
