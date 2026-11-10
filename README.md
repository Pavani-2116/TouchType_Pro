# TouchType Pro

TouchType Pro is a responsive touch typing practice application built using React and Vite. It helps beginners improve typing speed, accuracy, and keyboard familiarity through interactive practice sessions.

The application focuses on the eight home-row keys:

**A S D F J K L ;**

## Features

### Practice Modes
- Beginner Mode
- Accuracy Mode
- Speed Mode
- Four difficulty levels

### Practice Settings
- Custom practice duration
- Default 5-minute practice
- Available goals: 1, 2, 3, 5, 10, 15, and 20 minutes
- Early session stopping

### Live Performance Tracking
- Live practice timer
- Total keys pressed
- Correct and incorrect key counts
- Accuracy percentage
- Words Per Minute (WPM)
- Next-key highlighting
- Interactive virtual keyboard

### Progress Tracking
- Per-key mistake analysis
- Personalized improvement suggestions
- Practice history
- Achievement badges
- Daily practice streak
- Progress saved using browser LocalStorage

### User Interface
- Responsive design
- Interactive practice experience
- Real-time typing feedback

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development and build tool |
| JavaScript | Application logic |
| CSS3 | Styling and responsive design |
| Lucide React | Icons |
| Browser LocalStorage | Saving practice progress |

## Project Structure

```text
TouchType-Pro/
├── src/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Pavani-2116/TouchType_Pro.git
```

### 2. Navigate to the Project Folder

```bash
cd TouchType_Pro
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access TouchType Pro.

## How It Works

1. Choose a practice mode.
2. Select a difficulty level.
3. Set your preferred practice duration.
4. Start typing the highlighted home-row keys.
5. Monitor your speed, accuracy, and mistakes in real time.
6. Review your performance and improvement suggestions after practice.

## Data Storage

TouchType Pro uses browser LocalStorage to save practice progress, history, achievements, and daily streak information.

Progress is stored locally in the browser and is not synchronized across devices.

## Future Enhancements

- Add additional keyboard rows and typing lessons.
- Introduce user accounts and cloud-based progress synchronization.
- Add typing performance charts and analytics.
- Introduce timed typing challenges and leaderboards.

## Author

**Pavani Mada**

- GitHub: https://github.com/Pavani-2116
- LinkedIn: https://www.linkedin.com/in/pavani-mada/

---

*Built to make touch typing practice interactive, measurable, and beginner-friendly.*
