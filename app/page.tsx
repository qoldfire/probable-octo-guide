'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#cce6ff' }}>
        🎮 Welcome to CodeQuest
      </h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#eef' }}>
        Your journey into web development starts here. Explore games, challenges, and interactive lessons!
      </p>

      <div style={{
        background: 'rgba(0,0,50,0.3)',
        padding: '1.5rem',
        borderRadius: '15px',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 0 15px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ fontSize: '1.8rem', color: '#aaf' }}>🚀 Learn by Playing</h2>
        <p style={{ fontSize: '1rem', margin: '1rem 0' }}>
          Try our beginner-friendly HTML game to sharpen your coding skills in a fun way!
        </p>
        <Link href="/game">
          <button style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            background: '#6c5ce7',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>Play the HTML Game</button>
        </Link>
      </div>
    </div>
  );
}
