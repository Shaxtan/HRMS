import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Modal } from "../../components/ui/modal";

const Compliance = () => {
  const [activeTab, setActiveTab] = useState("pf"); // pf | challans | reports

  const [pfConfigs] = useState([
    {
      id: "pf1",
      type: "PF",
      registrationNo: "MH/PUN/12345",
      wageLimit: "₹ 15,000",
      employerRate: "12%",
      employeeRate: "12%",
      status: "Active",
    },
    {
      id: "esi1",
      type: "ESI",
      registrationNo: "MH/ESI/56789",
      wageLimit: "₹ 21,000",
      employerRate: "3.25%",
      employeeRate: "0.75%",
      status: "Active",
    },
    {
      id: "pt1",
      type: "PT",
      registrationNo: "MH/PT/24680",
      wageLimit: "-",
      employerRate: "-",
      employeeRate: "State Slab",
      status: "Active",
    },
  ]);

  const [challans] = useState([
    {
      id: "ch1",
      type: "PF",
      month: "January 2026",
      dueDate: "2026-02-15",
      amount: "₹ 2,40,000",
      status: "Paid", // Paid | Pending | Overdue
      paidOn: "2026-02-10",
    },
    {
      id: "ch2",
      type: "ESI",
      month: "January 2026",
      dueDate: "2026-02-21",
      amount: "₹ 85,000",
      status: "Pending",
      paidOn: "-",
    },
    {
      id: "ch3",
      type: "PT",
      month: "Q4 2025-26",
      dueDate: "2026-04-30",
      amount: "₹ 30,000",
      status: "Pending",
      paidOn: "-",
    },
  ]);

  const [reports] = useState([
    {
      id: "r1",
      type: "PF",
      name: "PF ECR File",
      period: "January 2026",
      format: "TXT",
    },
    {
      id: "r2",
      type: "ESI",
      name: "ESI Contribution Sheet",
      period: "January 2026",
      format: "Excel",
    },
    {
      id: "r3",
      type: "PT",
      name: "Professional Tax Summary",
      period: "FY 2025-26 YTD",
      format: "PDF",
    },
  ]);

  // Modals
  const [isChallanModalOpen, setIsChallanModalOpen] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState(null);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const openChallanModal = (ch) => {
    setSelectedChallan(ch);
    setIsChallanModalOpen(true);
  };

  const openReportModal = (rep) => {
    setSelectedReport(rep);
    setIsReportModalOpen(true);
  };

  return (
    <>
      <PageMeta
        title="Compliance | HRMS Admin"
        description="Manage PF, ESI, PT compliance, challans and statutory reports."
      />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-theme-xl font-semibold text-gray-900 dark:text-white/90">
              Compliance
            </h1>
            <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
              PF, ESI, PT configurations, challans and statutory reports in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full bg-gray-50 p-1 dark:bg-gray-900">
              <TabButton
                label="PF / ESI / PT"
                active={activeTab === "pf"}
                onClick={() => setActiveTab("pf")}
              />
              <TabButton
                label="Challans"
                active={activeTab === "challans"}
                onClick={() => setActiveTab("challans")}
              />
              <TabButton
                label="Statutory Reports"
                active={activeTab === "reports"}
                onClick={() => setActiveTab("reports")}
              />
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-3 md:grid-cols-3">
          <SummaryCard
            label="Active Registrations"
            value={pfConfigs.length}
            badge="PF · ESI · PT"
            badgeColor="bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-900/20 dark:text-blue-light-300"
          />
          <SummaryCard
            label="Pending Challans"
            value={challans.filter((c) => c.status !== "Paid").length}
            badge="To be paid"
            badgeColor="bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-200"
          />
          <SummaryCard
            label="Reports Available"
            value={reports.length}
            badge="Downloads"
            badgeColor="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
          />
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]">
          {activeTab === "pf" && <PfEsiPtSection pfConfigs={pfConfigs} />}

          {activeTab === "challans" && (
            <ChallansSection
              challans={challans}
              onOpenChallan={openChallanModal}
            />
          )}

          {activeTab === "reports" && (
            <ReportsSection reports={reports} onOpenReport={openReportModal} />
          )}
        </div>

        {/* Challan modal */}
        <Modal
          isOpen={isChallanModalOpen}
          onClose={() => setIsChallanModalOpen(false)}
          className="max-w-[640px] p-6 lg:p-8"
        >
          {selectedChallan && (
            <ChallanModalContent
              challan={selectedChallan}
              onClose={() => setIsChallanModalOpen(false)}
            />
          )}
        </Modal>

        {/* Report modal */}
        <Modal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          className="max-w-[640px] p-6 lg:p-8"
        >
          {selectedReport && (
            <ReportModalContent
              report={selectedReport}
              onClose={() => setIsReportModalOpen(false)}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

/* Reusable */

const TabButton = ({ label, active, onClick }) => (
  <button
    className={`px-3 py-1.5 text-theme-xs rounded-full ${
      active
        ? "bg-white text-gray-900 shadow-theme-xs dark:bg-gray-800"
        : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const SummaryCard = ({ label, value, badge, badgeColor }) => (
  <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-theme-xs text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white/90">
          {value}
        </p>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-theme-xs font-medium ${badgeColor}`}
      >
        {badge}
      </span>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let cls =
    "inline-flex items-center rounded-full px-2.5 py-1 text-theme-xs font-medium ";
  if (status === "Active") {
    cls +=
      "bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-200";
  } else if (status === "Paid") {
    cls +=
      "bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-200";
  } else if (status === "Pending") {
    cls +=
      "bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-200";
  } else if (status === "Overdue") {
    cls +=
      "bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-200";
  } else {
    cls +=
      "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
  }

  return (
    <span className={cls}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex gap-3">
    <div className="w-40 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
      {label}
    </div>
    <div className="flex-1 text-theme-sm text-gray-900 dark:text-white/90">
      {value}
    </div>
  </div>
);

/* Sections */

const PfEsiPtSection = ({ pfConfigs }) => (
  <div className="grid gap-6 px-5 py-5 md:grid-cols-[1.7fr,1.3fr]">
    {/* Left: list of registrations */}
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
        PF / ESI / PT Registrations
      </h3>
      <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
        Keep your registration numbers and statutory limits up to date.
      </p>

      <div className="mt-4 space-y-3">
        {pfConfigs.map((cfg) => (
          <div
            key={cfg.id}
            className="flex items-start justify-between rounded-lg border border-gray-100 bg-gray-25 px-3 py-3 text-theme-sm dark:border-gray-800 dark:bg-gray-950/40"
          >
            <div>
              <p className="font-semibold text-gray-900 dark:text-white/90">
                {cfg.type}
              </p>
              <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                Reg. No: {cfg.registrationNo}
              </p>
              <div className="mt-2 grid gap-4 text-theme-xs text-gray-600 dark:text-gray-300 sm:grid-cols-3">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-200">
                    Wage Limit
                  </p>
                  <p>{cfg.wageLimit}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-200">
                    Employer
                  </p>
                  <p>{cfg.employerRate}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-200">
                    Employee
                  </p>
                  <p>{cfg.employeeRate}</p>
                </div>
              </div>
            </div>
            <StatusBadge status={cfg.status} />
          </div>
        ))}
      </div>
    </div>

    {/* Right: notes / upcoming due dates */}
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
          Upcoming Due Dates
        </h3>
        <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
          Plan PF, ESI and PT payments as per statutory timelines.
        </p>
        <div className="mt-3 space-y-2 text-theme-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-between rounded-lg bg-gray-25 px-3 py-2 dark:bg-gray-950/40">
            <div>
              <p className="font-medium text-gray-900 dark:text-white/90">
                PF – February 2026
              </p>
              <p>Due by 15 March 2026</p>
            </div>
            <StatusBadge status="Pending" />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-25 px-3 py-2 dark:bg-gray-950/40">
            <div>
              <p className="font-medium text-gray-900 dark:text-white/90">
                ESI – February 2026
              </p>
              <p>Due by 21 March 2026</p>
            </div>
            <StatusBadge status="Pending" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 text-theme-xs text-gray-500 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        <p className="font-medium text-gray-900 dark:text-white/90">
          Best practice
        </p>
        <p className="mt-1">
          Align payroll processing dates so that PF, ESI and PT challans can be
          generated and paid well before their due dates.
        </p>
      </div>
    </div>
  </div>
);

const ChallansSection = ({ challans, onOpenChallan }) => (
  <div className="px-5 py-5">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
          Challans
        </h3>
        <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
          Track challan generation and payment status for PF, ESI and PT.
        </p>
      </div>
      <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-theme-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
        Generate Challan
      </button>
    </div>

    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="min-w-full divide-y divide-gray-100 text-left text-theme-sm dark:divide-gray-800">
        <thead className="bg-gray-25 dark:bg-gray-950/40">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Type
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Period
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Due Date
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Amount
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {challans.map((ch) => (
            <tr
              key={ch.id}
              className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
            >
              <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                {ch.type}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {ch.month}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {ch.dueDate}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                {ch.amount}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={ch.status} />
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onOpenChallan(ch)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                >
                  View / Pay
                </button>
              </td>
            </tr>
          ))}

          {challans.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
              >
                No challans generated yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const ReportsSection = ({ reports, onOpenReport }) => (
  <div className="px-5 py-5">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
          Statutory Reports
        </h3>
        <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
          Download PF, ESI and PT returns and supporting reports.
        </p>
      </div>
      <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-theme-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
        Generate New Report
      </button>
    </div>

    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="min-w-full divide-y divide-gray-100 text-left text-theme-sm dark:divide-gray-800">
        <thead className="bg-gray-25 dark:bg-gray-950/40">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Type
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Report
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Period
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Format
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {reports.map((rep) => (
            <tr
              key={rep.id}
              className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
            >
              <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                {rep.type}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {rep.name}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {rep.period}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {rep.format}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onOpenReport(rep)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                >
                  View / Download
                </button>
              </td>
            </tr>
          ))}

          {reports.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
              >
                No statutory reports generated.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

/* Modal contents */

const ChallanModalContent = ({ challan, onClose }) => (
  <div className="flex flex-col">
    <div>
      <h5 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
        Challan – {challan.type} ({challan.month})
      </h5>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
        Review challan details and update payment status.
      </p>
    </div>

    <div className="mt-6 space-y-3 text-theme-sm">
      <InfoRow label="Type" value={challan.type} />
      <InfoRow label="Period" value={challan.month} />
      <InfoRow label="Due Date" value={challan.dueDate} />
      <InfoRow label="Amount" value={challan.amount} />
      <InfoRow label="Status" value={challan.status} />
      <InfoRow label="Paid On" value={challan.paidOn} />
    </div>

    <div className="mt-6 flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
      >
        Close
      </button>
      {challan.status !== "Paid" && (
        <button
          type="button"
          className="flex w-full justify-center rounded-lg bg-success-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-success-600 sm:w-auto"
        >
          Mark as Paid
        </button>
      )}
    </div>
  </div>
);

const ReportModalContent = ({ report, onClose }) => (
  <div className="flex flex-col">
    <div>
      <h5 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
        Report – {report.name}
      </h5>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
        Download this statutory report for filing or audit purposes.
      </p>
    </div>

    <div className="mt-6 space-y-3 text-theme-sm">
      <InfoRow label="Type" value={report.type} />
      <InfoRow label="Period" value={report.period} />
      <InfoRow label="Format" value={report.format} />
    </div>

    <div className="mt-6 flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
      >
        Close
      </button>
      <button
        type="button"
        className="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
      >
        Download
      </button>
    </div>
  </div>
);

export default Compliance;
