'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

// Define a type for the questions
type Question = {
  instruction: string;
  tip: string;
  failTip: string;
  placeholder?: string;
  check?: (input: string) => boolean;
  type: 'typing' | 'choice';
  options?: string[];
  correct?: string;
};

export default function GamePage() {
  const [step, setStep] = useState<'intro' | 'challenge' | 'complete'>('intro');
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [challengeSet, setChallengeSet] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allChallenges: Question[] = [
    {
      instruction: 'Write HTML that creates a paragraph that says "HTML is fun".',
      tip: 'Think about the tag that wraps a block of text.',
      failTip: 'Try using tags that group text into paragraphs.',
      placeholder: '<p>HTML is fun</p>',
      check: (input: string) => /<p>\s*html is fun\s*<\/p>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which tag makes the biggest heading?',
      tip: 'Heading sizes are numbered, smallest to largest.',
      options: ['<h1>', '<h3>', '<h6>'],
      correct: '<h1>',
      failTip: 'Look for the tag that represents the most important heading.',
      type: 'choice'
    },
    {
      instruction: 'Choose the correct tag for a hyperlink.',
      tip: 'It’s the tag that points to other pages.',
      options: ['<p>', '<a>', '<link>'],
      correct: '<a>',
      failTip: 'This tag usually has an href attribute.',
      type: 'choice'
    },
    {
      instruction: 'Type HTML to make the word "Code" bold.',
      tip: 'Which tags make text bold or strong?',
      failTip: 'Try tags like <strong> or <b>.',
      placeholder: '<strong>Code</strong>',
      check: (input: string) => /<(strong|b)>\s*code\s*<\/(strong|b)>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which tag is used for images?',
      tip: 'This tag has a src attribute and is self-closing.',
      options: ['<img>', '<picture>', '<src>'],
      correct: '<img>',
      failTip: 'It displays pictures on a page.',
      type: 'choice'
    },
    {
      instruction: 'Type HTML to create a level 2 heading that says "Start".',
      tip: 'Think about the second largest heading tag.',
      failTip: 'Try <h2>Start</h2>.',
      placeholder: '<h2>Start</h2>',
      check: (input: string) => /<h2>\s*start\s*<\/h2>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which element creates a line break?',
      tip: 'It’s used to jump to the next line without a paragraph.',
      options: ['<hr>', '<br>', '<line>'],
      correct: '<br>',
      failTip: 'This tag doesn’t have a closing tag.',
      type: 'choice'
    },
    {
      instruction: 'Write HTML to make the text "Fun" italic.',
      tip: 'Which tags slant the text?',
      failTip: 'Try <i> or <em>.',
      placeholder: '<em>Fun</em>',
      check: (input: string) => /<(i|em)>\s*fun\s*<\/(i|em)>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which tag defines a list item?',
      tip: 'It’s used inside ordered and unordered lists.',
      options: ['<li>', '<ol>', '<ul>'],
      correct: '<li>',
      failTip: 'It wraps each item in a list.',
      type: 'choice'
    },
    {
      instruction: 'Write HTML to create a link that says "Site" and goes to example.com.',
      tip: 'Use a tag with href attribute linking to a URL.',
      failTip: 'Try <a href="https://example.com">Site</a>.',
      placeholder: '<a href="https://example.com">Site</a>',
      check: (input: string) => /<a\s+href=["']https:\/\/example\.com["']>\s*site\s*<\/a>/i.test(input),
      type: 'typing'
    }
  ];

  useEffect(() => {
    const shuffled = [...allChallenges].sort(() => 0.5 - Math.random());
    setChallengeSet(shuffled.slice(0, 10));
    setCurrentIndex(0);
    setScore(0);
    setFeedback('');
    setInputValue('');
  }, [step]);

  const current = challengeSet[currentIndex];

  const handleSubmit = (answer?: string) => {
    let isCorrect = false;
    if (current.type === 'typing') {
      if (!inputValue.trim()) return;
      isCorrect = current.check?.(inputValue.trim()) ?? false;
    } else if (current.type === 'choice') {
      isCorrect = answer === current.correct;
    }

    if (isCorrect) {
      setScore(score + 1);
      setFeedback('✅ Correct!');
    } else {
      setFeedback('❌ Try again. Hint: ' + current.failTip);
      return;
    }

    setTimeout(() => {
      setFeedback('');
      setInputValue('');
      if (currentIndex + 1 < challengeSet.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setStep('complete');
      }
    }, 1000);
  };

  const progress = ((currentIndex + (feedback ? 1 : 0)) / challengeSet.length) * 100;

  return (
    <>
      <Head>
        <title>CodeQuest</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#fff',
          background: 'linear-gradient(135deg, #3a1c71 0%, #6a11cb 50%, #2575fc 100%)',
          fontFamily: "'Poppins', sans-serif",
          minHeight: '100vh',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.07), transparent 25%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.07), transparent 25%)',
          transition: 'all 0.5s ease-in-out',
        }}
      >
        {step === 'intro' && (
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to CodeQuest</h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
              Test your HTML skills with fun challenges!
            </p>
            <button
              style={{
                background: 'linear-gradient(90deg, #ff6ec4, #7873f5)',
                border: 'none',
                borderRadius: '10px',
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s ease',
              }}
              onClick={() => setStep('challenge')}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Start Game
            </button>
          </div>
        )}

        {step === 'challenge' && current && (
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{current.instruction}</h2>
            <p style={{ color: '#ffd700', fontWeight: 'bold' }}>{current.tip}</p>
            <div style={{ marginTop: '1rem' }}>
              {current.type === 'typing' ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={current.placeholder}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #fff',
                    fontSize: '1rem',
                    width: '80%',
                    maxWidth: '500px',
                    backgroundColor: '#222',
                    color: '#fff',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#ff6ec4')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#fff')}
                />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {current.options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSubmit(option)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        color: '#333',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eee')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div style={{ marginTop: '1rem', height: '1.5rem', fontWeight: 'bold' }}>{feedback}</div>
            <div style={{ marginTop: '2rem' }}>
              <div
                style={{
                  height: '10px',
                  width: '80%',
                  background: '#444',
                  margin: '0 auto',
                  borderRadius: '5px',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                    borderRadius: '5px',
                    transition: 'width 0.5s ease-in-out',
                  }}
                ></div>
              </div>
              <p style={{ marginTop: '0.5rem' }}>
                {currentIndex + 1} / {challengeSet.length}
              </p>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉 Great job! 🎉</h2>
            <p style={{ fontSize: '1.25rem' }}>
              Your score: {score} / {challengeSet.length}
            </p>
            <button
              style={{
                background: 'linear-gradient(90deg, #ff6ec4, #7873f5)',
                border: 'none',
                borderRadius: '10px',
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                color: 'white',
                cursor: 'pointer',
                marginTop: '2rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s ease',
              }}
              onClick={() => setStep('intro')}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </>
  );
}
