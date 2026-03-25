// pages/Payouts/Payouts.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../MyComponents/Table/DataTable";
import Attendance from "../Dashboard/AttendanceSummaryRow";
import { Eye, Download, RefreshCw } from "lucide-react";

// ── Mock Data ─────────────────────────────────────────────────────────────────
const allPayouts = [
  { id: "EMP001", name: "Amit Kamboj",     bankDetails: "HDFC •••• 4521", netPay: 50000, status: "Processed", payoutDate: "31/03/2026", month: "Mar-2026" },
  { id: "EMP002", name: "Shauryam Raghaw", bankDetails: "SBI  •••• 8832", netPay: 30000, status: "Pending",   payoutDate: "31/03/2026", month: "Mar-2026" },
  { id: "EMP003", name: "Shivam Malik",    bankDetails: "ICICI •••• 1193", netPay: 35000, status: "On Hold",  payoutDate: "31/03/2026", month: "Mar-2026" },
  { id: "EMP004", name: "Priya Sharma",    bankDetails: "Axis •••• 7745", netPay: 42000, status: "Processed", payoutDate: "31/03/2026", month: "Mar-2026" },
  { id: "EMP005", name: "Ravi Kumar",      bankDetails: "PNB  •••• 3301", netPay: 28000, status: "Processed", payoutDate: "31/03/2026", month: "Mar-2026" },
  { id: "EMP001", name: "Amit Kamboj",     bankDetails: "HDFC •••• 4521", netPay: 50000, status: "Processed", payoutDate: "28/02/2026", month: "Feb-2026" },
  { id: "EMP002", name: "Shauryam Raghaw", bankDetails: "SBI  •••• 8832", netPay: 30000, status: "Processed", payoutDate: "28/02/2026", month: "Feb-2026" },
  { id: "EMP003", name: "Shivam Malik",    bankDetails: "ICICI •••• 1193", netPay: 35000, status: "Processed", payoutDate: "28/02/2026", month: "Feb-2026" },
  { id: "EMP004", name: "Priya Sharma",    bankDetails: "Axis •••• 7745", netPay: 42000, status: "Pending",   payoutDate: "28/02/2026", month: "Feb-2026" },
  { id: "EMP005", name: "Ravi Kumar",      bankDetails: "PNB  •••• 3301", netPay: 28000, status: "Processed", payoutDate: "28/02/2026", month: "Feb-2026" },
];

const MONTHS = [
  "Mar-2026","Feb-2026","Jan-2026","Dec-2025","Nov-2025","Oct-2025",
  "Sep-2025","Aug-2025","Jul-2025","Jun-2025","May-2025","Apr-2025",
];

const PAYOUT_DATES = {
  "Mar-2026":"31 Mar 2026","Feb-2026":"28 Feb 2026","Jan-2026":"31 Jan 2026",
  "Dec-2025":"31 Dec 2025","Nov-2025":"30 Nov 2025","Oct-2025":"31 Oct 2025",
  "Sep-2025":"30 Sep 2025","Aug-2025":"31 Aug 2025","Jul-2025":"31 Jul 2025",
  "Jun-2025":"30 Jun 2025","May-2025":"31 May 2025","Apr-2025":"30 Apr 2025",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function daysLeft(month) {
  const [mon, year] = month.split("-");
  const payout = new Date(new Date(`${mon} 1, ${year}`).getFullYear(), new Date(`${mon} 1, ${year}`).getMonth() + 1, 0);
  const diff = Math.ceil((payout - new Date()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function fmt(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    Processed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Pending:   "bg-amber-50 text-amber-700 border border-amber-200",
    "On Hold": "bg-red-50 text-red-600 border border-red-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${styles[status] ?? "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  const accents = {
    blue:    "border-l-blue-400",
    amber:   "border-l-amber-400",
    emerald: "border-l-emerald-400",
    slate:   "border-l-slate-400",
  };
  return (
    <div className={`bg-white rounded-xl border border-slate-100 border-l-4 ${accents[accent]} px-5 py-4 shadow-sm`}>
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ── Action Button ─────────────────────────────────────────────────────────────
function ActionBtn({ onClick, title, children, danger }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center h-7 w-7 rounded-lg border text-xs transition-all
        ${danger
          ? "border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
          : "border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        }`}
    >
      {children}
    </button>
  );
}

// ── Columns ───────────────────────────────────────────────────────────────────
const columns = [
  { key: "id",          header: "Emp ID"        },
  { key: "name",        header: "Employee Name"  },
  { key: "bankDetails", header: "Bank Details"   },
  {
    key: "netPay",
    header: "Net Pay",
    render: (row) => <span className="font-semibold text-slate-700">{fmt(row.netPay)}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  { key: "payoutDate",  header: "Payout Date"   },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Payouts() {
  const [selectedMonth, setSelectedMonth] = useState("Mar-2026");

  const filtered   = allPayouts.filter((p) => p.month === selectedMonth);
  const total      = filtered.length;
  const processed  = filtered.filter((p) => p.status === "Processed").length;
  const pending    = filtered.filter((p) => p.status === "Pending").length;
  const onHold     = filtered.filter((p) => p.status === "On Hold").length;
  const days       = daysLeft(selectedMonth);
  const payoutDate = PAYOUT_DATES[selectedMonth] ?? "—";

  const handleView     = (row) => console.log("View",     row);
  const handleDownload = (row) => console.log("Download", row);
  const handleRetry    = (row) => console.log("Retry",    row);

  return (
    <>

      <PageMeta
        title="Payouts | HRMS"
        description="Monthly payroll payout management"
      />

      <div className="space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">Payouts</h1>
          <nav className="text-xs text-slate-400">
            Home <span className="mx-1">›</span> Payouts
          </nav>
        </div>

        {/* Month Selector + Status Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
              {processed} Processed
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 inline-block" />
              {pending} Pending
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 inline-block" />
              {onHold} On Hold
            </span>
          </div>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 cursor-pointer"
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            label="Total Employees"
            value={total}
            sub={`for ${selectedMonth}`}
            accent="blue"
          />
          <StatCard
            label="Days Left to Payout"
            value={days === 0 ? "Today" : `${days} days`}
            sub={days === 0 ? "Payout due today" : "until payout"}
            accent="amber"
          />
          <StatCard
            label="Payout Date"
            value={payoutDate}
            accent="emerald"
          />
          <StatCard
            label="Status"
            value={`${processed}/${total}`}
            sub="Processed"
            accent="slate"
          />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filtered}
          actions={(row) => (
            <>
              <ActionBtn title="View details" onClick={() => handleView(row)}>
                <Eye size={13} />
              </ActionBtn>

              <ActionBtn title="Download payslip" onClick={() => handleDownload(row)}>
                <Download size={13} />
              </ActionBtn>

              {row.status !== "Processed" && (
                <ActionBtn title="Retry / Process" onClick={() => handleRetry(row)}>
                  <RefreshCw size={13} />
                </ActionBtn>
              )}
            </>
          )}
        />
      </div>
    </>
  );
}