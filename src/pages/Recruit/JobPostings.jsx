// pages/Recruit/JobPostings.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../MyComponents/Table/DataTable";

const STATUS_FILTERS = ["All", "Published", "Open", "Unpublished"];

const columns = [
  { key: "id", header: "Job ID" },
  { key: "title", header: "Job Title" },
  { key: "slug", header: "Slug" },
  { key: "status", header: "Status" },
  { key: "createdAt", header: "Created On" },
  { key: "publishedAt", header: "Published On" },
];

export default function JobPostings() {
  // Dummy state for filters – hook into API later
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("All");

  // Replace with real data
  const [jobs] = useState([]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    // Call API or filter logic here
    console.log({ search, fromDate, toDate, status });
  }

  function handleReset() {
    setSearch("");
    setFromDate("");
    setToDate("");
    setStatus("All");
    // Also reset data / refetch if needed
  }

  return (
    <>
      <PageMeta
        title="Job Postings | HRMS"
        description="Manage and view job postings"
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">
            Job Postings
          </h1>
          <nav className="text-xs text-slate-400">
            Home <span className="mx-1">›</span> Recruit{" "}
            <span className="mx-1">›</span> Job Postings
          </nav>
        </div>

        {/* Filters + Create Button */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-5">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            {/* Left side: filters */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(0,2fr),minmax(0,1fr),minmax(0,1fr),minmax(0,1fr)] gap-3">
              {/* Search */}
              <div className="col-span-1 xl:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Search
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search By Job Title or Job Id or Slug"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* From Date */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  {STATUS_FILTERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right side: Search / Reset / Create */}
            <div className="flex flex-row items-center gap-3 justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
              >
                Reset
              </button>
              <button
                type="button"
                className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-all shadow-sm"
                onClick={() => {
                  // Navigate to create-job page or open modal
                  console.log("Create Job Posting");
                }}
              >
                Create Job Posting
              </button>
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-5">
          <DataTable columns={columns} data={jobs} />
        </div>
      </div>
    </>
  );
}
