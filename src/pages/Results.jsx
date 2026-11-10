import React from "react";

function Results({ result, navigate }) {
  if (!result) {
    return (
      <main className="results-page">
        <div className="results-empty">
          <h1>No Practice Results Yet</h1>

          <p>
            Complete a typing session to see your performance here.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("practice")}
          >
            Start Practice →
          </button>
        </div>
      </main>
    );
  }

  const total = Number(result.total) || 0;
  const correct = Number(result.correct) || 0;
  const wrong = Number(result.wrong) || 0;
  const accuracy = Number(result.accuracy) || 0;
  const wpm = Number(result.wpm) || 0;

  const duration = Number(result.duration) || 0;
  const elapsed = Number(result.elapsed) || duration;

  const mistakes = result.mistakes || {};

  const sortedMistakes = Object.entries(mistakes)
    .filter(([, count]) => Number(count) > 0)
    .sort((a, b) => Number(b[1]) - Number(a[1]));

  const weakKeys = sortedMistakes.slice(0, 3);

  const formatTime = (seconds) => {
    const safeSeconds = Math.max(0, Number(seconds) || 0);

    const minutes = Math.floor(safeSeconds / 60);

    const remainingSeconds = safeSeconds % 60;

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const getAccuracyMessage = () => {
    if (accuracy < 70) {
      return {
        title: "Accuracy needs attention",
        message:
          "Slow down and focus on pressing the correct key. Speed will improve naturally after your accuracy becomes consistent.",
      };
    }

    if (accuracy < 80) {
      return {
        title: "Good start — focus on accuracy",
        message:
          "Try typing a little slower. Your next goal should be fewer mistakes rather than higher speed.",
      };
    }

    if (accuracy < 90) {
      return {
        title: "You're improving!",
        message:
          "Your accuracy is getting better. Identify your most-missed keys and practice them repeatedly.",
      };
    }

    if (accuracy < 95) {
      return {
        title: "Very good accuracy!",
        message:
          "You have good control. Now gradually increase your speed while keeping your accuracy above 90%.",
      };
    }

    return {
      title: "Excellent accuracy!",
      message:
        "Your accuracy is strong. You can now focus on gradually increasing your typing speed.",
    };
  };

  const getKeyTip = (key) => {
    const tips = {
      a: "Keep your left pinky relaxed and return it to the A position after each press.",
      s: "Use your left ring finger and avoid moving your whole hand toward S.",
      d: "Use your left middle finger and return your hand to the home position.",
      f: "Use your left index finger. Feel the small bump on F to find your position without looking.",
      j: "Use your right index finger. Feel the small bump on J to locate the home position.",
      k: "Use your right middle finger and keep your right hand stable.",
      l: "Use your right ring finger instead of moving your entire hand.",
      ";": "Use your right pinky and keep the rest of your right hand in the home position.",
    };

    return (
      tips[key.toLowerCase()] ||
      "Practice this key slowly and repeatedly until the movement becomes automatic."
    );
  };

  const accuracyAdvice = getAccuracyMessage();

  return (
    <main className="results-page">
      {/* ================= HEADER ================= */}

      <section className="results-header">
        <span className="section-label">
          PRACTICE COMPLETE
        </span>

        <h1>Your Typing Results</h1>

        <p>
          Here's a detailed look at your performance.
        </p>
      </section>

      {/* ================= MAIN SCORE ================= */}

      <section className="result-score-card">
        <div className="score-circle">
          <strong>{accuracy}%</strong>

          <span>Accuracy</span>
        </div>

        <div className="score-message">
          <h2>{accuracyAdvice.title}</h2>

          <p>{accuracyAdvice.message}</p>

          <div className="result-meta">
            <span>
              ⏱ Time: {formatTime(elapsed)}
            </span>

            <span>
              🎯 Target: {formatTime(duration)}
            </span>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}

      <section className="result-statistics">
        <div className="result-stat-card">
          <small>Keys Pressed</small>
          <strong>{total}</strong>
        </div>

        <div className="result-stat-card">
          <small>Correct</small>
          <strong>{correct}</strong>
        </div>

        <div className="result-stat-card">
          <small>Incorrect</small>
          <strong>{wrong}</strong>
        </div>

        <div className="result-stat-card">
          <small>Accuracy</small>
          <strong>{accuracy}%</strong>
        </div>

        <div className="result-stat-card">
          <small>WPM</small>
          <strong>{wpm}</strong>
        </div>
      </section>

      {/* ================= WEAK KEYS ================= */}

      <section className="mistakes-section">
        <div className="section-heading">
          <span className="section-label">
            MISTAKE ANALYSIS
          </span>

          <h2>Your Weak Keys</h2>

          <p>
            Focus on these keys during your next practice session.
          </p>
        </div>

        {weakKeys.length === 0 ? (
          <div className="no-mistakes">
            <div className="success-icon">✓</div>

            <h3>No mistakes recorded!</h3>

            <p>
              Excellent work. Keep practicing to maintain your
              accuracy.
            </p>
          </div>
        ) : (
          <div className="mistake-list">
            {weakKeys.map(([key, count], index) => (
              <div
                className="mistake-card"
                key={key}
              >
                <div className="mistake-rank">
                  #{index + 1}
                </div>

                <div className="mistake-key">
                  {key === " " ? "SPACE" : key.toUpperCase()}
                </div>

                <div className="mistake-details">
                  <strong>
                    {count} mistake{count !== 1 ? "s" : ""}
                  </strong>

                  <p>{getKeyTip(key)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= ALL MISTAKES ================= */}

      {sortedMistakes.length > 0 && (
        <section className="all-mistakes-section">
          <div className="section-heading">
            <span className="section-label">
              KEY BREAKDOWN
            </span>

            <h2>All Incorrect Keys</h2>
          </div>

          <div className="mistake-table">
            {sortedMistakes.map(([key, count]) => (
              <div
                className="mistake-row"
                key={key}
              >
                <span className="mistake-letter">
                  {key.toUpperCase()}
                </span>

                <div className="mistake-bar-container">
                  <div
                    className="mistake-bar"
                    style={{
                      width: `${Math.min(
                        100,
                        (Number(count) /
                          Number(sortedMistakes[0][1])) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>

                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= IMPROVEMENT PLAN ================= */}

      <section className="improvement-section">
        <div className="section-heading">
          <span className="section-label">
            PERSONALIZED TIPS
          </span>

          <h2>How to improve</h2>
        </div>

        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">🎯</span>

            <h3>Focus on accuracy</h3>

            <p>
              Aim for 90%+ accuracy before trying to type much
              faster.
            </p>
          </div>

          <div className="tip-card">
            <span className="tip-icon">🐢</span>

            <h3>Slow down</h3>

            <p>
              If you make many mistakes, reduce your speed and
              concentrate on the correct finger movement.
            </p>
          </div>

          <div className="tip-card">
            <span className="tip-icon">⌨️</span>

            <h3>Use the home position</h3>

            <p>
              Keep your fingers positioned around ASDF and JKL;
              instead of moving your hands around.
            </p>
          </div>

          <div className="tip-card">
            <span className="tip-icon">🔁</span>

            <h3>Practice consistently</h3>

            <p>
              Short daily sessions are better than one long
              session once in a while.
            </p>
          </div>
        </div>
      </section>

      {/* ================= NEXT GOAL ================= */}

      <section className="next-goal">
        <div>
          <span className="section-label">
            NEXT GOAL
          </span>

          {accuracy < 90 ? (
            <>
              <h2>Reach 90% accuracy</h2>

              <p>
                Keep practicing slowly and concentrate on your
                weak keys.
              </p>
            </>
          ) : wpm < 20 ? (
            <>
              <h2>Reach 20 WPM</h2>

              <p>
                Your accuracy is good. Now gradually increase
                your typing speed.
              </p>
            </>
          ) : (
            <>
              <h2>Push your speed higher</h2>

              <p>
                Maintain your accuracy while gradually increasing
                your WPM.
              </p>
            </>
          )}
        </div>

        <div className="goal-value">
          {accuracy < 90
            ? `${accuracy}% → 90%`
            : `${wpm} → ${Math.max(20, wpm + 5)} WPM`}
        </div>
      </section>

      {/* ================= ACTIONS ================= */}

      <section className="results-actions">
        <button
          className="primary-button"
          onClick={() => navigate("practice")}
        >
          Practice Again →
        </button>

        <button
          className="secondary-button"
          onClick={() => navigate("progress")}
        >
          View Progress
        </button>

        <button
          className="text-button"
          onClick={() => navigate("home")}
        >
          Back to Home
        </button>
      </section>
    </main>
  );
}

export default Results;