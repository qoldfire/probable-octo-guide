"use client";

import React from "react";
import Link from "next/link";

const gradientBackground = {
  background: "linear-gradient(135deg, #6a0dad, #0000ff)",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "white",
  padding: "1rem",
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "rgba(20, 20, 60, 0.9)",
  borderRadius: 16,
  padding: "2rem",
  maxWidth: 600,
  width: "100%",
  boxShadow: "0 0 25px rgba(138, 43, 226, 0.8)",
  textAlign: "center",
  userSelect: "none",
};

const titleStyle: React.CSSProperties = {
  fontSize: "3rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  color: "#9370db",
  textShadow: "0 0 12px #b19cd9",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  marginBottom: "2rem",
  color: "white",
  lineHeight: 1.5,
};

const playButtonStyle: React.CSSProperties = {
  backgroundColor: "#20b2aa",
  color: "white",
  border: "none",
  borderRadius: 12,
  padding: "1rem 2rem",
  fontSize: "1.3rem",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 15px #20b2aa",
  transition: "background-color 0.3s, transform 0.2s",
  userSelect: "none",
  textDecoration: "none",
  display: "inline-block",
};

export default function HomePage() {
  React.useEffect(() => {
    document.title = "CodeQuest Home";
  }, []);

  return (
    <div style={gradientBackground}>
      <main style={containerStyle}>
        <h1 style={titleStyle}>Welcome to CodeQuest</h1>
        <p style={descriptionStyle}>
          Start your journey learning HTML with fun and easy challenges. Answer questions,
          get helpful hints, and improve your coding skills!
        </p>
        <Link href="/game" passHref legacyBehavior>
          <a
            style={playButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#3ebebe";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#20b2aa";
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label="Start playing CodeQuest"
          >
            Play Now
          </a>
        </Link>
      </main>
    </div>
  );
}
