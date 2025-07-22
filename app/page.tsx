'use client';

import { Fragment } from "react";

export default function HomePage() {
  return (
    <Fragment>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #6a0dad, #1e90ff);
          color: white;
          scroll-behavior: smooth;
        }

        a {
          color: white;
          text-decoration: none;
        }

        a:hover {
          color: #ffcbf2;
        }

        h1, h2, h3 {
          margin: 0;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        .wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }

        .feature-box {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 1.5rem;
          transition: transform 0.3s ease, background 0.3s ease;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .feature-box:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.2);
        }

        footer {
          background: rgba(0, 0, 0, 0.3);
          text-align: center;
          padding: 1rem;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.2rem;
          }

          nav {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="wrapper">
        <header className="hero" style={{
          textAlign: "center",
          padding: "3rem 1rem",
          borderBottom: "3px solid rgba(255, 255, 255, 0.4)",
        }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: 800,
            background: "linear-gradient(to right, #ffd700, #00ffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            CodeQuest
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#ffefff", marginTop: "0.5rem" }}>
            Level up your mind with every line of code!
          </p>
          <nav style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap"
          }}>
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#screenshots">Screenshots</a>
          </nav>
        </header>

        <section id="about" style={{
          padding: "4rem 1rem",
          textAlign: "center"
        }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem", color: "#ffd6ff" }}>About the Game</h2>
          <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem", color: "#f0f8ff" }}>
            CodeQuest is a vibrant journey where you solve puzzles, defeat bugs, and unlock powers through real programming. Perfect for beginners and pros alike!
          </p>
        </section>

        <section id="features" style={{ padding: "4rem 1rem" }}>
          <h2 style={{ textAlign: "center", fontSize: "2.2rem", marginBottom: "2rem", color: "#aff8db" }}>Game Features</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem"
          }}>
            {[
              { emoji: "🧩", title: "Challenging Puzzles", text: "Boost your brain power with logical challenges that teach real code." },
              { emoji: "🎨", title: "Colorful Worlds", text: "Explore vibrant environments styled like digital dreamscapes." },
              { emoji: "🚀", title: "Skill Progression", text: "Level up through Python, JavaScript, and more while earning rewards." },
              { emoji: "🌐", title: "Global Leaderboard", text: "Compete with coders around the world to become a CodeMaster!" }
            ].map((feature, index) => (
              <div key={index} className="feature-box">
                <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{feature.emoji} {feature.title}</h3>
                <p style={{ fontSize: "1rem", color: "#e0f7ff" }}>{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="screenshots" style={{ padding: "4rem 1rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", color: "#f0aaff", marginBottom: "2rem" }}>Game Screenshots</h2>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "center"
          }}>
            <img src="https://via.placeholder.com/400x250.png?text=Level+1:+Bug+Forest" alt="Bug Forest" style={{
              borderRadius: "15px",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
            }} />
            <img src="https://via.placeholder.com/400x250.png?text=Code+Battle+Arena" alt="Code Arena" style={{
              borderRadius: "15px",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
            }} />
          </div>
        </section>

        <footer>
          <p>© 2025 CodeQuest. Built with 💙 by Dev Explorers.</p>
        </footer>
      </div>
    </Fragment>
  );
}
