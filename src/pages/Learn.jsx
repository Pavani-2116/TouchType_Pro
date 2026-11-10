const keys = [
  {
    key: "A",
    finger: "Left Pinky",
    tip: "Keep your pinky relaxed and return it to the home position.",
  },
  {
    key: "S",
    finger: "Left Ring",
    tip: "Move only the ring finger. Keep the other fingers stable.",
  },
  {
    key: "D",
    finger: "Left Middle",
    tip: "Use your middle finger without looking at the keyboard.",
  },
  {
    key: "F",
    finger: "Left Index",
    tip: "F is an important anchor key for the left hand.",
  },
  {
    key: "J",
    finger: "Right Index",
    tip: "J is the main anchor key for the right hand.",
  },
  {
    key: "K",
    finger: "Right Middle",
    tip: "Keep your wrist straight while reaching for K.",
  },
  {
    key: "L",
    finger: "Right Ring",
    tip: "Use the ring finger instead of moving your whole hand.",
  },
  {
    key: ";",
    finger: "Right Pinky",
    tip: "Practice this key slowly because it is often harder to reach.",
  },
];

function Learn({ navigate }) {
  return (
    <main className="page">

      <section className="intro">
        <span>LEARN</span>

        <h1>
          Master the home row.
        </h1>

        <p>
          These eight keys are the foundation
          of touch typing in TouchType Pro.
        </p>
      </section>

      <section className="learn-grid">

        {keys.map((item) => (
          <div
            className="learn-card"
            key={item.key}
          >
            <div className="learn-key">
              {item.key}
            </div>

            <div>
              <h3>{item.finger}</h3>

              <p>{item.tip}</p>
            </div>
          </div>
        ))}

      </section>

      <section className="learn-tip">

        <h2>Remember this rule</h2>

        <p>
          Don't chase speed first.
          Build correct finger movement,
          then speed will naturally improve.
        </p>

        <button
          className="primary"
          onClick={() => navigate("practice")}
        >
          Start Practice
        </button>

      </section>

    </main>
  );
}

export default Learn;