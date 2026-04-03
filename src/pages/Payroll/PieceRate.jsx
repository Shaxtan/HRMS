// pages/Payroll/PieceRate.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
// If you prefer your reusable DataTable, you can import it and map columns accordingly
// import DataTable from "../../MyComponents/Table/DataTable";

const PAYMENT_STATUS = ["All", "Paid", "Unpaid"];

export default function PieceRate() {
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [employee, setEmployee] = useState("");

  const totalRecords = 0;
  const rows = []; // hook to API later

  function handleSearch(e) {
    e.preventDefault();
    console.log("Search piece rate payouts", {
      paymentStatus,
      fromDate,
      toDate,
      employee,
    });
  }

  return (
    <>
      <PageMeta
        title="Piece Rate Payouts | HRMS"
        description="View and manage piece rate payouts"
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">
            Piece Rate Payouts
          </h1>
          <nav className="text-xs text-slate-400">
            Dashboard <span className="mx-1">›</span> Piece Rate Payouts
          </nav>
        </div>

        {/* Filter + summary card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-4 md:px-6 md:py-5">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-4 md:grid md:grid-cols-[auto,1fr,1fr,1fr,auto] md:items-center md:gap-6"
          >
            {/* Total records */}
            <div className="text-sm font-medium text-slate-700">
              Total Records:{" "}
              <span className="font-semibold text-slate-900">
                {totalRecords}
              </span>
            </div>

            {/* Payment Status */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-600">
                Payment Status
              </span>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {PAYMENT_STATUS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* From Date */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-600">
                From Date
              </span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* To Date */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-600">
                To Date
              </span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Employee + Search */}
            <div className="flex flex-col gap-2 md:items-end">
              <div className="flex flex-col gap-1 w-full">
                <span className="text-xs font-semibold text-slate-600">
                  Employee
                </span>
                <select
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 min-w-[190px]"
                >
                  <option value="">Select employees</option>
                  {/* populate with employees from API later */}
                </select>
              </div>
              <button
                type="submit"
                className="self-start md:self-auto rounded-md bg-sky-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-600 transition-all shadow-sm mt-1"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Table area */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-sky-100 text-slate-700">
                  <th className="px-4 py-2 text-left font-semibold">Sr. No.</th>
                  <th className="px-4 py-2 text-left font-semibold">
                    <input
                      type="checkbox"
                      className="mr-2 align-middle"
                      // onChange logic later for bulk select
                    />
                    <span className="align-middle">Payment Status</span>
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Employee
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Attendance Days
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Dates Worked
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Pieces Completed
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Total Payout (₹)
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-6 text-center text-sm text-slate-500"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  rows.map((row, index) => (
                    <tr key={row.id || index} className="border-t border-slate-100">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={row.paid}
                          readOnly
                          className="mr-2 align-middle"
                        />
                        <span className="align-middle">
                          {row.paid ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td className="px-4 py-2">{row.employeeName}</td>
                      <td className="px-4 py-2">{row.attendanceDays}</td>
                      <td className="px-4 py-2">{row.datesWorked}</td>
                      <td className="px-4 py-2">{row.piecesCompleted}</td>
                      <td className="px-4 py-2">
                        {row.totalPayout != null ? `₹${row.totalPayout}` : "₹0"}
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-xs font-medium text-sky-600 hover:text-sky-700">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
