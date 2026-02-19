import { useState, useEffect } from "react";
import { Play, Pause, LogOut, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Attendance() {

  // ================= SAMPLE HISTORY =================
  const [history, setHistory] = useState([
    { date: "01/02/2024", checkIn: "09:05 AM", checkOut: "06:00 PM", totalHours: "8.90" },
    { date: "02/02/2024", checkIn: "09:10 AM", checkOut: "05:45 PM", totalHours: "8.50" },
    { date: "03/02/2024", checkIn: "09:00 AM", checkOut: "06:15 PM", totalHours: "9.25" },
    { date: "04/02/2024", checkIn: "09:20 AM", checkOut: "05:30 PM", totalHours: "8.15" },
    { date: "05/02/2024", checkIn: "09:00 AM", checkOut: "07:00 PM", totalHours: "10.00" },
  ]);

  // ================= TIMER STATES =================
  const [workSeconds, setWorkSeconds] = useState(0);
  const [status, setStatus] = useState("Checked Out");
  const [working, setWorking] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  // ================= TIMER =================
  useEffect(() => {
    let interval;
    if (working) {
      interval = setInterval(() => {
        setWorkSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [working]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const getCurrentTime = () => new Date().toLocaleTimeString();
  const getCurrentDate = () => new Date().toLocaleDateString();

  // ================= BUTTON LOGIC =================
  const handleCheckIn = () => {
    setCheckInTime(getCurrentTime());
    setStatus("Working");
    setWorking(true);
    setOnBreak(false);
  };

  const handleBreak = () => {
    setStatus("On Break");
    setWorking(false);
    setOnBreak(true);
  };

  const handleResume = () => {
    setStatus("Working");
    setWorking(true);
    setOnBreak(false);
  };

  const handleCheckOut = () => {
    const totalHours = (workSeconds / 3600).toFixed(2);

    const newRecord = {
      date: getCurrentDate(),
      checkIn: checkInTime,
      checkOut: getCurrentTime(),
      totalHours: totalHours,
    };

    setHistory([newRecord, ...history]);

    setStatus("Checked Out");
    setWorking(false);
    setOnBreak(false);
    setWorkSeconds(0);
  };

  // ================= CALCULATIONS =================
  const totalWorkingDays = 22;
  const attendancePercentage =
    (history.length / totalWorkingDays) * 100;

  const totalWorkedHours = history.reduce(
    (sum, item) => sum + parseFloat(item.totalHours),
    0
  );

  const standardHours = history.length * 8;
  const overtime = totalWorkedHours - standardHours;

  // ================= EXPORT TO EXCEL =================
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(history);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(data, "Attendance_Report.xlsx");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>

      {/* WORK SESSION */}
      <div className="bg-white p-6 rounded-xl shadow border mb-6 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">WORK TIME</p>
          <h2 className="text-3xl font-bold">
            {formatTime(workSeconds)}
          </h2>
        </div>

        <div>
          <p className="text-gray-500 text-sm">STATUS</p>
          <p className="font-semibold">{status}</p>
        </div>

        <div className="space-x-3">
          <button
            onClick={handleCheckIn}
            disabled={working}
            className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            <Play size={16} className="inline mr-1" />
            Check In
          </button>

          {status === "Working" && (
            <button
              onClick={handleBreak}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              <Pause size={16} className="inline mr-1" />
              Break
            </button>
          )}

          {status === "On Break" && (
            <button
              onClick={handleResume}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Resume
            </button>
          )}

          <button
            onClick={handleCheckOut}
            disabled={status === "Checked Out"}
            className="bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            <LogOut size={16} className="inline mr-1" />
            Check Out
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Attendance %</p>
          <h2 className="text-xl font-bold">
            {attendancePercentage.toFixed(1)}%
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Overtime</p>
          <h2 className="text-xl font-bold text-blue-600">
            {overtime > 0 ? overtime.toFixed(2) : 0} hrs
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Total Days</p>
          <h2 className="text-xl font-bold">
            {history.length}
          </h2>
        </div>
      </div>

      {/* EXPORT BUTTON */}
      <button
        onClick={exportToExcel}
        className="mb-6 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <Download size={18} />
        Export to Excel
      </button>

      {/* HISTORY TABLE */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">
          Attendance History
        </h2>

        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="border-t text-center">
                <td className="py-3 text-left">{item.date}</td>
                <td>{item.checkIn}</td>
                <td>{item.checkOut}</td>
                <td>{item.totalHours} hrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
