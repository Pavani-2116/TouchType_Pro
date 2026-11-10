import React from "react";
import {
  Keyboard,
  BookOpen,
  Play,
  BarChart3,
} from "lucide-react";

function Header({ page, navigate }) {
  return (
    <header className="header">
      <div
        className="logo"
        onClick={() => navigate("home")}
      >
        <div className="logo-icon">
          <Keyboard size={20} />
        </div>

        <div>
          <strong>TouchType</strong>
          <small>PRO</small>
        </div>
      </div>

      <nav>
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => navigate("home")}
        >
          Home
        </button>

        <button
          className={page === "learn" ? "active" : ""}
          onClick={() => navigate("learn")}
        >
          <BookOpen size={15} />
          Learn
        </button>

        <button
          className={page === "practice" ? "active" : ""}
          onClick={() => navigate("practice")}
        >
          <Play size={15} />
          Practice
        </button>

        <button
          className={page === "progress" ? "active" : ""}
          onClick={() => navigate("progress")}
        >
          <BarChart3 size={15} />
          Progress
        </button>
      </nav>
    </header>
  );
}

export default Header;