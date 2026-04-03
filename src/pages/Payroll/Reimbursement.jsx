// pages/Payroll/Reimbursement.jsx
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

export default function Reimbursement() {
  const [subledger, setSubledger] = useState("");
  const [month, setMonth] = useState(MONTHS[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [billable, setBillable] = useState("No");

  function handleSearch(e) {
    e.preventDefault();
    // hook to API / filter logic later
    console.log("Search reimbursements", {
      subledger,
      month,
      year,
      billable,
    });
  }

  function handleCreateVoucher() {
    // navigate or open modal for new voucher
    console.log("Create Reimbursement Voucher");
  }

  return (
    <>
      <PageMeta
        title="Reimbursement | HRMS"
        description="Manage reimbursement vouchers"
      />

      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">
            Reimbursement
          </h1>
          <nav className="text-xs text-slate-400">
            Home <span className="mx-1">›</span> Payroll{" "}
            <span className="mx-1">›</span> Reimbursement
          </nav>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 md:px-6 md:py-4">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            {/* Left side: Subledger + Month-Year + Search */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Subledger */}
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-600 mb-1">
                  Subledger
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={subledger}
                    onChange={(e) => setSubledger(e.target.value)}
                    placeholder="Search HeadName/Ledger"
                    className="w-60 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />

                  {/* Month - Year */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600 mr-1">
                      Month - Year
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

                  {/* Search button */}
                  <button
                    type="submit"
                    className="rounded-md bg-sky-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-600 transition-all shadow-sm"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: Billable/Non Billable */}
            <div className="flex flex-col md:items-end">
              <span className="text-xs font-semibold text-slate-600 mb-1">
                Billable/Non Billable
              </span>
              <select
                value={billable}
                onChange={(e) => setBillable(e.target.value)}
                className="min-w-[140px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </form>
        </div>

        {/* Empty state */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-10 md:px-6 md:py-12 flex items-center justify-center">
          <p className="text-sm text-slate-500">
            No voucher has been created. Please{" "}
            <button
              type="button"
              onClick={handleCreateVoucher}
              className="font-semibold text-sky-600 hover:text-sky-700 underline underline-offset-2"
            >
              Create Voucher
            </button>
            .
          </p>
        </div>
      </div>
    </>
  );
}
