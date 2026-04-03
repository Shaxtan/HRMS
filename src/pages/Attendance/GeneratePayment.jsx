// pages/Attendance/GeneratePayment.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../MyComponents/Table/DataTable";

const ATTENDANCE_TYPES = ["Attendance", "Overtime", "Bonus"];
const STATUS_FILTERS = ["All", "Pending", "Processed"];

const columns = [
  {
    key: "select",
    header: (
      <input
        type="checkbox"
        // hook up bulk select later
        onChange={() => {}}
      />
    ),
    render: (row) => (
      <input
        type="checkbox"
        checked={!!row.selected}
        onChange={() => {}}
      />
    ),
  },
  { key: "employee", header: "Employee(s)." },
  { key: "orgUnit", header: "Organization Unit" },
  { key: "department", header: "Department" },
  { key: "designation", header: "Designation" },
  { key: "paidDays", header: "Paid Days" },
  { key: "leaveTaken", header: "Leave Taken" },
  { key: "totalPaidDays", header: "Total Paid Days" },
  { key: "status", header: "Status" },
];

export default function GeneratePayment() {
  const [search, setSearch] = useState("");
  const [attType, setAttType] = useState("Attendance");
  const [status, setStatus] = useState("All");

  const [rows] = useState([]); // hook to API later

  function handleGenerate() {
    console.log("Generate Payment Advice", { search, attType, status });
  }

  return (
    <>
      <PageMeta
        title="Generate Payment Advice | HRMS"
        description="Generate payment advice from attendance records"
      />

      <div className="space-y-5">
        {/* Header row: title + More Filters button */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">
            Generate Payment Advice
          </h1>
          <button
            type="button"
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
          >
            More Filters
            <span className="text-[10px]">▾</span>
          </button>
        </div>

        {/* Top filters bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 md:px-6 md:py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              {/* Search Employee(s) */}
              <div className="flex-1 min-w-[220px]">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Employee(s)"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Attendance type select */}
              <div>
                <select
                  value={attType}
                  onChange={(e) => setAttType(e.target.value)}
                  className="min-w-[160px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {ATTENDANCE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status select (All / Pending / Processed) */}
              <div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="min-w-[120px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {STATUS_FILTERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Generate Payment Advice button */}
              <button
                type="button"
                onClick={handleGenerate}
                className="rounded-md bg-sky-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-600 transition-all shadow-sm"
              >
                Generate Payment Advice
              </button>
            </div>

            {/* Total count */}
            <div className="text-sm font-semibold text-sky-700 md:text-right">
              Total : <span>{rows.length}</span>
            </div>
          </div>
        </div>

        {/* Table area using DataTable */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-4">
          <DataTable columns={columns} data={rows} />
        </div>
      </div>
    </>
  );
}