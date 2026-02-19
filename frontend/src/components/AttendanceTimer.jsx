import { useState, useEffect } from "react";

export default function AttendanceTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl mb-3">Work Session</h3>
      <p className="text-3xl font-bold">{formatTime()}</p>

      <div className="mt-4 space-x-4">
        <button
          onClick={() => setRunning(true)}
          className="bg-green-500 px-4 py-2 text-white rounded"
        >
          Check In
        </button>

        <button
          onClick={() => setRunning(false)}
          className="bg-red-500 px-4 py-2 text-white rounded"
        >
          Check Out
        </button>
      </div>
    </div>
  );
}
