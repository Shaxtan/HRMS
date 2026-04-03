// pages/Recruit/OfferLetter.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../MyComponents/Table/DataTable";
import { Eye, Download, RefreshCw, X } from "lucide-react";

const DEPARTMENTS = ["Engineering", "HR", "Finance", "Sales", "Operations", "Legal", "Design", "TEST"];
const JOB_TYPES   = ["Permanent", "Contractual", "Apprentice", "Consultant"];

const EMPTY_FORM = {
  candidateName: "",
  fatherName: "",
  postingTitle: "",
  department: "",
  email: "",
  mobile: "",
  address: "",
  jobType: "",
  joiningDate: "",
  expiryDate: "",
  ctc: "",
};

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    Sent:     "bg-blue-50 text-blue-700 border border-blue-200",
    Pending:  "bg-amber-50 text-amber-700 border border-amber-200",
    Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Expired:  "bg-red-50 text-red-600 border border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
        styles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

// ── Action Button ─────────────────────────────────────────────────────────────
function ActionBtn({ onClick, title, children, danger }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center h-7 w-7 rounded-lg border text-xs transition-all
        ${
          danger
            ? "border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            : "border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        }`}
    >
      {children}
    </button>
  );
}

// ── Field Components ──────────────────────────────────────────────────────────
function FieldLabel({ children, required }) {
  return (
    <label className="block text-xs font-medium text-slate-500 mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

function FieldInput({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
    />
  );
}

function FieldSelect({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
    >
      <option value="">{placeholder ?? "Select"}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">
        {children}
      </p>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function GenerateModal({ onClose, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  function handleSave() {
    if (
      !form.candidateName ||
      !form.postingTitle ||
      !form.department ||
      !form.email ||
      !form.mobile ||
      !form.jobType ||
      !form.joiningDate ||
      !form.expiryDate ||
      !form.ctc
    )
      return;

    onSave({ ...form, id: Date.now(), status: "Pending" });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-base font-semibold text-slate-800">
            Generate Offer Letter
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-6 flex-1">
          {/* Basic Information */}
          <div>
            <SectionHeading>Basic Information</SectionHeading>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Candidate Name</FieldLabel>
                  <FieldInput
                    value={form.candidateName}
                    onChange={set("candidateName")}
                    placeholder="Enter candidate name"
                  />
                </div>
                <div>
                  <FieldLabel>Father Name</FieldLabel>
                  <FieldInput
                    value={form.fatherName}
                    onChange={set("fatherName")}
                    placeholder="Enter father's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Posting Title</FieldLabel>
                  <FieldInput
                    value={form.postingTitle}
                    onChange={set("postingTitle")}
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div>
                  <FieldLabel required>Department Name</FieldLabel>
                  <FieldSelect
                    value={form.department}
                    onChange={set("department")}
                    options={DEPARTMENTS}
                    placeholder="Select Department"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Email ID</FieldLabel>
                  <FieldInput
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="candidate@email.com"
                  />
                </div>
                <div>
                  <FieldLabel required>Mobile No</FieldLabel>
                  <FieldInput
                    type="tel"
                    value={form.mobile}
                    onChange={set("mobile")}
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Address</FieldLabel>
                <textarea
                  value={form.address}
                  onChange={set("address")}
                  placeholder="Enter address"
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div>
            <SectionHeading>Employment Information</SectionHeading>
            <div className="space-y-4">
              <div>
                <FieldLabel required>Job Type</FieldLabel>
                <FieldSelect
                  value={form.jobType}
                  onChange={set("jobType")}
                  options={JOB_TYPES}
                  placeholder="Select Job Type"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Expected Joining Date</FieldLabel>
                  <FieldInput
                    type="date"
                    value={form.joiningDate}
                    onChange={set("joiningDate")}
                  />
                </div>
                <div>
                  <FieldLabel required>Offer Expiry Date</FieldLabel>
                  <FieldInput
                    type="date"
                    value={form.expiryDate}
                    onChange={set("expiryDate")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Earning Information */}
          <div>
            <SectionHeading>Earning Information</SectionHeading>
            <div>
              <FieldLabel required>CTC</FieldLabel>
              <FieldInput
                type="number"
                value={form.ctc}
                onChange={set("ctc")}
                placeholder="e.g. 600000"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, accent }) {
  const accents = {
    blue: "border-l-blue-400",
    amber: "border-l-amber-400",
    emerald: "border-l-emerald-400",
    red: "border-l-red-400",
  };
  return (
    <div
      className={`bg-white rounded-xl border border-slate-100 border-l-4 ${accents[accent]} px-5 py-4 shadow-sm`}
    >
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-slate-800 leading-tight">
        {value}
      </p>
    </div>
  );
}

// ── Columns ───────────────────────────────────────────────────────────────────
const columns = [
  {
    key: "id",
    header: "#",
    render: (_, i) => <span className="text-slate-400">{i + 1}</span>,
  },
  { key: "candidateName", header: "Candidate" },
  { key: "postingTitle", header: "Posting Title" },
  { key: "department", header: "Department" },
  { key: "jobType", header: "Job Type" },
  { key: "joiningDate", header: "Joining Date" },
  { key: "expiryDate", header: "Expiry Date" },
  {
    key: "ctc",
    header: "CTC",
    render: (row) => (
      <span className="font-semibold text-slate-700">
        ₹{Number(row.ctc || 0).toLocaleString("en-IN")}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function OfferLetter() {
  const [letters, setLetters] = useState([]); // no mock data
  const [modalOpen, setModalOpen] = useState(false);

  function handleSave(form) {
    setLetters((p) => [...p, form]);
    setModalOpen(false);
  }

  const total = letters.length;
  const sent = letters.filter((l) => l.status === "Sent").length;
  const accepted = letters.filter((l) => l.status === "Accepted").length;
  const expired = letters.filter((l) => l.status === "Expired").length;

  return (
    <>
      {modalOpen && (
        <GenerateModal onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}

      <PageMeta
        title="Offer Letter | HRMS"
        description="Manage and generate offer letters"
      />

      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">Offer Letter</h1>
          <nav className="text-xs text-slate-400">
            Home <span className="mx-1">›</span> Recruit{" "}
            <span className="mx-1">›</span> Offer Letter
          </nav>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Letters" value={total} accent="blue" />
          <StatCard label="Sent" value={sent} accent="amber" />
          <StatCard label="Accepted" value={accepted} accent="emerald" />
          <StatCard label="Expired" value={expired} accent="red" />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm"
          >
            <span className="text-base leading-none">+</span>
            Generate Offer Letter
          </button>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={letters}
          actions={(row) => (
            <>
              <ActionBtn
                title="Preview"
                onClick={() => console.log("Preview", row)}
              >
                <Eye size={13} />
              </ActionBtn>
              <ActionBtn
                title="Download"
                onClick={() => console.log("Download", row)}
              >
                <Download size={13} />
              </ActionBtn>
              {row.status === "Pending" && (
                <ActionBtn
                  title="Resend"
                  onClick={() => console.log("Resend", row)}
                >
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
