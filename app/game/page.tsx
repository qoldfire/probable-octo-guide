"use client";

import React, { useState, useEffect, useRef } from "react";

type Question = {
  id: number;
  type: "multiple-choice" | "text";
  question: string;
  choices?: string[];
  answer: string;
  hint: string;
};

const questionsPool: Question[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What do we use HTML for?",
    choices: ["Making websites", "Playing games", "Watching videos", "Listening to music"],
    answer: "Making websites",
    hint: "Think about what you see when you visit a webpage.",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "Which tag makes a link?",
    choices: ["<a>", "<b>", "<p>", "<img>"],
    answer: "<a>",
    hint: "It’s the tag that ‘anchors’ you to another page.",
  },
  {
    id: 3,
    type: "text",
    question: "How do you write a comment in HTML? (Type the comment tags)",
    answer: "<!-- -->",
    hint: "It starts with '<!', includes dashes, and ends with '>'.",
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Which tag makes a paragraph?",
    choices: ["<p>", "<h1>", "<div>", "<span>"],
    answer: "<p>",
    hint: "This tag is a single letter, used for blocks of text.",
  },
  {
    id: 5,
    type: "text",
    question: "What attribute tells where an image is? (Type the attribute name)",
    answer: "src",
    hint: "It’s short for the word ‘source’.",
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "Which tag makes the biggest heading?",
    choices: ["<h1>", "<h2>", "<h3>", "<h4>"],
    answer: "<h1>",
    hint: "The smallest number means the largest heading.",
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "Which tag makes a bullet list?",
    choices: ["<ul>", "<ol>", "<li>", "<dl>"],
    answer: "<ul>",
    hint: "The letter ‘u’ stands for unordered.",
  },
  {
    id: 8,
    type: "text",
    question: "What tag contains the main content? (Type the tag)",
    answer: "<body>",
    hint: "Think of the main ‘body’ of the webpage.",
  },
  {
    id: 9,
    type: "multiple-choice",
    question: "Which tag breaks a line?",
    choices: ["<br>", "<hr>", "<div>", "<span>"],
    answer: "<br>",
    hint: "Two letters, often used to ‘break’ text lines.",
  },
  {
    id: 10,
    type: "text",
    question: "Which attribute changes color using CSS? (Type attribute name)",
    answer: "style",
    hint: "You use this to add inline CSS styles.",
  },
];

// Styles with animations
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
  overflow: "hidden",
  position: "relative",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  color: "#9370db",
  textAlign: "center",
  textShadow: "0 0 12px #b19cd9",
  userSelect: "none",
};

const questionStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  marginBottom: "1rem",
  opacity: 1,
  transition: "opacity 0.5s ease-in-out",
};

const questionFadingOut: React.CSSProperties = {
  opacity: 0,
  transition: "opacity 0.5s ease-in-out",
};

const choiceButtonStyle = {
  display: "block",
  width: "100%",
  backgroundColor: "#483d8b",
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "0.75rem 1rem",
  margin: "0.4rem 0",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s, transform 0.2s",
  userSelect: "none",
} as React.CSSProperties;

const hintStyle: React.CSSProperties = {
  marginTop: "1rem",
  fontStyle: "italic",
  color: "#ff69b4",
  backgroundColor: "rgba(255, 192, 203, 0.15)",
  padding: "0.5rem 1rem",
  borderRadius: 8,
  opacity: 0,
  animation: "fadeInHint 0.8s forwards",
};

const footerStyle: React.CSSProperties = {
  marginTop: "2rem",
  textAlign: "center",
};

const playAgainButtonStyle: React.CSSProperties = {
  backgroundColor: "#20b2aa",
  color: "white",
  border: "none",
  borderRadius: 10,
  padding: "0.75rem 1.5rem",
  cursor: "pointer",
  fontSize: "1.1rem",
  fontWeight: "bold",
  boxShadow: "0 0 10px #20b2aa",
  transition: "background-color 0.3s, transform 0.2s",
  userSelect: "none",
};

const correctStyle: React.CSSProperties = {
  color: "#fffacd",
  backgroundColor: "rgba(255, 255, 224, 0.4)",
  padding: "0.5rem 1rem",
  borderRadius: 8,
  marginTop: "1rem",
  fontWeight: "bold",
  textAlign: "center",
  animation: "fadeInFeedback 0.6s forwards",
};

const incorrectStyle: React.CSSProperties = {
  color: "#ffb347",
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  padding: "0.5rem 1rem",
  borderRadius: 8,
  marginTop: "1rem",
  fontWeight: "bold",
  textAlign: "center",
  animation: "fadeInFeedback 0.6s forwards",
};

// Keyframes as a style tag since React inline doesn't support them
const styleTag = (
  <style>{`
    @keyframes fadeInHint {
      to {opacity: 1;}
    }
    @keyframes fadeInFeedback {
      from {opacity: 0;}
      to {opacity: 1;}
    }
  `}</style>
);

export default function CodeQuestGame() {
  useEffect(() => {
    document.title = "CodeQuest";
  }, []);

  const getRandomQuestions = (): Question[] => {
    const shuffled = [...questionsPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  const [questions, setQuestions] = useState<Question[]>(getRandomQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const normalize = (text: string) =>
    text.trim().toLowerCase().replace(/\s+/g, "");

  const handleAnswer = (choice?: string) => {
    if (selectedAnswer || answeredCorrectly === true) return;

    let userAnswer = "";
    if (questions[currentIndex].type === "multiple-choice") {
      if (!choice) return;
      userAnswer = choice;
    } else {
      userAnswer = typedAnswer;
    }

    if (normalize(userAnswer) === normalize(questions[currentIndex].answer)) {
      setScore((s) => s + 1);
      setAnsweredCorrectly(true);
      setShowHint(false);
      setSelectedAnswer(userAnswer);

      setTimeout(() => {
        transitionNextQuestion();
      }, 1500);
    } else {
      setAnsweredCorrectly(false);
      setShowHint(true);
      if (questions[currentIndex].type === "multiple-choice") {
        setSelectedAnswer(userAnswer);
      }
    }
  };

  const transitionNextQuestion = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedAnswer(null);
      setTypedAnswer("");
      setShowHint(false);
      setAnsweredCorrectly(null);
      setCurrentIndex((i) => i + 1);
      setIsTransitioning(false);
      if (questions[currentIndex + 1]?.type === "text") {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }, 500);
  };

  const playAgain = () => {
    setQuestions(getRandomQuestions());
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTypedAnswer("");
    setShowHint(false);
    setScore(0);
    setAnsweredCorrectly(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div style={gradientBackground}>
      {styleTag}
      <main style={containerStyle} aria-live="polite">
        <h1 style={titleStyle}>CodeQuest: Learn HTML</h1>

        {currentIndex < questions.length ? (
          <>
            <div style={isTransitioning ? questionFadingOut : questionStyle}>
              <strong>
                Question {currentIndex + 1} of {questions.length}
              </strong>
              <p>{questions[currentIndex].question}</p>
            </div>

            {questions[currentIndex].type === "multiple-choice" ? (
              <div>
                {questions[currentIndex].choices!.map((choice) => {
                  const isSelected = selectedAnswer === choice;
                  let backgroundColor = choiceButtonStyle.backgroundColor ?? "#483d8b";
                  if (isSelected) {
                    backgroundColor =
                      answeredCorrectly === true
                        ? "#00bfff"
                        : "#ff6347";
                  }
                  return (
                    <button
                      key={choice}
                      onClick={() => handleAnswer(choice)}
                      disabled={!!selectedAnswer && !isSelected}
                      style={{
                        ...choiceButtonStyle,
                        backgroundColor,
                      }}
                      onMouseEnter={(e) => {
                        if (!selectedAnswer) {
                          e.currentTarget.style.backgroundColor = "#6a5acd";
                          e.currentTarget.style.transform = "scale(1.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selectedAnswer) {
                          e.currentTarget.style.backgroundColor = backgroundColor;
                          e.currentTarget.style.transform = "scale(1)";
                        }
                      }}
                      aria-pressed={isSelected}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAnswer();
                }}
                style={{ marginTop: "1rem" }}
                noValidate
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder="Type your answer here"
                  disabled={answeredCorrectly === true}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: 8,
                    border: "none",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    backgroundColor: "#483d8b", // Dark purple-blue background
                    color: "white",              // White text for visibility
                    outline: "none",
                  }}
                  aria-label="Type your answer"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!typedAnswer.trim() || answeredCorrectly === true}
                  style={{
                    marginTop: "0.75rem",
                    ...playAgainButtonStyle,
                    width: "100%",
                  }}
                >
                  Submit
                </button>
              </form>
            )}

            {showHint && (
              <div role="alert" aria-live="assertive" style={hintStyle}>
                Hint: {questions[currentIndex].hint}
              </div>
            )}

            {answeredCorrectly === false && (
              <div style={incorrectStyle}>Oops! Try again or use the hint.</div>
            )}

            {answeredCorrectly === true && currentIndex < questions.length - 1 && (
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
                autoFocus
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#3ebebe";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#20b2aa";
                  e.currentTarget.style.transform = "scale(1)";
                }}
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
