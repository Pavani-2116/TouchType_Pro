import React from "react";
import Statistics from "../components/Statistics";

function Home({ navigate }) {
  // Default statistics for a new user
  const stats = {
    total: 0,
    correct: 0,
    wrong: 0,
    accuracy: 0,
    wpm: 0,
  };

  const features = [
    {
      icon: "⌨️",
      title: "8-Key Focus",
      description:
        "Practice only the home-row keys ASDF JKL; and build strong finger memory.",
    },
    {
      icon: "🎯",
      title: "Accuracy First",
      description:
        "Track correct and incorrect keystrokes so you can improve your typing accuracy.",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description:
        "View your practice sessions, accuracy, WPM, mistakes, streaks and improvement.",
    },
    {
      icon: "🏆",
      title: "Badges & Streaks",
      description:
        "Stay motivated by building daily streaks and unlocking typing achievements.",
    },
  ];

  return (
    <main className="home-page">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            ⌨️ Touch Typing Practice
          </div>

          <h1>
            Master the
            <span> Home Row </span>
            Keys
          </h1>

          <p className="hero-description">
            Improve your typing speed, accuracy and finger memory by practicing
            the essential home-row keys:
          </p>

          <div className="hero-keys">
            <span>A</span>
            <span>S</span>
            <span>D</span>
            <span>F</span>
            <span>J</span>
            <span>K</span>
            <span>L</span>
            <span>;</span>
          </div>

          <p className="hero-subtitle">
            Learn the correct finger position. Practice consistently.
            Type confidently.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onClick={() => navigate("practice")}
            >
              Start Practice →
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("learn")}
            >
              Learn Finger Positions
            </button>
          </div>
        </div>

        {/* Keyboard visual */}
        <div className="hero-keyboard">
          <div className="keyboard-title">
            Your Home Row
          </div>

          <div className="keyboard-row">
            <div className="keyboard-key">A</div>
            <div className="keyboard-key">S</div>
            <div className="keyboard-key">D</div>
            <div className="keyboard-key home-key">F</div>

            <div className="keyboard-gap"></div>

            <div className="keyboard-key home-key">J</div>
            <div className="keyboard-key">K</div>
            <div className="keyboard-key">L</div>
            <div className="keyboard-key">;</div>
          </div>

          <div className="finger-labels">
            <span>Left Hand</span>
            <span>Right Hand</span>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="home-statistics">
        <div className="section-heading">
          <span className="section-label">YOUR PERFORMANCE</span>

          <h2>
            Start your typing journey
          </h2>

          <p>
            Your statistics will appear here after your first practice
            session.
          </p>
        </div>

        <Statistics
          total={stats.total}
          correct={stats.correct}
          wrong={stats.wrong}
          accuracy={stats.accuracy}
          wpm={stats.wpm}
        />
      </section>

      {/* ================= QUICK ACTIONS ================= */}
      <section className="quick-actions">
        <div className="quick-card">
          <div className="quick-icon">📖</div>

          <div>
            <h3>New to touch typing?</h3>
            <p>
              Learn which finger should press each home-row key before
              starting your practice.
            </p>
          </div>

          <button
            className="outline-button"
            onClick={() => navigate("learn")}
          >
            Learn →
          </button>
        </div>

        <div className="quick-card">
          <div className="quick-icon">⚡</div>

          <div>
            <h3>Ready to practice?</h3>
            <p>
              Choose your practice duration and start improving your typing
              speed and accuracy.
            </p>
          </div>

          <button
            className="outline-button"
            onClick={() => navigate("practice")}
          >
            Practice →
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features-section">
        <div className="section-heading center">
          <span className="section-label">WHY TOUCHTYPE?</span>

          <h2>
            Everything you need to improve
          </h2>

          <p>
            A simple typing trainer focused on building real muscle memory.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <div
              className="feature-card"
              key={feature.title}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how-section">
        <div className="section-heading center">
          <span className="section-label">HOW IT WORKS</span>

          <h2>Three simple steps</h2>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>

            <h3>Learn</h3>

            <p>
              Understand the correct finger position for A, S, D, F,
              J, K, L and ;.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step-card">
            <div className="step-number">02</div>

            <h3>Practice</h3>

            <p>
              Type the highlighted keys and receive real-time feedback
              about your accuracy.
            </p>
          </div>

          <div className="step-line"></div>

          <div className="step-card">
            <div className="step-number">03</div>

            <h3>Improve</h3>

            <p>
              Check your mistakes, WPM, accuracy and progress after every
              session.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="final-cta">
        <div className="cta-content">
          <span className="cta-icon">⌨️</span>

          <h2>
            Ready to improve your typing?
          </h2>

          <p>
            Start with just a few minutes of focused practice every day.
          </p>

          <button
            className="primary-button large"
            onClick={() => navigate("practice")}
          >
            Start Typing Practice →
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;