// pages/Attendance/CheckIn.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../MyComponents/Table/DataTable";

const STATUS_OPTIONS = ["Marked", "Unmarked", "All"];

const columns = [
  { key: "empCode", header: "Emp Code" },
  { key: "employeeName", header: "Employee Name" },
  { key: "checkInTime", header: "Check-In Time" },
  { key: "checkOutTime", header: "Check-Out Time" },
  { key: "status", header: "Status" },
];

export default function CheckIn() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Marked");
  const [date, setDate] = useState("2026-03-16"); // ISO for input[type=date]

  // hook to API later
  const rows = [];

  return (
    <>
      <PageMeta
        title="Check-In | HRMS"
        description="View and manage employee check-in records"
      />

      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">Check-In</h1>
          <nav className="text-xs text-slate-400">
            Attendance <span className="mx-1">›</span> Check-In
          </nav>
        </div>

        {/* Top filter row – matches screenshot layout */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 md:px-6 md:py-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr,1fr,1fr] md:items-center">
            {/* Search Emp Name/Code */}
            <div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Emp Name/Code"
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status dropdown */}
            <div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-md border border-sky-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Date picker (styled like screenshot) */}
            <div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-4">
          <DataTable columns={columns} data={rows} />
        </div>
      </div>
    </>
  );
}