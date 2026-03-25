// pages/Payroll/PayConsultant.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../MyComponents/Table/DataTable";
import Attendance from "../Dashboard/AttendanceSummaryRow";
import { Pencil, Trash2, X } from "lucide-react";

// ── Mock Data ─────────────────────────────────────────────────────────────────
const initialData = [
  { id: 1, name: "Rajesh Consultancy",  invoice: "INV-001", paymentDate: "10/03/2026", amount: 75000, gst: 13500, remarks: "Monthly retainer",  month: "Mar-2026" },
  { id: 2, name: "Priya Tech Services", invoice: "INV-002", paymentDate: "12/03/2026", amount: 50000, gst: 9000,  remarks: "IT Support",         month: "Mar-2026" },
  { id: 3, name: "Verma & Associates",  invoice: "INV-003", paymentDate: "15/03/2026", amount: 30000, gst: 5400,  remarks: "Legal advisory",     month: "Mar-2026" },
  { id: 4, name: "Rajesh Consultancy",  invoice: "INV-101", paymentDate: "08/02/2026", amount: 75000, gst: 13500, remarks: "Monthly retainer",  month: "Feb-2026" },
  { id: 5, name: "Priya Tech Services", invoice: "INV-102", paymentDate: "10/02/2026", amount: 50000, gst: 9000,  remarks: "IT Support",         month: "Feb-2026" },
];

const MONTHS = [
  "Mar-2026","Feb-2026","Jan-2026","Dec-2025","Nov-2025","Oct-2025",
  "Sep-2025","Aug-2025","Jul-2025","Jun-2025","May-2025","Apr-2025",
];

function fmt(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
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

// ── Modal ─────────────────────────────────────────────────────────────────────
function ConsultantModal({ onClose, onSave, initial, selectedMonth }) {
  const [form, setForm] = useState(
    initial ?? {
      name: "", invoice: "", paymentDate: "", amount: "",
      gst: "", remarks: "", month: selectedMonth,
    }
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.invoice || !form.paymentDate || !form.amount) return;
    onSave({ ...form, amount: Number(form.amount), gst: Number(form.gst) });
  }

  const fields = [
    { label: "Name",         key: "name",        type: "text",   placeholder: "Consultant / firm name"  },
    { label: "Invoice",      key: "invoice",      type: "text",   placeholder: "INV-001"                 },
    { label: "Payment Date", key: "paymentDate",  type: "text",   placeholder: "DD/MM/YYYY"              },
    { label: "Amount (₹)",   key: "amount",       type: "number", placeholder: "0"                       },
    { label: "GST (₹)",      key: "gst",          type: "number", placeholder: "0"                       },
    { label: "Remarks",      key: "remarks",      type: "text",   placeholder: "Optional note"           },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">
            {initial ? "Edit Consultant" : "Add Consultant"}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {fields.map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 placeholder:text-slate-300"
              />
            </div>
          ))}

          {/* Month */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Month</label>
            <select
              value={form.month}
              onChange={(e) => set("month", e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            >
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Footer */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm border border-slate-200 text-slate-600 rounded-lg py-2 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 text-sm bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-all font-medium"
            >
              {initial ? "Save Changes" : "Add Consultant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PayConsultant() {
  const [selectedMonth, setSelectedMonth] = useState("Mar-2026");
  const [data, setData]                   = useState(initialData);
  const [modalOpen, setModalOpen]         = useState(false);
  const [editRow, setEditRow]             = useState(null);

  const filtered = data.filter((r) => r.month === selectedMonth);
  const totalAmt = filtered.reduce((s, r) => s + r.amount, 0);
  const totalGst = filtered.reduce((s, r) => s + r.gst, 0);

  function handleAdd(form) {
    setData((d) => [...d, { ...form, id: Date.now() }]);
    setModalOpen(false);
  }

  function handleEdit(form) {
    setData((d) => d.map((r) => (r.id === editRow.id ? { ...form, id: r.id } : r)));
    setEditRow(null);
  }

  function handleDelete(row) {
    if (confirm(`Delete entry for "${row.name}"?`))
      setData((d) => d.filter((r) => r.id !== row.id));
  }

  const columns = [
    { key: "id",          header: "#",            render: (_, i) => <span className="text-slate-400">{i + 1}</span> },
    { key: "name",        header: "Name"          },
    { key: "invoice",     header: "Invoice"       },
    { key: "paymentDate", header: "Payment Date"  },
    { key: "amount",      header: "Amount",       render: (row) => <span className="font-semibold text-slate-700">{fmt(row.amount)}</span> },
    { key: "gst",         header: "GST",          render: (row) => <span className="text-slate-600">{fmt(row.gst)}</span> },
    { key: "remarks",     header: "Remarks",      render: (row) => <span className="text-slate-400 text-xs">{row.remarks || "—"}</span> },
  ];

  return (
    <>
      {modalOpen && (
        <ConsultantModal
          onClose={() => setModalOpen(false)}
          onSave={handleAdd}
          selectedMonth={selectedMonth}
        />
      )}

      {editRow && (
        <ConsultantModal
          onClose={() => setEditRow(null)}
          onSave={handleEdit}
          initial={editRow}
          selectedMonth={selectedMonth}
        />
      )}

      {/* <Attendance /> */}

      <PageMeta
        title="Pay Consultant | HRMS"
        description="Consultant payment management"
      />

      <div className="space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">Pay Consultant</h1>
          <nav className="text-xs text-slate-400">
            Home <span className="mx-1">›</span> Payroll <span className="mx-1">›</span> Pay Consultant
          </nav>
        </div>

        {/* Summary Cards */}
        {/*   */}

        {/* Controls: Month filter + Add button */}
        <div className="flex items-center justify-between gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 cursor-pointer"
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm"
          >
            <span className="text-base leading-none">+</span>
            Add Consultant
          </button>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filtered}
          actions={(row) => (
            <>
              <ActionBtn title="Edit" onClick={() => setEditRow(row)}>
                <Pencil size={13} />
              </ActionBtn>
              <ActionBtn title="Delete" onClick={() => handleDelete(row)} danger>
                <Trash2 size={13} />
              </ActionBtn>
            </>
          )}
        />
      </div>
    </>
  );
}