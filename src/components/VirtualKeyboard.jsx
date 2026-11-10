import React from "react";

function VirtualKeyboard({
  activeKey = "",
  pressedKey = "",
  incorrectKey = "",
}) {
  const keys = [
    {
      key: "a",
      label: "A",
      finger: "Left Pinky",
    },
    {
      key: "s",
      label: "S",
      finger: "Left Ring",
    },
    {
      key: "d",
      label: "D",
      finger: "Left Middle",
    },
    {
      key: "f",
      label: "F",
      finger: "Left Index",
    },
    {
      key: "j",
      label: "J",
      finger: "Right Index",
    },
    {
      key: "k",
      label: "K",
      finger: "Right Middle",
    },
    {
      key: "l",
      label: "L",
      finger: "Right Ring",
    },
    {
      key: ";",
      label: ";",
      finger: "Right Pinky",
    },
  ];

  return (
    <div className="virtual-keyboard">
      <div className="keyboard-heading">
        <span>Home Row</span>

        <small>
          Focus on the highlighted key
        </small>
      </div>

      <div className="virtual-keyboard-row">
        {keys.map((item) => {
          const isActive =
            item.key.toLowerCase() === activeKey.toLowerCase();

          const isPressed =
            item.key.toLowerCase() === pressedKey.toLowerCase();

          const isIncorrect =
            item.key.toLowerCase() === incorrectKey.toLowerCase();

          return (
            <div
              key={item.key}
              className={`virtual-key ${
                isActive ? "active-key" : ""
              } ${isPressed ? "pressed-key" : ""} ${
                isIncorrect ? "incorrect-key" : ""
              }`}
              title={`${item.label} — ${item.finger}`}
            >
              <span className="key-letter">
                {item.label}
              </span>

              <span className="key-finger">
                {item.finger}
              </span>
            </div>
          );
        })}
      </div>

      <div className="keyboard-instruction">
        <span>← Left hand</span>

        <span>Right hand →</span>
      </div>
    </div>
  );
}

export default VirtualKeyboard;