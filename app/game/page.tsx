'use client';

import { useState } from 'react';
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
  const [progress, setProgress] = useState(0);

  const allChallenges: Question[] = [
    {
      instruction: 'Write HTML that creates a paragraph that says "HTML is fun".',
      tip: 'Remember the tag that wraps text to form a paragraph.',
      failTip: 'Try using a paragraph tag like <p>.',
      placeholder: '<p>HTML is fun</p>',
      check: (input: string) => /<p>\s*html is fun\s*<\/p>/i.test(input),
      type: 'typing',
    },
    {
      instruction: 'Which tag makes the biggest heading?',
      tip: 'Heading tags range from h1 to h6.',
      options: ['<h1>', '<h3>', '<h6>'],
      correct: '<h1>',
      failTip: 'The biggest heading uses the smallest number.',
      type: 'choice',
    },
    {
      instruction: 'Choose the correct tag for a hyperlink.',
      tip: 'This tag is used for links and has href.',
      options: ['<p>', '<a>', '<link>'],
      correct: '<a>',
      failTip: 'It starts with the letter "a".',
      type: 'choice',
    },
    {
      instruction: 'Type HTML to make the word "Code" bold.',
      tip: 'Use the tag that styles text bold.',
      failTip: 'Try using <strong> or <b> tags.',
      placeholder: '<strong>Code</strong>',
      check: (input: string) => /<(strong|b)>\s*code\s*<\/(strong|b)>/i.test(input),
      type: 'typing',
    },
    {
      instruction: 'Which tag is used for images?',
      tip: 'This tag is self-closing and uses src and alt.',
      options: ['<img>', '<picture>', '<src>'],
      correct: '<img>',
      failTip: 'It starts with "img" and does not need a closing tag.',
      type: 'choice',
    },
    {
      instruction: 'Type HTML to create a level 2 heading that says "Start".',
      tip: 'Headings go from h1 (largest) to h6 (smallest).',
      failTip: 'Try using <h2>Start</h2>.',
      placeholder: '<h2>Start</h2>',
      check: (input: string) => /<h2>\s*start\s*<\/h2>/i.test(input),
      type: 'typing',
    },
    {
      instruction: 'Which element creates a line break?',
      tip: 'It is a self-closing tag with "br".',
      options: ['<hr>', '<br>', '<line>'],
      correct: '<br>',
      failTip: 'It’s just two letters: br.',
      type: 'choice',
    },
    {
      instruction: 'Write HTML to make the text "Fun" italic.',
      tip: 'Italic text can use <i> or <em> tags.',
      failTip: 'Try using <i> or <em>.',
      placeholder: '<em>Fun</em>',
      check: (input: string) => /<(i|em)>\s*fun\s*<\/(i|em)>/i.test(input),
      type: 'typing',
    },
    {
      instruction: 'Which tag defines a list item?',
      tip: 'Used inside ordered or unordered lists.',
      options: ['<li>', '<ol>', '<ul>'],
      correct: '<li>',
      failTip: 'The list item tag is "li".',
      type: 'choice',
    },
    {
      instruction: 'Write HTML to create a link that says "Site" and goes to example.com.',
      tip: 'Links use <a> with href attribute.',
      failTip: 'Try <a href="https://example.com">Site</a>',
      placeholder: '<a href="https://example.com">Site</a>',
      check: (input: string) =>
        /<a\s+href=["']https:\/\/example\.com["']>\s*site\s*<\/a>/i.test(input),
      type: 'typing',
    },
  ];

  // Start or restart the game, shuffle and pick 3 questions
  const startGame = () => {
    const shuffled = [...allChallenges].sort(() => 0.5 - Math.random());
    setChallengeSet(shuffled.slice(0, 3));
    setCurrentIndex(0);
    setScore(0);
    setProgress(0);
    setFeedback('');
    setInputValue('');
    setStep('challenge');
  };

  const current = challengeSet[currentIndex];

  const handleSubmit = (answer?: string) => {
    if (!current) return;

    let isCorrect = false;

    if (current.type === 'typing') {
      if (!inputValue.trim()) return; // Don't submit empty input
      isCorrect = current.check?.(inputValue.trim()) ?? false;
    } else if (current.type === 'choice') {
      isCorrect = answer === current.correct;
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback('✅ Correct!');
    } else {
      setFeedback('❌ Try again. Hint: ' + current.failTip);
      return;
    }

    setTimeout(() => {
      setFeedback('');
      setInputValue('');
      if (currentIndex + 1 < challengeSet.length) {
        setCurrentIndex((prev) => prev + 1);
        setProgress(((currentIndex + 2) / challengeSet.length) * 100);
      } else {
        setStep('complete');
        setProgress(100);
      }
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>HTML Learning Game</title>
      </Head>
      <div
        className="wrapper"
        style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#ffffff',
          background: 'linear-gradient(to bottom right, #2e0347, #162447)',
          fontFamily: '"Poppins", sans-serif',
          minHeight: '100vh',
          transition: 'all 0.5s ease-in-out',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            color: '#ffeaa7',
            userSelect: 'none',
          }}
        >
          ✨ Learn HTML by Playing!
        </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#d0e0ff' }}>
          This game is part of CodeQuest — a colorful way to learn web basics.
        </p>

        <div
          style={{
            height: '10px',
            background: '#fff3',
            borderRadius: '5px',
            marginBottom: '1rem',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: '#6c5ce7',
              height: '100%',
              borderRadius: '5px',
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </div>

        {step === 'intro' && (
          <div>
            <p style={{ fontSize: '1.2rem', color: '#f0f8ff' }}>
              Start learning HTML from scratch with easy challenges!
            </p>
            <button
              onClick={startGame}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                background: 'linear-gradient(to right, #ff6ec4, #7873f5)',
                color: '#fff',
                fontSize: '1rem',
                cursor: 'pointer',
                border: 'none',
                transition: 'transform 0.3s',
                userSelect: 'none',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              Start Game
            </button>
          </div>
        )}

        {step === 'challenge' && current && (
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '1.5rem',
              borderRadius: '15px',
              maxWidth: '700px',
              margin: '0 auto',
              boxShadow: '0 0 15px rgba(0,0,0,0.3)',
              userSelect: 'none',
              animation: 'fadeIn 0.5s ease',
            }}
          >
            <p
              style={{
                fontSize: '1.2rem',
                marginBottom: '0.5rem',
                color: '#ffff88',
              }}
            >
              {current.instruction}
            </p>
            <p
              style={{
                fontSize: '0.95rem',
                marginBottom: '1rem',
                color: '#84ffff',
              }}
            >
              💡 Tip: {current.tip}
            </p>

            {current.type === 'typing' ? (
              <>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  rows={2}
                  placeholder={current.placeholder}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    fontFamily: 'monospace',
                    color: '#222',
                    backgroundColor: '#fff',
                    userSelect: 'text',
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow =
                      '0 0 8px #6c5ce7aa')
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                />
                <button
                  onClick={() => handleSubmit()}
                  style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '10px',
                    background:
                      'linear-gradient(to right, #8e2de2, #f093fb)',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    border: 'none',
                    userSelect: 'none',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.05)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  Submit
                </button>
              </>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {current.options?.map((opt: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmit(opt)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      background: '#00cec9',
                      color: 'white',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      border: 'none',
                      userSelect: 'none',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#00b3ac')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = '#00cec9')
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            <p
              style={{
                marginTop: '1rem',
                fontWeight: 'bold',
                color: '#ffb6c1',
                minHeight: '1.4rem',
              }}
            >
              {feedback}
            </p>
          </div>
        )}

        {step === 'complete' && (
          <div>
            <p style={{ fontSize: '1.2rem', color: '#f5f5f5' }}>🎉 All done!</p>
            <p style={{ color: '#ffeaa7' }}>
              Your score: {score} / {challengeSet.length}
            </p>
            <button
              onClick={startGame}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                background:
                  'linear-gradient(to right, #00cec9, #6c5ce7)',
                color: '#fff',
                fontSize: '1rem',
                cursor: 'pointer',
                border: 'none',
                userSelect: 'none',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              Play Again
            </button>
          </div>
        )}

        <style>{`
          @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
          }
        `}</style>
      </div>
    </>
  );
}
