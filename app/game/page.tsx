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
      tip: 'Wrap your sentence using the correct tag for paragraphs.',
      failTip: 'The <p> tag wraps content in a paragraph.',
      placeholder: '<p>HTML is fun</p>',
      check: (input: string) => /<p>\s*html is fun\s*<\/p>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which tag makes the biggest heading?',
      tip: 'Lower heading numbers mean larger size.',
      options: ['<h1>', '<h3>', '<h6>'],
      correct: '<h1>',
      failTip: 'Use the largest heading tag available.',
      type: 'choice'
    },
    {
      instruction: 'Choose the correct tag for a hyperlink.',
      tip: 'It starts with "a" and is used for links.',
      options: ['<p>', '<a>', '<link>'],
      correct: '<a>',
      failTip: 'It allows navigation to another page.',
      type: 'choice'
    },
    {
      instruction: 'Type HTML to make the word "Code" bold.',
      tip: 'Use a tag that makes text stand out visually.',
      failTip: 'Try using <strong> or <b>.',
      placeholder: '<strong>Code</strong>',
      check: (input: string) => /<(strong|b)>\s*code\s*<\/(strong|b)>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which tag is used for images?',
      tip: 'It includes the src attribute and ends with a slash.',
      options: ['<img>', '<picture>', '<src>'],
      correct: '<img>',
      failTip: 'It is used to display pictures.',
      type: 'choice'
    },
    {
      instruction: 'Type HTML to create a level 2 heading that says "Start".',
      tip: 'Use the second largest heading level.',
      failTip: 'Try <h2>Start</h2>.',
      placeholder: '<h2>Start</h2>',
      check: (input: string) => /<h2>\s*start\s*<\/h2>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which element creates a line break?',
      tip: 'It is short and self-closing.',
      options: ['<hr>', '<br>', '<line>'],
      correct: '<br>',
      failTip: 'It is used to break lines.',
      type: 'choice'
    },
    {
      instruction: 'Write HTML to make the text "Fun" italic.',
      tip: 'Use a tag that visually slants the text.',
      failTip: 'Try using <i> or <em>.',
      placeholder: '<em>Fun</em>',
      check: (input: string) => /<(i|em)>\s*fun\s*<\/(i|em)>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which tag defines a list item?',
      tip: 'It is nested inside ordered or unordered lists.',
      options: ['<li>', '<ol>', '<ul>'],
      correct: '<li>',
      failTip: 'It defines a list item.',
      type: 'choice'
    },
    {
      instruction: 'Write HTML to create a link that says "Site" and goes to example.com.',
      tip: 'Use an anchor tag with the correct attribute.',
      failTip: 'Try <a href="https://example.com">Site</a>',
      placeholder: '<a href="https://example.com">Site</a>',
      check: (input: string) => /<a\s+href=["']https:\/\/example\.com["']>\s*site\s*<\/a>/i.test(input),
      type: 'typing'
    }
  ];

  useEffect(() => {
    const shuffled = [...allChallenges].sort(() => 0.5 - Math.random());
    setChallengeSet(shuffled.slice(0, 3));
    setCurrentIndex(0);
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

  const progress = ((currentIndex + (step === 'complete' ? 1 : 0)) / challengeSet.length) * 100;

  return (
    <>
      <Head>
        <title>CodeQuest</title>
      </Head>
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#fff',
        background: 'linear-gradient(to bottom right, #3f0d7d, #162447)',
        fontFamily: 'Poppins, sans-serif',
        minHeight: '100vh',
        transition: 'all 0.5s ease-in-out'
      }}>
        {step === 'intro' && (
          <div>
            <h1 style={{ fontSize: '3rem', color: '#f0f8ff' }}>Welcome to CodeQuest</h1>
            <p style={{ fontSize: '1.25rem' }}>Learn HTML the fun way! Ready to begin?</p>
            <button onClick={() => setStep('challenge')} style={{ marginTop: '1rem', padding: '0.75rem 2rem', background: '#6a0dad', color: '#fff', border: 'none', borderRadius: '1rem', fontSize: '1.1rem' }}>Start Game</button>
          </div>
        )}

        {step === 'challenge' && current && (
          <div style={{ marginTop: '2rem', animation: 'fadeIn 0.5s ease-in-out' }}>
            <h2 style={{ color: '#ffccff' }}>{current.instruction}</h2>
            <p style={{ color: '#b3e6ff' }}><em>Hint:</em> {current.tip}</p>

            {current.type === 'typing' && (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={current.placeholder || ''}
                style={{ padding: '0.5rem', fontSize: '1rem', width: '80%', color: '#000' }}
              />
            )}

            {current.type === 'choice' && current.options && (
              <div>
                {current.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSubmit(option)}
                    style={{ margin: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem', background: '#4e54c8', color: '#fff', border: 'none', borderRadius: '0.5rem' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <div style={{ marginTop: '1rem' }}>
              {current.type === 'typing' && (
                <button onClick={() => handleSubmit()} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem', background: '#6a0dad', color: '#fff', border: 'none', borderRadius: '0.5rem' }}>Submit</button>
              )}
              <p>{feedback}</p>
              <progress value={progress} max={100} style={{ width: '100%', marginTop: '1rem' }} />
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div>
            <h2 style={{ color: '#b0e0e6' }}>Well done!</h2>
            <p>Your score: {score}/{challengeSet.length}</p>
            <button onClick={() => { setStep('intro'); setCurrentIndex(0); setScore(0); }} style={{ marginTop: '1rem', padding: '0.75rem 2rem', background: '#6a0dad', color: '#fff', border: 'none', borderRadius: '1rem', fontSize: '1.1rem' }}>Play Again</button>
          </div>
        )}
      </div>
    </>
  );
}
