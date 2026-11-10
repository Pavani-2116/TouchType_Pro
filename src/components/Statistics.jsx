import React from "react";

function Statistics({
  total = 0,
  correct = 0,
  wrong = 0,
  accuracy = 0,
  wpm = 0,
}) {
  const items = [
    {
      label: "Keys pressed",
      value: total,
    },
    {
      label: "Correct",
      value: correct,
    },
    {
      label: "Incorrect",
      value: wrong,
    },
    {
      label: "Accuracy",
      value: `${accuracy}%`,
    },
    {
      label: "WPM",
      value: wpm,
    },
  ];

  return (
    <div className="stats">
      {items.map((item) => (
        <div className="stat-card" key={item.label}>
          <small>{item.label}</small>

          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export default Statistics;