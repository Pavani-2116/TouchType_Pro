import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Flag,
  RotateCcw,
  Target,
} from "lucide-react";

import {
  generateText,
  MODES,
  TIMES,
} from "../data/practice";

import VirtualKeyboard from "../components/VirtualKeyboard";

const KEYS = [
  "a",
  "s",
  "d",
  "f",
  "j",
  "k",
  "l",
  ";",
];

function calculateStats(input, text) {
  const characters = [...input];

  let correct = 0;

  characters.forEach((character, index) => {
    if (character === text[index]) {
      correct++;
    }
  });

  const total = characters.length;

  const wrong = total - correct;

  const accuracy =
    total > 0
      ? Math.round((correct / total) * 100)
      : 100;

  return {
    total,
    correct,
    wrong,
    accuracy,
  };
}

function Practice({ onComplete }) {

  const [mode, setMode] =
    useState("beginner");

  const [level, setLevel] =
    useState(1);

  const [goal, setGoal] =
    useState(5);

  const [started, setStarted] =
    useState(false);

  const [left, setLeft] =
    useState(300);

  const [input, setInput] =
    useState("");

  const [text, setText] =
    useState(() =>
      generateText("beginner", 1)
    );

  const [mistakes, setMistakes] =
    useState({});

  const inputRef =
    useRef(null);

  const inputValueRef =
    useRef("");

  const textRef =
    useRef(text);

  const mistakesRef =
    useRef({});

  const startTimeRef =
    useRef(null);

  const finishingRef =
    useRef(false);

  const stats = useMemo(
    () =>
      calculateStats(
        input,
        text
      ),
    [input, text]
  );

  const elapsedSeconds =
    startTimeRef.current
      ? Math.floor(
          (Date.now() -
            startTimeRef.current) /
            1000
        )
      : 0;

  const usedSeconds =
    Math.min(
      goal * 60,
      elapsedSeconds
    );

  const wpm =
    usedSeconds > 0
      ? Math.round(
          (stats.correct / 5) /
            (usedSeconds / 60)
        )
      : 0;

  const nextKey =
    text[input.length] || "";

  // ----------------------------------
  // FINISH SESSION
  // ----------------------------------

  function finish(reason = "manual") {

    if (
      !started ||
      finishingRef.current
    ) {
      return;
    }

    finishingRef.current = true;

    const latestInput =
      inputValueRef.current;

    const latestText =
      textRef.current;

    const latestMistakes =
      mistakesRef.current;

    const finalStats =
      calculateStats(
        latestInput,
        latestText
      );

    // Don't save empty sessions.
    if (finalStats.total <= 0) {

      setStarted(false);

      setLeft(
        goal * 60
      );

      finishingRef.current =
        false;

      return;
    }

    const duration = Math.max(
      1,
      Math.min(
        goal * 60,
        Math.floor(
          (Date.now() -
            startTimeRef.current) /
            1000
        )
      )
    );

    const finalWpm =
      Math.round(
        (finalStats.correct / 5) /
          (duration / 60)
      ) || 0;

    const result = {

      date:
        new Date().toISOString(),

      mode,

      level,

      goal,

      duration,

      endReason:
        reason,

      total:
        finalStats.total,

      correct:
        finalStats.correct,

      wrong:
        finalStats.wrong,

      accuracy:
        finalStats.accuracy,

      wpm:
        finalWpm,

      mistakes:
        latestMistakes,
    };

    setStarted(false);

    setLeft(
      Math.max(
        0,
        goal * 60 - duration
      )
    );

    onComplete(result);
  }

  // ----------------------------------
  // TIMER
  // ----------------------------------

  useEffect(() => {

    if (!started) {
      return;
    }

    const interval =
      setInterval(() => {

        const elapsed =
          Math.floor(
            (Date.now() -
              startTimeRef.current) /
              1000
          );

        const remaining =
          Math.max(
            0,
            goal * 60 - elapsed
          );

        setLeft(
          remaining
        );

        if (
          remaining <= 0
        ) {
          finish("time");
        }

      }, 250);

    return () =>
      clearInterval(interval);

  }, [started, goal]);

  // ----------------------------------
  // START
  // ----------------------------------

  function startPractice() {

    const newText =
      generateText(
        mode,
        level
      );

    setText(newText);

    textRef.current =
      newText;

    setInput("");

    inputValueRef.current =
      "";

    setMistakes({});

    mistakesRef.current =
      {};

    setLeft(
      goal * 60
    );

    startTimeRef.current =
      Date.now();

    finishingRef.current =
      false;

    setStarted(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }

  // ----------------------------------
  // RESET
  // ----------------------------------

  function resetPractice() {

    setStarted(false);

    setInput("");

    inputValueRef.current =
      "";

    setMistakes({});

    mistakesRef.current =
      {};

    startTimeRef.current =
      null;

    finishingRef.current =
      false;

    setLeft(
      goal * 60
    );
  }

  // ----------------------------------
  // TYPING
  // ----------------------------------

  function handleTyping(event) {

    if (!started) {
      return;
    }

    const value =
      event.target.value.slice(
        0,
        text.length
      );

    const previous =
      inputValueRef.current;

    // New character typed
    if (
      value.length >
      previous.length
    ) {

      const index =
        value.length - 1;

      const expected =
        text[index];

      const actual =
        value[index];

      if (
        expected &&
        actual !== expected
      ) {

        const updatedMistakes =
          {
            ...mistakesRef.current,
            [expected]:
              (mistakesRef.current[
                expected
              ] || 0) + 1,
          };

        mistakesRef.current =
          updatedMistakes;

        setMistakes(
          updatedMistakes
        );
      }
    }

    inputValueRef.current =
      value;

    setInput(value);
  }

  // ----------------------------------
  // ERROR TABLE
  // ----------------------------------

  const errorRows =
    KEYS.map((key) => ({
      key,
      count:
        mistakes[key] || 0,
    }));

  // ----------------------------------
  // SETUP SCREEN
  // ----------------------------------

  if (!started && input.length === 0) {

    return (
      <main className="page">

        <section className="practice-head">

          <div>
            <span>
              TIMED PRACTICE
            </span>

            <h1>
              Make your typing
              goal count.
            </h1>
          </div>

          <div className="pill">
            <Target size={15} />

            Goal:
            {" "}
            {goal} min
          </div>

        </section>

        <section className="setup card">

          <h2>
            Choose your practice goal
          </h2>

          <p className="muted">
            5 minutes is the default.
            Choose a shorter session
            for quick practice or a
            longer session for deeper
            training.
          </p>

          <label>
            Goal time
          </label>

          <div className="options">

            {TIMES.map((time) => (

              <button
                key={time}
                className={
                  goal === time
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setGoal(time)
                }
              >
                {time} min
              </button>

            ))}

          </div>

          <label>
            Practice mode
          </label>

          <div className="mode-grid">

            {Object.entries(
              MODES
            ).map(
              ([id, modeInfo]) => (

                <button
                  key={id}
                  className={
                    mode === id
                      ? "mode selected"
                      : "mode"
                  }
                  onClick={() =>
                    setMode(id)
                  }
                >

                  <strong>
                    {modeInfo.icon}
                    {" "}
                    {modeInfo.name}
                  </strong>

                  <small>
                    {
                      modeInfo.description
                    }
                  </small>

                </button>
              )
            )}

          </div>

          <label>
            Difficulty
          </label>

          <div className="options">

            {[1, 2, 3, 4].map(
              (number) => (

                <button
                  key={number}
                  className={
                    level === number
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setLevel(number)
                  }
                >
                  Level {number}
                </button>

              )
            )}

          </div>

          <button
            className="primary wide"
            onClick={
              startPractice
            }
          >
            Start {goal}-minute
            practice
          </button>

        </section>

      </main>
    );
  }

  // ----------------------------------
  // PRACTICE SCREEN
  // ----------------------------------

  return (

    <main className="page">

      <div className="stats">

        <div>
          <small>
            Time
          </small>

          <b>
            {Math.floor(
              left / 60
            )}
            :
            {String(
              left % 60
            ).padStart(2, "0")}
          </b>
        </div>

        <div>
          <small>
            Keys pressed
          </small>

          <b>
            {stats.total}
          </b>
        </div>

        <div>
          <small>
            Correct
          </small>

          <b className="good">
            {stats.correct}
          </b>
        </div>

        <div>
          <small>
            Incorrect
          </small>

          <b className="bad">
            {stats.wrong}
          </b>
        </div>

        <div>
          <small>
            Accuracy
          </small>

          <b>
            {stats.accuracy}%
          </b>
        </div>

        <div>
          <small>
            WPM
          </small>

          <b>
            {wpm}
          </b>
        </div>

      </div>

      <div className="practice-grid">

        <section className="card typing">

          <div className="row">

            <div>

              <small>
                {MODES[mode].name}
                {" "}
                • Level {level}
              </small>

              <h2>
                Type the highlighted
                sequence
              </h2>

            </div>

            <div className="practice-actions">

              <button
                className="reset-btn"
                onClick={
                  resetPractice
                }
              >
                <RotateCcw size={15} />
                Reset
              </button>

              <button
                className="finish"
                onClick={() =>
                  finish("manual")
                }
              >
                <Flag size={15} />
                Stop & see results
              </button>

            </div>

          </div>

          {/* TIME PROGRESS */}

          <div className="live-progress">

            <div>

              <span>
                Goal progress
              </span>

              <b>
                {Math.round(
                  (usedSeconds /
                    (goal * 60)) *
                    100
                )}
                %
              </b>

            </div>

            <div className="progress-track">

              <i
                style={{
                  width: `${Math.min(
                    100,
                    (usedSeconds /
                      (goal * 60)) *
                      100
                  )}%`,
                }}
              />

            </div>

          </div>

          {/* TEXT */}

          <div className="text">

            {[
              ...text.slice(
                0,
                Math.max(
                  250,
                  input.length + 120
                )
              ),
            ].map(
              (character, index) => {

                let className = "";

                if (
                  index <
                  input.length
                ) {

                  className =
                    input[index] ===
                    character
                      ? "correct"
                      : "wrong";

                } else if (
                  index ===
                  input.length
                ) {

                  className =
                    "current";
                }

                return (
                  <span
                    key={index}
                    className={
                      className
                    }
                  >
                    {character}
                  </span>
                );
              }
            )}

          </div>

          {/* INPUT */}

          <textarea
            ref={inputRef}
            value={input}
            onChange={
              handleTyping
            }
            autoFocus
            spellCheck="false"
            placeholder="Start typing here..."
          />

          {/* KEYBOARD */}

          <VirtualKeyboard
            nextKey={nextKey}
          />

          {/* LIVE INFORMATION */}

          <div className="live-feedback">

            <div>
              <span>
                Next key
              </span>

              <b>
                {nextKey
                  ? nextKey.toUpperCase()
                  : "Done"}
              </b>
            </div>

            <div>
              <span>
                Correct
              </span>

              <b className="good">
                {stats.correct}
              </b>
            </div>

            <div>
              <span>
                Incorrect
              </span>

              <b className="bad">
                {stats.wrong}
              </b>
            </div>

            <div>
              <span>
                Accuracy
              </span>

              <b>
                {stats.accuracy}%
              </b>
            </div>

          </div>

          <p className="tip">
            You can stop at any time.
            Your current progress,
            correct keys, incorrect
            keys and mistakes will be
            calculated immediately.
          </p>

        </section>

        {/* RIGHT SIDE */}

        <aside className="card side">

          <small>
            YOUR GOAL
          </small>

          <strong className="goal-num">
            {goal}
            <i>
              min
            </i>
          </strong>

          <small>
            TIME USED
          </small>

          <div className="side-time">
            {Math.floor(
              usedSeconds / 60
            )}
            :
            {String(
              usedSeconds % 60
            ).padStart(2, "0")}
          </div>

          <small>
            NEXT KEY
          </small>

          <div className="next">
            {nextKey
              ? nextKey.toUpperCase()
              : "—"}
          </div>

          <small>
            INCORRECT BY LETTER
          </small>

          <div className="all-key-errors">

            {errorRows.map(
              ({ key, count }) => (

                <div
                  key={key}
                  className={
                    count
                      ? "error-key has-error"
                      : "error-key"
                  }
                >

                  <span>
                    {
                      key === ";"
                        ? ";"
                        : key.toUpperCase()
                    }
                  </span>

                  <b>
                    {count}
                  </b>

                </div>
              )
            )}

          </div>

        </aside>

      </div>

    </main>
  );
}

export default Practice;