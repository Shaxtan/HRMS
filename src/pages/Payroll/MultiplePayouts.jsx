// pages/Payroll/MultiplePayouts.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../MyComponents/Table/DataTable";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const STATUS_OPTIONS = ["Unpaid", "Paid"];

const columns = [
  { key: "orgEmpCode", header: "Org Emp Code" },
  { key: "employeeName", header: "Employee Name" },
  { key: "period", header: "Period" },
  { key: "paidDays", header: "Paid Days" },
  { key: "hours", header: "Hrs" },
  {
    key: "amount",
    header: "Amount (₹)",
    render: (row) => (
      <span className="font-medium text-slate-800">
        {row.amount != null ? `₹${row.amount}` : "₹0"}
      </span>
    ),
  },
];

export default function MultiplePayouts() {
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("Unpaid");

  // hook to backend later
  const [rows] = useState([]);

  function handleGenerate(e) {
    e.preventDefault();
    console.log("Generate salary advice", { month, status });
  }

  return (
    <>
      <PageMeta
        title="Multiple Attendance Payout | HRMS"
        description="Generate salary advice for multiple attendance payouts"
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">
            Multiple Attendance Payout
          </h1>
          <nav className="text-xs text-slate-400">
            Payout <span className="mx-1">›</span> Multiple Attendance Payout
          </nav>
        </div>

        {/* Center card with form */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-center text-base font-semibold text-slate-800">
                TankhaPay Generate Salary Advice
              </h2>
            </div>

            <form
              onSubmit={handleGenerate}
              className="px-6 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-center"
            >
              <div className="w-full md:w-1/2">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Month</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-1/2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>

        {/* Table area – header bar look using DataTable */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-4">
          <DataTable columns={columns} data={rows} />
        </div>
      </div>
    </>
  );
}
