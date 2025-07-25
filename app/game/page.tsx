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
  const [progress, setProgress] = useState(0);

  const allChallenges: Question[] = [
    {
      instruction: 'Write HTML that creates a paragraph that says "HTML is fun".',
      tip: 'Paragraphs start with a certain tag. The text goes inside it.',
      failTip: 'Use a tag like <p> to wrap the sentence.',
      placeholder: '<p>HTML is fun</p>',
      check: (input: string) => /<p>\s*html is fun\s*<\/p>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which tag makes the biggest heading?',
      tip: 'Heading levels go from h1 to h6.',
      options: ['<h1>', '<h3>', '<h6>'],
      correct: '<h1>',
      failTip: 'Try the one with the smallest number.',
      type: 'choice'
    },
    {
      instruction: 'Choose the correct tag for a hyperlink.',
      tip: 'This tag starts with "a" and uses href.',
      options: ['<p>', '<a>', '<link>'],
      correct: '<a>',
      failTip: 'This tag connects to other pages.',
      type: 'choice'
    },
    {
      instruction: 'Type HTML to make the word "Code" bold.',
      tip: 'Use the tag for bold text.',
      failTip: 'Try using <strong> or <b>.',
      placeholder: '<strong>Code</strong>',
      check: (input: string) => /<(strong|b)>\s*code\s*<\/(strong|b)>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which tag is used for images?',
      tip: 'This tag has src and alt attributes.',
      options: ['<img>', '<picture>', '<src>'],
      correct: '<img>',
      failTip: 'This one uses src and has no closing tag.',
      type: 'choice'
    },
    {
      instruction: 'Type HTML to create a level 2 heading that says "Start".',
      tip: 'Headings use h1 to h6.',
      failTip: 'Try <h2>Start</h2>.',
      placeholder: '<h2>Start</h2>',
      check: (input: string) => /<h2>\s*start\s*<\/h2>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which element creates a line break?',
      tip: 'It’s a self-closing tag with a “br”.',
      options: ['<hr>', '<br>', '<line>'],
      correct: '<br>',
      failTip: 'This one is just two letters.',
      type: 'choice'
    },
    {
      instruction: 'Write HTML to make the text "Fun" italic.',
      tip: 'Italic tags include <i> and <em>.',
      failTip: 'Try using <i> or <em>.',
      placeholder: '<em>Fun</em>',
      check: (input: string) => /<(i|em)>\s*fun\s*<\/(i|em)>/i.test(input),
      type: 'typing'
    },
    {
      instruction: 'Which tag defines a list item?',
      tip: 'It starts with "l" and is used inside lists.',
      options: ['<li>', '<ol>', '<ul>'],
      correct: '<li>',
      failTip: 'Used inside <ul> or <ol>.',
      type: 'choice'
    },
    {
      instruction: 'Write HTML to create a link that says "Site" and goes to example.com.',
      tip: 'Links use <a> and href.',
      failTip: 'Try <a href="https://example.com">Site</a>',
      placeholder: '<a href="https://example.com">Site</a>',
      check: (input: string) => /<a\s+href=["']https:\/\/example\.com["']>\s*site\s*<\/a>/i.test(input),
      type: 'typing'
    }
  ];

  useEffect(() => {
    const shuffled = [...allChallenges].sort(() => 0.5 - Math.random());
    setChallengeSet(shuffled.slice(0, 3));
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
        setProgress(((currentIndex + 2) / challengeSet.length) * 100);
      } else {
        setStep('complete');
      }
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>HTML Learning Game</title>
      </Head>
      <div className="wrapper" style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#ffffff',
        background: 'linear-gradient(to bottom right, #2e0347, #162447)',
        fontFamily: '"Poppins", sans-serif',
        minHeight: '100vh',
        transition: 'all 0.5s ease-in-out'
      }}>
        {/* ... rest of UI unchanged ... */}
      </div>
    </>
  );
}
