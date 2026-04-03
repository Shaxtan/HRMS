// components/Onboarding/ManualEntryForm.jsx
import { useState } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconCheck = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
const IconChevron = ({ open }) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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

// ── Shared UI primitives ──────────────────────────────────────────────────────
const Label = ({ children, required }) => (
  <label className="block text-xs font-medium text-slate-500 mb-1.5">
    {children}{required && <span className="text-red-400 ml-0.5">*</span>}
  </label>
);

const Input = ({ placeholder, value, onChange, type = "text" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white/90 transition-all"
  />
);

const Select = ({ value, onChange, options, placeholder }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white/90 transition-all"
  >
    <option value="">{placeholder ?? "Select"}</option>
    {options.map((o) => <option key={o} value={o}>{o}</option>)}
  </select>
);

const FormGrid = ({ children, cols = 2 }) => (
  <div className={`grid grid-cols-1 gap-4 sm:grid-cols-${cols}`}>
    {children}
  </div>
);

const SectionAccordion = ({ title, subtitle, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-slate-100 bg-white overflow-hidden dark:border-slate-700 dark:bg-slate-900">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-white/90">{title}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        <IconChevron open={open} />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700 pt-4">
          {children}
        </div>
      )}
    </div>
  );
};

const SuccessBanner = ({ message, onDismiss }) => (
  <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300">
    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-white flex-shrink-0">
      <IconCheck />
    </span>
    <span className="flex-1">{message}</span>
    <button onClick={onDismiss} className="text-emerald-400 hover:text-emerald-600">
      <IconX />
    </button>
  </div>
);

// ── Form state ────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  firstName: "", lastName: "", dob: "", gender: "", bloodGroup: "",
  personalEmail: "", mobile: "",
  empId: "", department: "", designation: "", jobType: "",
  doj: "", reportingManager: "", workLocation: "",
  ctc: "", salaryStructure: "", accountNumber: "", ifsc: "", bankName: "",
  pan: "", aadhaar: "", uan: "",
};

// ── Main exported component ───────────────────────────────────────────────────
export default function ManualEntryForm() {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [success, setSuccess] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = () => {
    setSuccess(true);
    setForm(EMPTY_FORM);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="space-y-4">
      {success && (
        <SuccessBanner
          message="Employee onboarded successfully! Welcome email sent."
          onDismiss={() => setSuccess(false)}
        />
      )}

      {/* Personal Information */}
      <SectionAccordion
        title="Personal Information"
        subtitle="Basic personal details of the employee"
        defaultOpen
      >
        <div className="space-y-4">
          <FormGrid cols={2}>
            <div><Label required>First Name</Label><Input value={form.firstName} onChange={set("firstName")} placeholder="Amit" /></div>
            <div><Label required>Last Name</Label><Input value={form.lastName} onChange={set("lastName")} placeholder="Kamboj" /></div>
          </FormGrid>
          <FormGrid cols={3}>
            <div><Label required>Date of Birth</Label><Input type="date" value={form.dob} onChange={set("dob")} /></div>
            <div><Label>Gender</Label><Select value={form.gender} onChange={set("gender")} options={["Male","Female","Other"]} /></div>
            <div><Label>Blood Group</Label><Select value={form.bloodGroup} onChange={set("bloodGroup")} options={["A+","A−","B+","B−","AB+","AB−","O+","O−"]} /></div>
          </FormGrid>
          <FormGrid cols={2}>
            <div><Label required>Personal Email</Label><Input type="email" value={form.personalEmail} onChange={set("personalEmail")} placeholder="amit@gmail.com" /></div>
            <div><Label required>Mobile Number</Label><Input type="tel" value={form.mobile} onChange={set("mobile")} placeholder="9876543210" /></div>
          </FormGrid>
        </div>
      </SectionAccordion>

      {/* Employment Details */}
      <SectionAccordion title="Employment Details" subtitle="Role, department and joining information">
        <div className="space-y-4">
          <FormGrid cols={3}>
            <div><Label required>Employee ID</Label><Input value={form.empId} onChange={set("empId")} placeholder="EMP001" /></div>
            <div><Label required>Department</Label><Select value={form.department} onChange={set("department")} options={["Engineering","HR","Finance","Sales","Operations","Legal","Design"]} /></div>
            <div><Label required>Designation</Label><Input value={form.designation} onChange={set("designation")} placeholder="Software Engineer" /></div>
          </FormGrid>
          <FormGrid cols={3}>
            <div><Label>Job Type</Label><Select value={form.jobType} onChange={set("jobType")} options={["Permanent","Contract","Intern","Probation","Part-time"]} /></div>
            <div><Label required>Date of Joining</Label><Input type="date" value={form.doj} onChange={set("doj")} /></div>
            <div><Label>Work Location</Label><Input value={form.workLocation} onChange={set("workLocation")} placeholder="Mumbai / Remote" /></div>
          </FormGrid>
          <FormGrid cols={2}>
            <div><Label>Reporting Manager</Label><Input value={form.reportingManager} onChange={set("reportingManager")} placeholder="Manager name" /></div>
            <div><Label>Official Email</Label><Input type="email" placeholder="amit@company.com" /></div>
          </FormGrid>
        </div>
      </SectionAccordion>

      {/* Salary & Bank */}
      <SectionAccordion title="Salary & Bank Details" subtitle="CTC structure and bank account for payroll">
        <div className="space-y-4">
          <FormGrid cols={2}>
            <div><Label required>CTC (Annual ₹)</Label><Input type="number" value={form.ctc} onChange={set("ctc")} placeholder="600000" /></div>
            <div><Label>Salary Structure</Label><Select value={form.salaryStructure} onChange={set("salaryStructure")} options={["Standard","Executive","Contractual","Intern"]} /></div>
          </FormGrid>
          <FormGrid cols={3}>
            <div><Label required>Bank Account No.</Label><Input value={form.accountNumber} onChange={set("accountNumber")} placeholder="XXXXXXXXXXXX" /></div>
            <div><Label required>IFSC Code</Label><Input value={form.ifsc} onChange={set("ifsc")} placeholder="HDFC0001234" /></div>
            <div><Label required>Bank Name</Label><Input value={form.bankName} onChange={set("bankName")} placeholder="HDFC Bank" /></div>
          </FormGrid>
        </div>
      </SectionAccordion>

      {/* Statutory & Documents */}
      <SectionAccordion title="Statutory & Documents" subtitle="PAN, Aadhaar and UAN for compliance">
        <div className="space-y-4">
          <FormGrid cols={3}>
            <div><Label required>PAN Number</Label><Input value={form.pan} onChange={set("pan")} placeholder="ABCDE1234F" /></div>
            <div><Label required>Aadhaar Number</Label><Input value={form.aadhaar} onChange={set("aadhaar")} placeholder="XXXX XXXX XXXX" /></div>
            <div><Label>UAN Number</Label><Input value={form.uan} onChange={set("uan")} placeholder="100XXXXXXXXX" /></div>
          </FormGrid>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Upload Documents</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Photo","PAN Card","Aadhaar Card","Offer Letter"].map((doc) => (
                <label key={doc} className="flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-200 px-3 py-4 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <span className="text-slate-300 group-hover:text-blue-400 transition-colors"><IconFile /></span>
                  <span className="text-xs text-slate-400 group-hover:text-blue-500">{doc}</span>
                  <input type="file" className="sr-only" />
                </label>
              ))}
            </div>
          </div>
        </div>
      </SectionAccordion>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm"
        >
          Onboard Employee
        </button>
        <button
          onClick={() => setForm(EMPTY_FORM)}
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Reset
        </button>
      </div>
    </div>
  );
}