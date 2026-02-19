import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Clock,
  Calendar,
  Wallet,
  User,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token (future backend ready)
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  const linkClass =
    "flex items-center gap-3 p-2 rounded hover:bg-slate-700";

  return (
    <div className="w-64 bg-slate-900 text-white p-5 flex flex-col justify-between">
      
      {/* TOP MENU */}
      <div>
        <h1 className="text-xl font-bold mb-6">EmployeePortal</h1>

        <nav className="space-y-2">
          <NavLink to="/" className={linkClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/tasks" className={linkClass}>
            <ClipboardList size={18} /> Tasks
          </NavLink>

          <NavLink to="/attendance" className={linkClass}>
            <Clock size={18} /> Attendance
          </NavLink>

          <NavLink to="/timesheet" className={linkClass}>
            <ClipboardList size={18} /> Timesheet
          </NavLink>

          <NavLink to="/leave" className={linkClass}>
            <Calendar size={18} /> Leave
          </NavLink>

          <NavLink to="/payroll" className={linkClass}>
            <Wallet size={18} /> Payroll
          </NavLink>

         
          
          <NavLink to="/performance" className={linkClass}>
            <BarChart3 size={18} /> Performance
          </NavLink>

           <NavLink to="/team-members" className={linkClass}>
            <Users size={18} /> TeamMembers
          </NavLink>



          <NavLink to="/profile" className={linkClass}>
            <User size={18} /> Settings
          </NavLink>
        </nav>
      </div>

      {/* LOGOUT BUTTON AT BOTTOM */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 w-full rounded hover:bg-red-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
