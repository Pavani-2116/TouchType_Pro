const STORAGE_KEY = "touchtype_history";

export function getHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  } catch (error) {
    console.error("Could not read history:", error);
    return [];
  }
}

export function saveSession(session) {
  if (!session) {
    return getHistory();
  }

  // Do not save empty sessions.
  if (!session.total || session.total <= 0) {
    return getHistory();
  }

  const oldHistory = getHistory();

  const newHistory = [
    session,
    ...oldHistory,
  ].slice(0, 100);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(newHistory)
  );

  return newHistory;
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

export function calculateProgress() {
  const history = getHistory();

  if (history.length === 0) {
    return {
      sessions: 0,
      bestWpm: 0,
      bestAccuracy: 0,
      totalKeys: 0,
      streak: 0,
    };
  }

  const bestWpm = Math.max(
    ...history.map((item) => item.wpm || 0)
  );

  const bestAccuracy = Math.max(
    ...history.map((item) => item.accuracy || 0)
  );

  const totalKeys = history.reduce(
    (total, item) => total + (item.total || 0),
    0
  );

  const practiceDates = new Set(
    history.map((item) => {
      return new Date(item.date).toDateString();
    })
  );

  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    date.setDate(
      date.getDate() - i
    );

    if (
      practiceDates.has(
        date.toDateString()
      )
    ) {
      streak++;
    } else {
      if (i > 0) {
        break;
      }
    }
  }

  return {
    sessions: history.length,
    bestWpm,
    bestAccuracy,
    totalKeys,
    streak,
  };
}