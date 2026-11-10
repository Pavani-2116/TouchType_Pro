function Timer({ seconds }) {
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  return (
    <div className="timer">
      {minutes}:
      {String(remainingSeconds).padStart(2, "0")}
    </div>
  );
}

export default Timer;