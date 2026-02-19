import { Download, IndianRupee } from "lucide-react";

export default function Payroll() {
  // Salary Data (Employee Personal)
  const salary = {
    basic: 50000,
    bonus: 5000,
    deductions: 3000,
  };

  const netPay = salary.basic + salary.bonus - salary.deductions;

  const history = [
    { month: "January 2024", net: 52000 },
    { month: "December 2023", net: 51000 },
    { month: "November 2023", net: 50500 },
  ];

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-1">My Payroll</h1>
      <p className="text-gray-500 mb-6">
        View your salary details and payslips.
      </p>

      {/* Salary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Basic Salary</p>
          <h2 className="text-xl font-bold mt-2">
            ₹{salary.basic.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Bonus</p>
          <h2 className="text-xl font-bold text-green-600 mt-2">
            +₹{salary.bonus.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Deductions</p>
          <h2 className="text-xl font-bold text-red-600 mt-2">
            -₹{salary.deductions.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Net Salary</p>
          <h2 className="text-xl font-bold text-blue-600 mt-2">
            ₹{netPay.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Current Payslip Section */}
      <div className="bg-white p-6 rounded-xl shadow border mb-6">
        <h2 className="font-semibold mb-4">January 2024 Payslip</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Basic Salary</span>
            <span>₹{salary.basic.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Bonus</span>
            <span>+₹{salary.bonus.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-red-600">
            <span>Deductions</span>
            <span>-₹{salary.deductions.toLocaleString()}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Net Pay</span>
            <span>₹{netPay.toLocaleString()}</span>
          </div>
        </div>

        <button className="mt-5 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Download size={18} /> Download Payslip
        </button>
      </div>

      {/* Payslip History */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="font-semibold mb-4">Payslip History</h2>

        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Month</th>
              <th className="text-left">Net Pay</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-3">{item.month}</td>
                <td>₹{item.net.toLocaleString()}</td>
                <td>
                  <button className="text-blue-600 flex items-center gap-1">
                    <Download size={16} /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
