// pages/Onboarding/Onboarding.jsx
import { useState, useRef } from "react";
import PageMeta from "../../components/common/PageMeta";
import ManualEntryForm from "./ManualEntryForm";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconUser = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const IconUpload = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);
const IconBulk = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
const IconFile = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const IconX = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const IconDownload = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

// ── Shared UI ─────────────────────────────────────────────────────────────────
const SuccessBanner = ({ message, onDismiss }) => (
  <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300">
    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-white flex-shrink-0"><IconCheck /></span>
    <span className="flex-1">{message}</span>
    <button onClick={onDismiss} className="text-emerald-400 hover:text-emerald-600"><IconX /></button>
  </div>
);

const SubmitBtn = ({ children, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}
    className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm">
    {children}
  </button>
);

const OutlineBtn = ({ children, onClick }) => (
  <button onClick={onClick}
    className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
    {children}
  </button>
);

// ── Excel Upload ──────────────────────────────────────────────────────────────
function ExcelUpload() {
  const [file, setFile]         = useState(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview]   = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess]   = useState(false);
  const inputRef                = useRef();

  const PREVIEW_ROWS = [
    { name: "Amit Kamboj",  id: "EMP001", dept: "Engineering", doj: "01/04/2026", ctc: "₹6,00,000" },
    { name: "Priya Sharma", id: "EMP002", dept: "HR",          doj: "01/04/2026", ctc: "₹4,80,000" },
    { name: "Ravi Kumar",   id: "EMP003", dept: "Finance",     doj: "01/04/2026", ctc: "₹5,40,000" },
  ];

  const handleFile = (f) => {
    if (!f) return;
    if (!f.name.match(/\.(xlsx|xls|csv)$/i)) return;
    setFile(f);
    setPreview(PREVIEW_ROWS);
    setSuccess(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setFile(null);
      setPreview(null);
    }, 1800);
  };

  return (
    <div className="space-y-5">
      {success && (
        <SuccessBanner
          message={`${PREVIEW_ROWS.length} employees imported successfully from Excel.`}
          onDismiss={() => setSuccess(false)}
        />
      )}

      {/* Template strip */}
      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-5 py-3.5 dark:border-slate-700 dark:bg-slate-800/50">
        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-white/80">Download template</p>
          <p className="text-xs text-slate-400 mt-0.5">Use our standard Excel template to avoid import errors</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">
          <IconDownload /> Download .xlsx
        </button>
      </div>

      {/* Drop zone */}
      {!file && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current.click()}
          className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-14 cursor-pointer transition-all
            ${dragging ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"}`}
        >
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-50 text-blue-500 dark:bg-blue-900/30">
            <IconUpload />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700 dark:text-white/80">
              Drop your Excel file here, or <span className="text-blue-600 dark:text-blue-400">browse</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">.xlsx, .xls or .csv — max 10 MB</p>
          </div>
          <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" className="sr-only" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}

      {/* Preview */}
      {file && preview && (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30">
                <IconFile />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-white/90">{file.name}</p>
                <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB · {preview.length} rows detected</p>
              </div>
            </div>
            <button onClick={() => { setFile(null); setPreview(null); }} className="text-slate-400 hover:text-red-400 transition-colors p-1">
              <IconX />
            </button>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Preview (first 3 rows)</p>
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    {["Name","Emp ID","Department","Date of Joining","CTC"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-900">
                  {preview.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                      <td className="px-4 py-3 text-slate-700 dark:text-white/80 font-medium">{row.name}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.id}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.dept}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.doj}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.ctc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3">
            <SubmitBtn onClick={handleUpload} disabled={uploading}>
              {uploading ? "Importing…" : `Import ${preview.length} Employees`}
            </SubmitBtn>
            <OutlineBtn onClick={() => { setFile(null); setPreview(null); }}>Cancel</OutlineBtn>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Bulk Upload ───────────────────────────────────────────────────────────────
const BULK_EMPLOYEES = [
  { id: 1, name: "Amit Kamboj",  dept: "Engineering", doj: "01/04/2026", ctc: "₹6,00,000", status: "Ready" },
  { id: 2, name: "Priya Sharma", dept: "HR",          doj: "01/04/2026", ctc: "₹4,80,000", status: "Ready" },
  { id: 3, name: "Ravi Kumar",   dept: "Finance",     doj: "01/04/2026", ctc: "₹5,40,000", status: "Error" },
  { id: 4, name: "Sneha Verma",  dept: "Design",      doj: "01/04/2026", ctc: "₹4,20,000", status: "Ready" },
  { id: 5, name: "Rohan Mehta",  dept: "Sales",       doj: "15/04/2026", ctc: "₹3,60,000", status: "Ready" },
];

const StatusPill = ({ status }) => {
  const s = {
    Ready: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Error: "bg-red-50 text-red-600 border-red-200",
    Done:  "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${s[status] ?? "bg-slate-100 text-slate-500"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "Ready" ? "bg-emerald-400" : status === "Error" ? "bg-red-400" : "bg-blue-400"}`} />
      {status}
    </span>
  );
};

function BulkUpload() {
  const [rows, setRows]             = useState(BULK_EMPLOYEES);
  const [selected, setSelected]     = useState([]);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess]       = useState(false);

  const readyRows = rows.filter((r) => r.status === "Ready");
  const errorRows = rows.filter((r) => r.status === "Error");

  const toggleAll = () =>
    setSelected(selected.length === readyRows.length ? [] : readyRows.map((r) => r.id));

  const toggleOne = (id) =>
    setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const handleProcess = () => {
    setProcessing(true);
    setTimeout(() => {
      setRows((p) => p.map((r) => selected.includes(r.id) ? { ...r, status: "Done" } : r));
      setSelected([]);
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="space-y-5">
      {success && (
        <SuccessBanner
          message="Selected employees onboarded successfully!"
          onDismiss={() => setSuccess(false)}
        />
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total",  value: rows.length,       color: "border-l-slate-400"   },
          { label: "Ready",  value: readyRows.length,  color: "border-l-emerald-400" },
          { label: "Errors", value: errorRows.length,  color: "border-l-red-400"     },
        ].map(({ label, value, color }) => (
          <div key={label} className={`bg-white rounded-xl border border-slate-100 border-l-4 ${color} px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900`}>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white/90 mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      {errorRows.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
          <span className="font-semibold">{errorRows.length} row(s) have errors.</span>
          <span className="text-red-400">Fix missing fields before processing.</span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selected.length === readyRows.length && readyRows.length > 0}
                  onChange={toggleAll}
                  className="h-3.5 w-3.5 rounded border-slate-300 accent-blue-600"
                />
              </th>
              {["Name","Department","Date of Joining","CTC","Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-900">
            {rows.map((row) => (
              <tr key={row.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800 ${row.status === "Error" ? "bg-red-50/40 dark:bg-red-900/10" : ""}`}>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    disabled={row.status !== "Ready"}
                    checked={selected.includes(row.id)}
                    onChange={() => toggleOne(row.id)}
                    className="h-3.5 w-3.5 rounded border-slate-300 accent-blue-600 disabled:opacity-30"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-slate-700 dark:text-white/80">{row.name}</td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.dept}</td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.doj}</td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.ctc}</td>
                <td className="px-4 py-3"><StatusPill status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">
          {selected.length > 0 ? `${selected.length} employee(s) selected` : "Select rows to onboard"}
        </p>
        <div className="flex gap-3">
          <OutlineBtn onClick={() => setSelected([])}>Clear Selection</OutlineBtn>
          <SubmitBtn onClick={handleProcess} disabled={selected.length === 0 || processing}>
            {processing ? "Processing…" : `Onboard ${selected.length || ""} Selected`}
          </SubmitBtn>
        </div>
      </div>
    </div>
  );
}

// ── Page config ───────────────────────────────────────────────────────────────
const METHODS = [
  { id: "manual", label: "Manual Entry",  sub: "Fill a detailed form for a single employee",       icon: <IconUser />,   accent: "blue"    },
  { id: "excel",  label: "Upload Excel",  sub: "Import employees via .xlsx / .csv template",        icon: <IconUpload />, accent: "emerald" },
  { id: "bulk",   label: "Bulk Upload",   sub: "Review, validate and onboard multiple employees",   icon: <IconBulk />,   accent: "purple"  },
];

const ACCENT = {
  blue:    { card: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",         icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/40",         dot: "bg-blue-500"    },
  emerald: { card: "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20", icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40", dot: "bg-emerald-500" },
  purple:  { card: "border-purple-500 bg-purple-50 dark:bg-purple-900/20",    icon: "bg-purple-100 text-purple-600 dark:bg-purple-900/40",    dot: "bg-purple-500"  },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Onboarding() {
  const [method, setMethod] = useState("manual");

  return (
    <>
      <PageMeta title="Onboarding | HRMS" description="Employee onboarding" />

      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white/90">Employee Onboarding</h1>
            <p className="text-sm text-slate-400 mt-0.5">Add new employees manually, via Excel or in bulk</p>
          </div>
          <nav className="text-xs text-slate-400">
            Home <span className="mx-1">›</span> Onboarding
          </nav>
        </div>

        {/* Method selector cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {METHODS.map((m) => {
            const active = method === m.id;
            const accent = ACCENT[m.accent];
            return (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all shadow-sm
                  ${active
                    ? `${accent.card} border-opacity-100`
                    : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                  }`}
              >
                <div className={`flex items-center justify-center h-11 w-11 rounded-xl flex-shrink-0 transition-all
                  ${active ? accent.icon : "bg-slate-100 text-slate-400 dark:bg-slate-800"}`}>
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800 dark:text-white/90">{m.label}</p>
                    {active && <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">{m.sub}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content card */}
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 px-6 py-6">
          {method === "manual" && <ManualEntryForm />}
          {method === "excel"  && <ExcelUpload />}
          {method === "bulk"   && <BulkUpload />}
        </div>

      </div>
    </>
  );
}
