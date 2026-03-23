// components/common/DataTable.jsx
import { useState, useMemo } from "react";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";

export default function DataTable({ columns = [], data = [], actions }) {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return data;
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? "").toLowerCase().includes(q)
      )
    );
  }, [data, search, columns]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
  const handlePageSize = (e) => { setPageSize(Number(e.target.value)); setPage(1); };

  const handleExport = () => {
    const headers = columns.map((c) => c.header).join(",");
    const rows = filtered.map((row) =>
      columns.map((c) => `"${row[c.key] ?? ""}"`).join(",")
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Show</span>
          <select
            value={pageSize}
            onChange={handlePageSize}
            className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all cursor-pointer"
          >
            {[10, 20, 40, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="h-5 w-px bg-slate-200" />

        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full h-8 rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 rounded-lg bg-sky-50 border border-sky-100 px-3 h-8">
          <span className="text-xs text-sky-500 font-medium">Total</span>
          <span className="text-xs font-bold text-sky-700">{filtered.length}</span>
        </div>

        <div className="flex-1" />

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs font-medium hover:bg-emerald-100 transition-all shadow-sm"
        >
          <Download size={13} />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b-2 border-slate-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3.5 text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider w-[1%] whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-20">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <Search size={18} className="text-slate-300" />
                    </div>
                    <p className="text-sm text-slate-400 font-medium">No records found</p>
                    <p className="text-xs text-slate-300">Try adjusting your search</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-slate-50 transition-all duration-150
                    hover:bg-sky-50/60 hover:shadow-[inset_3px_0_0_0_#38bdf8]
                    ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-3 py-3 whitespace-nowrap">
                      {col.key === "name" ? (
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-[10px] font-bold border border-sky-200 flex-shrink-0">
                            {String(row[col.key] ?? "").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-xs font-semibold text-slate-700">{row[col.key]}</span>
                        </div>
                      ) : col.key === "status" ? (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border
                          ${row[col.key] === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : row[col.key] === "Inactive" ? "bg-red-50 text-red-500 border-red-200"
                            : "bg-amber-50 text-amber-600 border-amber-200"}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0
                            ${row[col.key] === "Active" ? "bg-emerald-500"
                              : row[col.key] === "Inactive" ? "bg-red-400"
                              : "bg-amber-400"}`}
                          />
                          {row[col.key]}
                        </span>
                      ) : col.key === "ctc" || col.key === "salaryInHand" ? (
                        <span className="text-xs font-semibold text-slate-700">
                          ₹{Number(row[col.key] ?? 0).toLocaleString("en-IN")}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-600">{row[col.key] ?? "—"}</span>
                      )}
                    </td>
                  ))}

                  {actions && (
                    <td className="px-4 py-3 w-[1%] whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <p className="text-xs text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-600">
            {filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
          </span>{" "}
          –{" "}
          <span className="font-semibold text-slate-600">
            {Math.min(safePage * pageSize, filtered.length)}
          </span>{" "}
          of <span className="font-semibold text-slate-600">{filtered.length}</span> results
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
          >
            <ChevronLeft size={14} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`flex items-center justify-center h-7 w-7 rounded-lg text-xs font-semibold transition-all shadow-sm
                ${p === safePage
                  ? "bg-sky-500 text-white border border-sky-500"
                  : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-100"
                }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}