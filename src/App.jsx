import React, { useState } from "react";

import Header from "./components/Header";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";
import Results from "./pages/Results";
import Progress from "./pages/Progress";

import { saveSession } from "./utils/storage";

function App() {
  const [page, setPage] = useState("home");
  const [result, setResult] = useState(null);

  const navigate = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePracticeComplete = (sessionResult) => {
    if (!sessionResult || sessionResult.total <= 0) {
      return;
    }

    saveSession(sessionResult);

    setResult(sessionResult);

    navigate("results");
  };

  return (
    <div className="app">
      <Header page={page} navigate={navigate} />

      {page === "home" && (
        <Home navigate={navigate} />
      )}

      {page === "learn" && (
        <Learn navigate={navigate} />
      )}

      {page === "practice" && (
        <Practice
          onComplete={handlePracticeComplete}
        />
      )}

      {page === "results" && (
        <Results
          result={result}
          navigate={navigate}
        />
      )}

      {page === "progress" && (
        <Progress navigate={navigate} />
      )}

      <footer className="footer">
        <span>TouchType Pro</span>
        <span>Focused on ASDF JKL;</span>
        <span>React + Vite</span>
      </footer>
    </div>
  );
}

export default App;