// pages/Attendance/BulkAttendance.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";

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

export default function BulkAttendance() {
  const [filterBy, setFilterBy] = useState("upload"); // manual | upload | show
  const [month, setMonth] = useState("February");
  const [year, setYear] = useState(2026);
  const [file, setFile] = useState(null);

  function handleFilter(e) {
    e.preventDefault();
    console.log("Filter bulk attendance", { filterBy, month, year });
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    setFile(f || null);
  }

  function handleClear() {
    setFile(null);
  }

  return (
    <>
      <PageMeta
        title="Bulk Attendance | HRMS"
        description="Upload and manage bulk attendance via Excel"
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">
            Bulk Attendance
          </h1>
          <nav className="text-xs text-slate-400">
            Attendance <span className="mx-1">›</span> Bulk Attendance
          </nav>
        </div>

        {/* Top filter bar (Filter By + Month/Year) */}
        <form
          onSubmit={handleFilter}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 md:px-6 md:py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          {/* Filter By radios */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
            <span className="font-semibold mr-1">Filter By:</span>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="filterBy"
                value="manual"
                checked={filterBy === "manual"}
                onChange={(e) => setFilterBy(e.target.value)}
              />
              <span>Marked Manually (All)</span>
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="filterBy"
                value="upload"
                checked={filterBy === "upload"}
                onChange={(e) => setFilterBy(e.target.value)}
              />
              <span>Upload from Excel</span>
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="filterBy"
                value="show"
                checked={filterBy === "show"}
                onChange={(e) => setFilterBy(e.target.value)}
              />
              <span>Show Records (Excel)</span>
            </label>
          </div>

          {/* Month / Year / Filter button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-600 mb-1">
                Month
              </span>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="min-w-[150px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-600 mb-1">
                Year
              </span>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="min-w-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 md:mt-5 rounded-md bg-slate-800 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-900 transition-all shadow-sm flex items-center gap-1"
            >
              Filter
              <span className="text-xs">▾</span>
            </button>
          </div>
        </form>

        {/* Upload Bulk Attendance card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-6 md:px-8 md:py-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Upload Bulk Attendance
          </h2>

          {/* Red instructions */}
          <div className="text-xs leading-relaxed text-slate-700 space-y-2 mb-6">
            <p className="font-semibold text-red-600">
              1. Please download the latest template, with the list of
              employee(s)
            </p>
            <ul className="list-none pl-4 space-y-1 text-red-600">
              <li>
                a.{" "}
                <button
                  type="button"
                  className="font-semibold underline underline-offset-2"
                >
                  with blank attendance
                </button>
              </li>
              <li>
                b.{" "}
                <button
                  type="button"
                  className="font-semibold underline underline-offset-2"
                >
                  with actual attendance
                </button>
              </li>
              <li>
                c.{" "}
                <button
                  type="button"
                  className="font-semibold underline underline-offset-2"
                >
                  with actual &amp; present marked for future
                </button>
              </li>
            </ul>
            <p>
              2. Edit this file in Excel, and add the attendance.
              <br />
              3. Do not change any employee details already present in the
              template. This includes the{" "}
              <span className="font-semibold text-red-600">
                following columns - Employee, EmpCode, OrgEmpCode, Mobile,
                Status, DOB, DOJ, DOR
              </span>
              .
              <br />
              4. Mark &amp; Save employee attendance with attendance marking
              code [
              <span className="font-semibold text-red-600">
                {" "}
                PP, WFH, HD-(Leave Code OR AA), HL-(Leave code), LL-CO, OD, WO,
                AA, HO, CLS, ASL, TR, OD, LWP, LL-(Leave Code)
              </span>
              ] and upload this file below. Any other file with a different code
              will be rejected.
              <br />
              5. Salary updates performed here will be effective from 1st of the
              current month.
            </p>

            <p className="mt-3 font-semibold">Template file instructions -</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                There is a list of employees with employee codes and joining
                dates. Please fill in the data accordingly.
              </li>
              <li>Please do not add/remove columns.</li>
              <li>
                Please enter the attendance code [
                <span className="font-semibold">
                  {" "}
                  PP, WFH, HD-(Leave Code OR AA), HL-(Leave Code), LL-CO, OD,
                  WO, AA, HO CLS, LL-(Leave Code)
                </span>
                ] in capital letters.
              </li>
              <li>
                If there is no data for a particular cell, leave it empty.
                Don&apos;t enter &quot;-&quot;, &quot;NA&quot; etc.
              </li>
              <li>Please use CLS to remove marked attendance.</li>
              <li>
                <span className="font-semibold">
                  Note . For bulk upload, Excel files with maximum 200 records
                  allowed at a time. If records are &gt; 200, then split the
                  file and upload.
                </span>
              </li>
            </ol>
          </div>

          {/* File upload row */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Choose File
              </label>
              <input
                type="file"
                accept=".xls,.xlsx,.csv"
                onChange={handleFileChange}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-700 hover:file:bg-slate-200"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                {file ? `Selected file: ${file.name}` : "No file chosen"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="mt-2 md:mt-6 rounded-md border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Clear
            </button>
          </div>

          {/* Codes legend */}
          <div className="mt-5 text-[11px] leading-relaxed text-red-600">
            <span className="font-semibold">attendance marking codes . </span>
            [ PP - Full Day Present, WFH - Work From Home, HD-(Half Day Present
            with Leave OR Absent), LL-CO (CompOff), OD - OnDuty, TR - OnTour,
            LWP - Leave Without Pay, ASL - A Study Leave AA - Absent, HO -
            Holiday, WO - Weekly-Off, CLS- Clear/Remove Att, LL-(Leave Code),
            HL-(Leave Code) for Half Day Leave ]
          </div>
        </div>
      </div>
    </>
  );
}