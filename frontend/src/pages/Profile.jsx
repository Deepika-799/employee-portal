import { User, Bell, Shield } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    reminders: true,
    team: false,
    payroll: true,
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Dummy stored password (frontend demo only)
  const storedPassword = "123456";

  const toggleSwitch = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handlePasswordUpdate = () => {
    setError("");
    setSuccess("");

    if (passwordData.current !== storedPassword) {
      setError("Current password is incorrect.");
      return;
    }

    if (passwordData.new.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      setError("New password and confirm password do not match.");
      return;
    }

    setSuccess("Password updated successfully!");
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-gray-500 mb-6">
        Manage your account and application preferences.
      </p>

      {/* PROFILE SETTINGS */}
      <div className="bg-white p-6 rounded-xl shadow border mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-lg">
            <User className="text-blue-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold">Profile Settings</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              defaultValue="Rahul Kumar"
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              defaultValue="rahul@company.com"
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              type="text"
              defaultValue="+91 98765 43210"
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Role</label>
            <input
              type="text"
              defaultValue="Employee"
              disabled
              className="mt-1 w-full border rounded-lg p-2 bg-gray-100"
            />
          </div>
        </div>

        <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg">
          Save Changes
        </button>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white p-6 rounded-xl shadow border mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Bell className="text-purple-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>

        <div className="space-y-6">
          {[
            { label: "Email Notifications", key: "email" },
            { label: "Task Reminders", key: "reminders" },
            { label: "Team Updates", key: "team" },
            { label: "Payroll Alerts", key: "payroll" },
          ].map((item) => (
            <div
              key={item.key}
              className="flex justify-between items-center border-b pb-4"
            >
              <span>{item.label}</span>

              <button
                onClick={() => toggleSwitch(item.key)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  notifications[item.key]
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                    notifications[item.key]
                      ? "translate-x-6"
                      : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECURITY */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-lg">
            <Shield className="text-green-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold">Security</h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm text-gray-600">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              value={passwordData.current}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  current: e.target.value,
                })
              }
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={passwordData.new}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  new: e.target.value,
                })
              }
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={passwordData.confirm}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirm: e.target.value,
                })
              }
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-4">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm mt-4">{success}</p>
        )}

        <button
          onClick={handlePasswordUpdate}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
