import React, { useState, useEffect } from "react";

type Question = {
  question: string;
  choices: string[];
  answer: string;
  hint: string;
};

const questionsPool: Question[] = [
  {
    question: "What does HTML stand for?",
    choices: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlinking Text Mark Language",
      "Home Tool Markup Language",
    ],
    answer: "HyperText Markup Language",
    hint: "It's about marking up hypertext documents.",
  },
  {
    question: "Which tag is used to create a hyperlink?",
    choices: ["<a>", "<link>", "<href>", "<hyperlink>"],
    answer: "<a>",
    hint: "It stands for anchor.",
  },
  {
    question: "How do you add a comment in HTML?",
    choices: [
      "// This is a comment",
      "<!-- This is a comment -->",
      "/* This is a comment */",
      "# This is a comment",
    ],
    answer: "<!-- This is a comment -->",
    hint: "It uses angle brackets and exclamation marks.",
  },
  {
    question: "Which tag is used to define a paragraph?",
    choices: ["<p>", "<para>", "<paragraph>", "<text>"],
    answer: "<p>",
    hint: "It's a single letter tag.",
  },
  {
    question: "What attribute is used to specify an image source?",
    choices: ["src", "href", "link", "img"],
    answer: "src",
    hint: "Think 'source' abbreviation.",
  },
  {
    question: "Which tag is used for the largest heading?",
    choices: ["<h1>", "<head>", "<header>", "<h6>"],
    answer: "<h1>",
    hint: "It’s the first heading tag.",
  },
  {
    question: "How do you create an unordered list?",
    choices: ["<ul>", "<ol>", "<list>", "<li>"],
    answer: "<ul>",
    hint: "It starts with 'u' for unordered.",
  },
  {
    question: "Which tag encloses the body content?",
    choices: ["<body>", "<content>", "<html>", "<section>"],
    answer: "<body>",
    hint: "It's the main visible content container.",
  },
  {
    question: "What tag would you use for inserting a line break?",
    choices: ["<br>", "<break>", "<lb>", "<line>"],
    answer: "<br>",
    hint: "It's an empty tag with letters 'b' and 'r'.",
  },
  {
    question: "Which attribute controls the text color in HTML?",
    choices: ["color", "text-color", "font-color", "style"],
    answer: "style",
    hint: "It's a global attribute for CSS styles.",
  },
];

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
  backgroundColor: "rgba(20, 20, 60, 0.85)",
  borderRadius: 16,
  padding: "2rem",
  maxWidth: 600,
  width: "100%",
  boxShadow: "0 0 15px rgba(138, 43, 226, 0.7)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  color: "#9370db", // purple
  textAlign: "center",
  textShadow: "0 0 8px #b19cd9",
};

const questionStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  marginBottom: "1rem",
};

const choiceButtonStyle = {
  display: "block",
  width: "100%",
  backgroundColor: "#483d8b", // dark slate blue (blue-purple)
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "0.75rem 1rem",
  margin: "0.4rem 0",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s",
} as React.CSSProperties;

const hintStyle: React.CSSProperties = {
  marginTop: "1rem",
  fontStyle: "italic",
  color: "#ff69b4", // pink hint
  backgroundColor: "rgba(255, 192, 203, 0.2)", // faint pink background
  padding: "0.5rem 1rem",
  borderRadius: 8,
};

const footerStyle: React.CSSProperties = {
  marginTop: "2rem",
  textAlign: "center",
};

const playAgainButtonStyle: React.CSSProperties = {
  backgroundColor: "#20b2aa", // teal
  color: "white",
  border: "none",
  borderRadius: 10,
  padding: "0.75rem 1.5rem",
  cursor: "pointer",
  fontSize: "1.1rem",
  fontWeight: "bold",
  boxShadow: "0 0 8px #20b2aa",
  transition: "background-color 0.3s",
};

const correctStyle: React.CSSProperties = {
  color: "#fffacd", // pale yellow for correct answer feedback
  backgroundColor: "rgba(255, 255, 224, 0.3)",
  padding: "0.5rem 1rem",
  borderRadius: 8,
  marginTop: "1rem",
  fontWeight: "bold",
  textAlign: "center",
};

const incorrectStyle: React.CSSProperties = {
  color: "#ffb347", // orange-yellow for incorrect feedback
  backgroundColor: "rgba(255, 215, 0, 0.15)",
  padding: "0.5rem 1rem",
  borderRadius: 8,
  marginTop: "1rem",
  fontWeight: "bold",
  textAlign: "center",
};

export default function CodeQuestGame() {
  // Set page title
  useEffect(() => {
    document.title = "CodeQuest";
  }, []);

  // Select 3 unique random questions
  const getRandomQuestions = (): Question[] => {
    const shuffled = [...questionsPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  const [questions, setQuestions] = useState<Question[]>(getRandomQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
    null
  );

  const handleAnswer = (choice: string) => {
    if (selectedAnswer) return; // Prevent multiple answers for same question
    setSelectedAnswer(choice);
    if (choice === questions[currentIndex].answer) {
      setScore(score + 1);
      setAnsweredCorrectly(true);
      setShowHint(false);
      // Automatically move to next question after short delay
      setTimeout(() => {
        nextQuestion();
      }, 1500);
    } else {
      setAnsweredCorrectly(false);
      setShowHint(true);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowHint(false);
    setAnsweredCorrectly(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const playAgain = () => {
    setQuestions(getRandomQuestions());
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowHint(false);
    setScore(0);
    setAnsweredCorrectly(null);
  };

  return (
    <div style={gradientBackground}>
      <main style={containerStyle} aria-live="polite">
        <h1 style={titleStyle}>CodeQuest: Learn HTML</h1>

        {currentIndex < questions.length ? (
          <>
            <div style={questionStyle}>
              <strong>
                Question {currentIndex + 1} of {questions.length}
              </strong>
              <p>{questions[currentIndex].question}</p>
            </div>

            <div>
              {questions[currentIndex].choices.map((choice) => {
                const isSelected = selectedAnswer === choice;
                // FIX: Use fallback to avoid undefined error
                let backgroundColor = choiceButtonStyle.backgroundColor ?? "#483d8b";
                if (isSelected) {
                  backgroundColor =
                    answeredCorrectly === true
                      ? "#00bfff" // bright blue for correct
                      : "#ff6347"; // tomato red for incorrect
                }
                return (
                  <button
                    key={choice}
                    onClick={() => handleAnswer(choice)}
                    disabled={!!selectedAnswer && !isSelected}
                    style={{
                      ...choiceButtonStyle,
                      backgroundColor,
                      cursor: selectedAnswer ? "default" : "pointer",
                    }}
                    onMouseOver={(e) => {
                      if (!selectedAnswer) {
                        (e.currentTarget.style.backgroundColor = "#6a5acd");
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!selectedAnswer) {
                        (e.currentTarget.style.backgroundColor = backgroundColor);
                      }
                    }}
                    aria-pressed={isSelected}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {showHint && (
              <div
                role="alert"
                aria-live="assertive"
                style={{
                  ...hintStyle,
                  color: "#20b2aa", // teal hint color for variety
                  backgroundColor: "rgba(32, 178, 170, 0.15)",
                }}
              >
                Hint: {questions[currentIndex].hint}
              </div>
            )}

            {answeredCorrectly === false && (
              <div style={incorrectStyle}>Oops! Try again or use the hint.</div>
            )}

            {answeredCorrectly === true && (
              <div style={correctStyle}>Correct! Moving to next question...</div>
            )}
          </>
        ) : (
          <>
            <div style={{ fontSize: "1.5rem", textAlign: "center" }}>
              🎉 You scored {score} out of {questions.length}!
            </div>
            <div style={footerStyle}>
              <button
                onClick={playAgain}
                style={playAgainButtonStyle}
                aria-label="Play again"
              >
                Play Again
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
