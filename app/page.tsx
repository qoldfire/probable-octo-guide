export default function HomePage() {
  return (
    <div style={{
      background: "linear-gradient(to bottom right, #6a0dad, #1e90ff)",
      fontFamily: "'Comic Sans MS', 'Segoe UI', sans-serif",
      color: "white",
      margin: 0,
      padding: 0,
      minHeight: "100vh"
    }}>
      <header style={{
        background: "rgba(0, 0, 0, 0.2)",
        padding: "2rem",
        textAlign: "center",
        borderBottom: "3px solid white"
      }}>
        <h1 style={{ fontSize: "3rem", margin: 0, letterSpacing: "2px" }}>CodeQuest</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>
          An epic journey where you level up through coding challenges!
        </p>
        <nav style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "1rem"
        }}>
          <a href="#about" style={linkStyle}>About</a>
          <a href="#features" style={linkStyle}>Features</a>
          <a href="#screenshots" style={linkStyle}>Screenshots</a>
        </nav>
      </header>

      <section id="about" style={sectionStyle}>
        <h2>About the Game</h2>
        <p>
          CodeQuest is a colorful adventure game that teaches you how to code while exploring magical worlds.
          Solve puzzles, write code, and defeat bugs!
        </p>
      </section>

      <section id="features" style={sectionStyle}>
        <h2>Game Features</h2>
        <div style={featuresGrid}>
          {[
            { icon: "🧩", title: "Puzzles", text: "Learn logic and syntax by solving fun and tricky challenges." },
            { icon: "🎮", title: "Gameplay", text: "Play as a coding wizard and fix the broken digital world!" },
            { icon: "📚", title: "Learn", text: "Interactive tutorials in Python, JavaScript, and more." }
          ].map((f, i) => (
            <div key={i} style={featureBox}>
              <h3>{f.icon} {f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="screenshots" style={sectionStyle}>
        <h2>Game Screenshots</h2>
        <img
          src="https://via.placeholder.com/400x250.png?text=Level+1:+Bug+Forest"
          alt="Screenshot 1"
          style={imgStyle}
        />
        <img
          src="https://via.placeholder.com/400x250.png?text=Code+Editor+Scene"
          alt="Screenshot 2"
          style={imgStyle}
        />
      </section>

      <footer style={{
        background: "rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        padding: "1rem",
        fontSize: "0.9rem"
      }}>
        <p>© 2025 CodeQuest. All rights reserved. | Made with 💙 and ☕</p>
      </footer>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "color 0.3s ease",
};

const sectionStyle = {
  padding: "3rem 2rem",
  textAlign: "center" as const,
};

const featuresGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "2rem",
  marginTop: "2rem",
};

const featureBox = {
  background: "rgba(255, 255, 255, 0.1)",
  padding: "1.5rem",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
};

const imgStyle = {
  width: "90%",
  maxWidth: "400px",
  borderRadius: "10px",
  boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
  margin: "1rem 0",
};
