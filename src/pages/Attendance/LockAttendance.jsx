// pages/Attendance/LockAttendance.jsx
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

const YEARS = (() => {
  const currentYear = new Date().getFullYear();
  return [currentYear - 1, currentYear, currentYear + 1];
})();

const STATUS_FILTERS = ["All", "Locked", "Pending"];

// Columns for DataTable
const columns = [
  {
    key: "select",
    header: (
      <input
        type="checkbox"
        onChange={() => {}}
      />
    ),
    render: () => (
      <input
        type="checkbox"
        onChange={() => {}}
      />
    ),
  },
  { key: "index", header: "#" },
  { key: "monthYear", header: "Month-Year" },
  { key: "employee", header: "Employee" },
  { key: "paidDay", header: "Paid Day" },
  { key: "revisedPaidDay", header: "Revised Paid Day" },
  { key: "deltaDays", header: "(+/-) Days" },
  { key: "amount", header: "Amount" },
  { key: "status", header: "Status" },
];

export default function LockAttendance() {
  const [month, setMonth] = useState("March");
  const [year, setYear] = useState(2026);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // plug real data later
  const rows = [].map((row, i) => ({
    ...row,
    index: i + 1,
  }));

  function handleSaveBulk() {
    console.log("Save Bulk Lock Attendance", {
      month,
      year,
      search,
      status,
    });
  }

  return (
    <>
      <PageMeta
        title="Lock Attendance | HRMS"
        description="Lock monthly attendance in bulk"
      />

      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">
            Lock Attendance
          </h1>
          <nav className="text-xs text-slate-400">
            Attendance <span className="mx-1">›</span> Lock Attendance
          </nav>
        </div>

        {/* Filters row */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 md:px-6 md:py-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:items-center">
            {/* Month */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-600">
                Month
              </span>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-600">
                Year
              </span>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-600">
                Search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-600">
                Status
              </span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {STATUS_FILTERS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table + button card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-4">
          <DataTable columns={columns} data={rows} />

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleSaveBulk}
              className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
            >
              <span className="text-lg leading-none">⤴</span>
              <span>Save Bulk Lock Attendance</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}