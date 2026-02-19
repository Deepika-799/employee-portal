import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import Profile from "./pages/Profile";
import Timesheet from "./pages/Timesheet";   // ✅ Added
import TeamMembers from "./pages/TeamMembers";
import Performance from "./pages/Performance";


export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/timesheet" element={<Timesheet />} />  {/* ✅ Added */}
              <Route path="/team-members" element={<TeamMembers />} />
              <Route path="/performance" element={<Performance />} />


            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
