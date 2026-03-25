// pages/Compliance/Compliance.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Modal } from "../../components/ui/modal";

// ── Tab config ────────────────────────────────────────────────────────────────
const TABS = ["PF", "ESIC", "TDS", "Group Insurance"];

// ── Reusable ──────────────────────────────────────────────────────────────────
const Label = ({ children, required }) => (
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const Input = ({ placeholder, value, onChange, type = "text" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
  />
);

const Select = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
  >
    <option value="">Select</option>
    {options.map((o) => (
      <option key={o} value={o}>{o}</option>
    ))}
  </select>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <div className="relative mt-0.5 flex-shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="h-4 w-4 rounded border border-gray-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all dark:border-gray-600 dark:bg-gray-800 flex items-center justify-center">
        {checked && (
          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 10 8">
            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
    <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
  </label>
);

const InfoBox = ({ children, color = "blue" }) => {
  const colors = {
    blue:   "bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
    amber:  "bg-amber-50 border-amber-100 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300",
    red:    "bg-red-50 border-red-100 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
  };
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${colors[color]}`}>
      {children}
    </div>
  );
};

const SaveBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm"
  >
    Save
  </button>
);

const StatRow = ({ label, value }) => (
  <div>
    <p className="text-sm font-semibold text-gray-800 dark:text-white/90">{label}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{value}</p>
  </div>
);

// ── PF Section ────────────────────────────────────────────────────────────────
function PFSection() {
  const [saved, setSaved] = useState(false);
  const [epfNumber, setEpfNumber] = useState("");
  const [deductionCycle] = useState("Monthly");
  const [checks, setChecks] = useState({
    employerInCTC:    true,
    edliInCTC:        true,
    basicOnly:        true,
    wageLimit:        true,
  });

  const toggle = (k) => setChecks((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="space-y-5">
      {/* EPF Number + Deduction Cycle */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label required>EPF Number</Label>
          <Input
            value={epfNumber}
            onChange={(e) => setEpfNumber(e.target.value)}
            placeholder="e.g. MH/PUN/12345"
          />
        </div>
        <div>
          <Label>Deduction Cycle</Label>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            {deductionCycle}
          </div>
        </div>
      </div>

      {/* PF Compliance Setup */}
      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-2">
          PF compliance setup
        </p>
        <InfoBox color="blue">Please choose your PF settings.</InfoBox>

        <div className="mt-4 space-y-3">
          <Checkbox
            label="Include employer contribution to PF in employee CTC"
            checked={checks.employerInCTC}
            onChange={() => toggle("employerInCTC")}
          />
          <Checkbox
            label="Include PF EDLI + admin charges in employee CTC"
            checked={checks.edliInCTC}
            onChange={() => toggle("edliInCTC")}
          />
          <Checkbox
            label="Use only basic salary for calculating PF"
            checked={checks.basicOnly}
            onChange={() => toggle("basicOnly")}
          />
          <Checkbox
            label="Use PF limit of ₹15,000 while calculating contributions"
            checked={checks.wageLimit}
            onChange={() => toggle("wageLimit")}
          />
        </div>
      </div>

      {/* Contribution rates (shown after save) */}
      {saved && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 space-y-2 dark:border-gray-700 dark:bg-gray-800/50">
          <StatRow label="Employee Contribution Rate" value="12.00% Of Actual PF Wage" />
          <StatRow label="Employer Contribution Rate" value="13.00% of Actual PF Wage" />
        </div>
      )}

      <SaveBtn onClick={() => setSaved(true)} />
    </div>
  );
}

// ── ESIC Section ──────────────────────────────────────────────────────────────
function ESICSection() {
  const [status, setStatus]       = useState("");
  const [esiNumber, setEsiNumber] = useState("");
  const [saved, setSaved]         = useState(false);
  const deductionCycle            = "Monthly";

  const handleSave = () => {
    if (!status) return;
    setSaved(true);
  };

  return (
    <div className="space-y-5">
      <InfoBox color="blue">
        ESI is mandatory if the organization size is more than 10 employees. ESI
        should be deducted for employees whose salary is less than ₹21,000.
      </InfoBox>

      <div>
        <Label>ESI Status</Label>
        <Select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setSaved(false); }}
          options={["Enabled", "Disabled"]}
        />
      </div>

      {/* Extra fields when Enabled */}
      {status === "Enabled" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label required>ESI Number</Label>
            <Input
              value={esiNumber}
              onChange={(e) => setEsiNumber(e.target.value)}
              placeholder="e.g. MH/ESI/56789"
            />
          </div>
          <div>
            <Label>Deduction Cycle</Label>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              {deductionCycle}
            </div>
          </div>
        </div>
      )}

      {/* Contribution rates shown after save + Enabled */}
      {saved && status === "Enabled" && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 space-y-2 dark:border-gray-700 dark:bg-gray-800/50">
          <StatRow label="Employees' Contribution" value="0.75% of Gross Pay" />
          <StatRow label="Employer's Contribution"  value="3.25% of Gross Pay" />
        </div>
      )}

      <SaveBtn onClick={handleSave} />
    </div>
  );
}

// ── TDS Section ───────────────────────────────────────────────────────────────
function TDSSection() {
  const [status, setStatus] = useState("Enabled");
  const [saved, setSaved]   = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-2">
          TDS Payments
        </p>
        <InfoBox color="amber">
          Please note that disabling TDS payment does not prevent the deduction
          from your employees' payslips.
        </InfoBox>
      </div>

      <div>
        <Label>Salary TDS Payment Status</Label>
        <Select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setSaved(false); }}
          options={["Enabled", "Disabled"]}
        />
      </div>

      {saved && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800/50">
          <StatRow
            label="TDS Payment Status"
            value={status === "Enabled" ? "Active — TDS will be paid to the government" : "Disabled — TDS deducted but not remitted via system"}
          />
        </div>
      )}

      <SaveBtn onClick={() => setSaved(true)} />
    </div>
  );
}

// ── Group Insurance Section ───────────────────────────────────────────────────
function GroupInsuranceSection() {
  const [status, setStatus] = useState("Disabled");
  const [saved, setSaved]   = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-2">
          Group Insurance
        </p>
        <InfoBox color="amber">
          Disabling Group Insurance does not remove its deduction from your
          employees' payslips.
        </InfoBox>
      </div>

      <div>
        <Label>Salary Group Insurance Status</Label>
        <Select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setSaved(false); }}
          options={["Enabled", "Disabled"]}
        />
      </div>

      {saved && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800/50">
          <StatRow
            label="Group Insurance Status"
            value={status === "Enabled" ? "Active — Group Insurance deduction is active" : "Disabled — Deduction may still appear on payslips"}
          />
        </div>
      )}

      <SaveBtn onClick={() => setSaved(true)} />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Compliance() {
  const [activeTab, setActiveTab] = useState("PF");

  const tabContent = {
    "PF":               <PFSection />,
    "ESIC":             <ESICSection />,
    "TDS":              <TDSSection />,
    "Group Insurance":  <GroupInsuranceSection />,
  };

  return (
    <>
      <PageMeta
        title="Compliance | HRMS"
        description="Set up PF, ESIC, TDS and Group Insurance compliance"
      />

      <div className="space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
            Compliance
          </h1>
          <nav className="text-xs text-gray-400">
            Home <span className="mx-1">›</span> Compliance
          </nav>
        </div>

        {/* Intro */}
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
            Set up compliance
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            To provide ESI and PF to your employees, enable these options and add
            your PF and ESI numbers.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">

          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-px
                  ${activeTab === tab
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab body */}
          <div className="px-6 py-6">
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
    </>
  );
}