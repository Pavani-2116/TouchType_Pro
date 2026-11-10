export const PRACTICE_KEYS = [
  "a",
  "s",
  "d",
  "f",
  "j",
  "k",
  "l",
  ";",
];

export const TIMES = [
  1,
  2,
  3,
  5,
  10,
  15,
  20,
];

export const MODES = {
  beginner: {
    name: "Beginner",
    icon: "🌱",
    description: "Simple home-row patterns",
  },

  accuracy: {
    name: "Accuracy",
    icon: "🎯",
    description: "Slow and careful typing",
  },

  speed: {
    name: "Speed",
    icon: "⚡",
    description: "Challenge your typing speed",
  },
};

const patterns = {
  beginner: [
    "asdf jkl;",
    "asdf asdf jkl; jkl;",
    "a s d f j k l ;",
    "asdf jkl; asdf jkl;",
    "sad dad ask lad",
    "fall flask",
    "salad",
    "adds",
    "asks",
    "flags",
  ],

  accuracy: [
    "asdf asdf",
    "jkl; jkl;",
    "aass ddff",
    "jjkk ll;;",
    "asdf jkl;",
    "sad sad dad dad",
    "ask ask lad lad",
    "fall fall flask flask",
  ],

  speed: [
    "asdfjkl;",
    "asdf jkl; asdf jkl;",
    "asdfjkl; asdfjkl;",
    "sad lad ask flask",
    "fall adds salad",
    "asdf jkl; sad lad",
    "flask salad adds",
  ],
};

export function generateText(mode = "beginner", level = 1) {
  const list = patterns[mode] || patterns.beginner;

  const multiplier = Math.max(3, level + 2);

  let result = [];

  for (let i = 0; i < multiplier * 5; i++) {
    const randomIndex = Math.floor(
      Math.random() * list.length
    );

    result.push(list[randomIndex]);
  }

  return result.join(" ");
}