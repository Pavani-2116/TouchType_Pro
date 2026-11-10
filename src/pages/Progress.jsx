import {
  Award,
  Flame,
  Gauge,
  Keyboard,
  Target,
  CalendarDays,
} from "lucide-react";

import {
  calculateProgress,
  clearHistory,
  getHistory,
} from "../utils/storage";

import { useState } from "react";

const badgeRules = [
  {
    icon: "🌱",
    name: "First Session",
    description:
      "Complete your first practice.",
    check: (history) =>
      history.length >= 1,
  },

  {
    icon: "🎯",
    name: "Accuracy Master",
    description:
      "Reach 95% accuracy.",
    check: (history) =>
      history.some(
        (item) =>
          item.accuracy >= 95
      ),
  },

  {
    icon: "🛡️",
    name: "Clean Typist",
    description:
      "90%+ accuracy with 20+ keys.",
    check: (history) =>
      history.some(
        (item) =>
          item.accuracy >= 90 &&
          item.total >= 20
      ),
  },

  {
    icon: "⚡",
    name: "Speed Builder",
    description:
      "Reach 30 WPM.",
    check: (history) =>
      history.some(
        (item) =>
          item.wpm >= 30
      ),
  },

  {
    icon: "🔥",
    name: "100-Key Session",
    description:
      "Type 100+ keys in one session.",
    check: (history) =>
      history.some(
        (item) =>
          item.total >= 100
      ),
  },

  {
    icon: "📅",
    name: "3-Day Streak",
    description:
      "Practice on 3 consecutive days.",
    check: () =>
      calculateProgress()
        .streak >= 3,
  },
];

function Progress() {

  const [
    history,
    setHistory,
  ] = useState(
    getHistory()
  );

  const stats =
    calculateProgress();

  const badges =
    badgeRules.map(
      (badge) => ({
        ...badge,
        earned:
          badge.check(
            history
          ),
      })
    );

  function handleClear() {

    const confirmed =
      window.confirm(
        "Are you sure you want to clear all practice history?"
      );

    if (!confirmed) {
      return;
    }

    clearHistory();

    setHistory([]);
  }

  return (

    <main className="page">

      <section className="intro">

        <span>
          PROGRESS
        </span>

        <h1>
          Your practice history,
          in one place.
        </h1>

        <p>
          Results are saved locally
          in this browser.
          No account is required.
        </p>

      </section>

      {/* STATS */}

      <div className="metric-grid">

        <div>
          <Gauge />

          <small>
            Best WPM
          </small>

          <b>
            {stats.bestWpm}
          </b>
        </div>

        <div>
          <Target />

          <small>
            Best accuracy
          </small>

          <b>
            {stats.bestAccuracy}%
          </b>
        </div>

        <div>
          <Keyboard />

          <small>
            Total keys
          </small>

          <b>
            {stats.totalKeys}
          </b>
        </div>

        <div>
          <Flame />

          <small>
            Streak
          </small>

          <b>
            {stats.streak}
            {" "}
            day
            {stats.streak === 1
              ? ""
              : "s"}
          </b>
        </div>

      </div>

      {/* BADGES */}

      <section className="card badges-panel">

        <div className="section-row">

          <div>

            <h2>
              Achievement badges
            </h2>

            <p className="muted">
              Badges are based on
              your real practice.
            </p>

          </div>

          <Award />

        </div>

        <div className="badge-grid">

          {badges.map(
            (badge) => (

              <div
                className={
                  badge.earned
                    ? "progress-badge earned"
                    : "progress-badge"
                }
                key={badge.name}
              >

                <span>
                  {badge.icon}
                </span>

                <div>

                  <strong>
                    {badge.name}
                  </strong>

                  <small>
                    {badge.description}
                  </small>

                </div>

              </div>

            )
          )}

        </div>

      </section>

      {/* HISTORY */}

      <section className="card">

        <div className="row">

          <div>

            <h2>
              Recent sessions
            </h2>

            <p className="muted">
              <CalendarDays size={14} />
              Your completed and
              early-stopped sessions
              appear here.
            </p>

          </div>

          {history.length > 0 && (

            <button
              className="clear"
              onClick={
                handleClear
              }
            >
              Clear
            </button>

          )}

        </div>

        {history.length > 0 ? (

          <div className="history">

            {history.map(
              (session) => (

                <div
                  className="history-row"
                  key={session.date}
                >

                  <span>
                    {new Date(
                      session.date
                    ).toLocaleDateString()}
                  </span>

                  <span>
                    {session.mode}
                  </span>

                  <span>
                    {session.goal}
                    {" "}min
                  </span>

                  <b>
                    {session.wpm}
                    {" "}WPM
                  </b>

                  <b>
                    {session.accuracy}%
                  </b>

                  <span>
                    {session.total}
                    {" "}keys
                  </span>

                </div>

              )
            )}

          </div>

        ) : (

          <div className="empty-history">

            <h3>
              No practice sessions yet.
            </h3>

            <p>
              Complete your first session
              and your progress will appear
              here.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

export default Progress;