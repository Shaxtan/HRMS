import { useState, useMemo } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Modal } from "../../components/ui/modal";

const Payroll = () => {
  const [activeTab, setActiveTab] = useState("process"); // process | history | payslips | fnf

  // Dummy data – replace with API later
  const [currentCycle, setCurrentCycle] = useState({
    month: "February 2026",
    period: "01 Feb 2026 - 29 Feb 2026",
    status: "Not Processed", // Not Processed | In Progress | Completed | Locked
    employeesInCycle: 124,
    pendingIssues: 3,
  });

  const [payRuns] = useState([
    {
      id: "pr1",
      month: "January 2026",
      processedOn: "2026-01-30",
      status: "Locked",
      employees: 120,
      netPayout: "₹ 18,40,000",
    },
    {
      id: "pr2",
      month: "December 2025",
      processedOn: "2025-12-30",
      status: "Locked",
      employees: 118,
      netPayout: "₹ 17,95,000",
    },
  ]);

  const [payslips] = useState([
    {
      id: "ps1",
      employeeCode: "EMP001",
      name: "Rohan Sharma",
      month: "January 2026",
      netPay: "₹ 45,000",
      status: "Generated", // Generated | Downloaded | Not Generated
    },
    {
      id: "ps2",
      employeeCode: "EMP002",
      name: "Neha Patel",
      month: "January 2026",
      netPay: "₹ 52,000",
      status: "Downloaded",
    },
  ]);

  const [fnfList] = useState([
    {
      id: "fnf1",
      employeeCode: "EMP003",
      name: "Amit Verma",
      lastWorkingDay: "2026-02-10",
      fnfStatus: "Pending", // Pending | In Progress | Settled
      amount: "₹ 72,500",
    },
    {
      id: "fnf2",
      employeeCode: "EMP010",
      name: "Pooja Singh",
      lastWorkingDay: "2026-01-25",
      fnfStatus: "Settled",
      amount: "₹ 65,200",
    },
  ]);

  // Filters
  const [payslipMonthFilter, setPayslipMonthFilter] = useState("January 2026");
  const [searchPayslip, setSearchPayslip] = useState("");

  const filteredPayslips = useMemo(() => {
    return payslips.filter((ps) => {
      const matchesMonth =
        !payslipMonthFilter || ps.month === payslipMonthFilter;
      const matchesSearch =
        !searchPayslip.trim() ||
        ps.name.toLowerCase().includes(searchPayslip.toLowerCase()) ||
        ps.employeeCode
          .toLowerCase()
          .includes(searchPayslip.toLowerCase());
      return matchesMonth && matchesSearch;
    });
  }, [payslips, payslipMonthFilter, searchPayslip]);

  // Modals: process payroll, view pay run, view F&F
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isPayRunModalOpen, setIsPayRunModalOpen] = useState(false);
  const [selectedPayRun, setSelectedPayRun] = useState(null);

  const [isFnfModalOpen, setIsFnfModalOpen] = useState(false);
  const [selectedFnf, setSelectedFnf] = useState(null);

  const openPayRunModal = (run) => {
    setSelectedPayRun(run);
    setIsPayRunModalOpen(true);
  };

  const openFnfModal = (fnf) => {
    setSelectedFnf(fnf);
    setIsFnfModalOpen(true);
  };

  const handleStartPayroll = () => {
    // later: call API, validations etc.
    setCurrentCycle((prev) => ({
      ...prev,
      status: "In Progress",
    }));
    setIsProcessModalOpen(false);
  };

  return (
    <>
      <PageMeta
        title="Payroll | HRMS Admin"
        description="Process payroll, view history, manage payslips and F&F."
      />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-theme-xl font-semibold text-gray-900 dark:text-white/90">
              Payroll
            </h1>
            <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
              Run payroll, manage payslips and handle Full & Final settlements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full bg-gray-50 p-1 dark:bg-gray-900">
              <TabButton
                label="Process Payroll"
                active={activeTab === "process"}
                onClick={() => setActiveTab("process")}
              />
              <TabButton
                label="Payroll History"
                active={activeTab === "history"}
                onClick={() => setActiveTab("history")}
              />
              <TabButton
                label="Payslips"
                active={activeTab === "payslips"}
                onClick={() => setActiveTab("payslips")}
              />
              <TabButton
                label="Full & Final (F&F)"
                active={activeTab === "fnf"}
                onClick={() => setActiveTab("fnf")}
              />
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-3 md:grid-cols-4">
          <SummaryCard
            label="Current Cycle"
            value={currentCycle.month}
            badge={currentCycle.status}
            badgeColor={
              currentCycle.status === "Completed" || currentCycle.status === "Locked"
                ? "bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-200"
                : currentCycle.status === "In Progress"
                ? "bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-200"
                : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
            }
          />
          <SummaryCard
            label="Employees in Cycle"
            value={currentCycle.employeesInCycle}
            badge="Headcount"
            badgeColor="bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-900/20 dark:text-blue-light-300"
          />
          <SummaryCard
            label="Pending Issues"
            value={currentCycle.pendingIssues}
            badge="Exceptions"
            badgeColor="bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-200"
          />
          <SummaryCard
            label="Pending F&F"
            value={fnfList.filter((f) => f.fnfStatus !== "Settled").length}
            badge="Exits"
            badgeColor="bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-200"
          />
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]">
          {activeTab === "process" && (
            <ProcessPayrollSection
              currentCycle={currentCycle}
              onOpenProcessModal={() => setIsProcessModalOpen(true)}
            />
          )}

          {activeTab === "history" && (
            <PayrollHistorySection
              payRuns={payRuns}
              onOpenPayRun={openPayRunModal}
            />
          )}

          {activeTab === "payslips" && (
            <PayslipsSection
              payslips={filteredPayslips}
              payslipMonthFilter={payslipMonthFilter}
              setPayslipMonthFilter={setPayslipMonthFilter}
              searchPayslip={searchPayslip}
              setSearchPayslip={setSearchPayslip}
            />
          )}

          {activeTab === "fnf" && (
            <FnfSection fnfList={fnfList} onOpenFnf={openFnfModal} />
          )}
        </div>

        {/* Modals */}
        <Modal
          isOpen={isProcessModalOpen}
          onClose={() => setIsProcessModalOpen(false)}
          className="max-w-[640px] p-6 lg:p-8"
        >
          <ProcessModalContent
            currentCycle={currentCycle}
            onClose={() => setIsProcessModalOpen(false)}
            onStart={handleStartPayroll}
          />
        </Modal>

        <Modal
          isOpen={isPayRunModalOpen}
          onClose={() => setIsPayRunModalOpen(false)}
          className="max-w-[640px] p-6 lg:p-8"
        >
          {selectedPayRun && (
            <PayRunModalContent
              payRun={selectedPayRun}
              onClose={() => setIsPayRunModalOpen(false)}
            />
          )}
        </Modal>

        <Modal
          isOpen={isFnfModalOpen}
          onClose={() => setIsFnfModalOpen(false)}
          className="max-w-[640px] p-6 lg:p-8"
        >
          {selectedFnf && (
            <FnfModalContent
              fnf={selectedFnf}
              onClose={() => setIsFnfModalOpen(false)}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

/* Reusable small components */

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

const BadgeStatus = ({ status }) => {
  let cls =
    "inline-flex items-center rounded-full px-2.5 py-1 text-theme-xs font-medium ";
  if (status === "Locked" || status === "Completed" || status === "Settled") {
    cls +=
      "bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-200";
  } else if (status === "In Progress" || status === "Pending") {
    cls +=
      "bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-200";
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
    <div className="w-36 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
      {label}
    </div>
    <div className="flex-1 text-theme-sm text-gray-900 dark:text-white/90">
      {value}
    </div>
  </div>
);

/* Sections */

const ProcessPayrollSection = ({ currentCycle, onOpenProcessModal }) => (
  <div className="grid gap-6 px-5 py-5 md:grid-cols-[1.7fr,1.3fr]">
    {/* Left: main process card */}
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
        Process Payroll – {currentCycle.month}
      </h3>
      <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
        Review pre-payroll checks, then run payroll and lock after verification.
      </p>

      <div className="mt-5 space-y-4">
        <div className="space-y-1 text-theme-sm text-gray-700 dark:text-gray-200">
          <p>
            <span className="font-medium">Pay period: </span>
            {currentCycle.period}
          </p>
          <p>
            <span className="font-medium">Employees in cycle: </span>
            {currentCycle.employeesInCycle}
          </p>
          <p>
            <span className="font-medium">Status: </span>
            <BadgeStatus status={currentCycle.status} />
          </p>
        </div>

        <div className="mt-4 rounded-lg bg-gray-25 p-3 text-theme-xs text-gray-600 dark:bg-gray-950/40 dark:text-gray-400">
          <p className="font-medium text-gray-900 dark:text-white/90">
            Pre-payroll checklist
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Attendance locked and corrections processed.</li>
            <li>Overtime and LOP adjustments reviewed.</li>
            <li>Reimbursements and one-time components updated.</li>
            <li>New joiners / exits updated in Employee master.</li>
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            View Exceptions ({currentCycle.pendingIssues})
          </button>
          <button
            type="button"
            onClick={onOpenProcessModal}
            className="rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600"
          >
            {currentCycle.status === "Not Processed"
              ? "Start Payroll"
              : currentCycle.status === "In Progress"
              ? "Recalculate & Review"
              : "Re-open Summary"}
          </button>
        </div>
      </div>
    </div>

    {/* Right: notes / settings hint */}
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
          Payroll Settings
        </h3>
        <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
          Salary structure, components and arrears are managed in Payroll
          Settings.
        </p>
        <div className="mt-3 space-y-2 text-theme-xs text-gray-600 dark:text-gray-400">
          <p>Use Settings → Payroll to configure:</p>
          <ul className="mt-1 space-y-1 list-disc list-inside">
            <li>Salary structures & CTC templates</li>
            <li>Earnings / Deductions components</li>
            <li>Arrears and retro adjustments</li>
            <li>PF / ESI / PT configurations</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 text-theme-xs text-gray-500 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        <p className="font-medium text-gray-900 dark:text-white/90">
          Best practice
        </p>
        <p className="mt-1">
          Lock each payroll run once salary is disbursed and payslips are
          released, and use F&amp;F for post-payroll exits.
        </p>
      </div>
    </div>
  </div>
);

const PayrollHistorySection = ({ payRuns, onOpenPayRun }) => (
  <div className="px-5 py-5">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
          Payroll History
        </h3>
        <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
          View previous pay runs, net payouts and download reports.
        </p>
      </div>
      <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-theme-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
        Export Summary
      </button>
    </div>

    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="min-w-full divide-y divide-gray-100 text-left text-theme-sm dark:divide-gray-800">
        <thead className="bg-gray-25 dark:bg-gray-950/40">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Month
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Processed On
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Employees
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Net Payout
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
          {payRuns.map((run) => (
            <tr
              key={run.id}
              className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
            >
              <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                {run.month}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {run.processedOn}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {run.employees}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                {run.netPayout}
              </td>
              <td className="px-4 py-3">
                <BadgeStatus status={run.status} />
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onOpenPayRun(run)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}

          {payRuns.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
              >
                No payroll runs available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const PayslipsSection = ({
  payslips,
  payslipMonthFilter,
  setPayslipMonthFilter,
  searchPayslip,
  setSearchPayslip,
}) => (
  <>
    <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or ID"
              value={searchPayslip}
              onChange={(e) => setSearchPayslip(e.target.value)}
              className="h-10 w-64 rounded-lg border border-gray-300 bg-transparent px-3 pl-9 text-theme-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          <select
            value={payslipMonthFilter}
            onChange={(e) => setPayslipMonthFilter(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-transparent px-3 text-theme-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option value="">All Months</option>
            <option value="January 2026">January 2026</option>
            <option value="December 2025">December 2025</option>
          </select>
        </div>

        <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-theme-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
          Bulk Download PDF
        </button>
      </div>
    </div>

    <div className="px-2 pb-4 pt-2 sm:px-5">
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-100 text-left text-theme-sm dark:divide-gray-800">
          <thead className="bg-gray-25 dark:bg-gray-950/40">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Employee
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Month
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Net Pay
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
            {payslips.map((ps) => (
              <tr
                key={ps.id}
                className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
              >
                <td className="px-4 py-3">
                  <div className="text-theme-sm font-medium text-gray-900 dark:text-white/90">
                    {ps.name} · {ps.employeeCode}
                  </div>
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {ps.month}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                  {ps.netPay}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {ps.status}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">
                      View
                    </button>
                    <button className="rounded-lg bg-brand-500 px-3 py-1.5 text-theme-xs font-medium text-white hover:bg-brand-600">
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {payslips.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
                >
                  No payslips generated yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

const FnfSection = ({ fnfList, onOpenFnf }) => (
  <div className="px-5 py-5">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
          Full &amp; Final Settlements
        </h3>
        <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
          Manage settlements for exiting employees and track their status.
        </p>
      </div>
    </div>

    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="min-w-full divide-y divide-gray-100 text-left text-theme-sm dark:divide-gray-800">
        <thead className="bg-gray-25 dark:bg-gray-950/40">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Employee
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Last Working Day
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              F&amp;F Status
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Amount
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {fnfList.map((fnf) => (
            <tr
              key={fnf.id}
              className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
            >
              <td className="px-4 py-3">
                <div className="text-theme-sm font-medium text-gray-900 dark:text-white/90">
                  {fnf.name} · {fnf.employeeCode}
                </div>
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {fnf.lastWorkingDay}
              </td>
              <td className="px-4 py-3">
                <BadgeStatus status={fnf.fnfStatus} />
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                {fnf.amount}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onOpenFnf(fnf)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                >
                  View &amp; Process
                </button>
              </td>
            </tr>
          ))}

          {fnfList.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
              >
                No F&amp;F cases pending.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

/* Modals */

const ProcessModalContent = ({ currentCycle, onClose, onStart }) => (
  <div className="flex flex-col">
    <div>
      <h5 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
        Process Payroll – {currentCycle.month}
      </h5>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
        Confirm you want to calculate payroll for this cycle.
      </p>
    </div>

    <div className="mt-6 space-y-3 text-theme-sm">
      <InfoRow label="Pay period" value={currentCycle.period} />
      <InfoRow
        label="Employees in cycle"
        value={String(currentCycle.employeesInCycle)}
      />
      <InfoRow label="Current status" value={currentCycle.status} />
      <div className="mt-2 rounded-lg bg-warning-50 p-3 text-theme-xs text-warning-800 dark:bg-warning-900/30 dark:text-warning-200">
        Ensure attendance, overtime, reimbursements and changes in CTC are
        updated before you start payroll.
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onStart}
        className="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
      >
        Start Payroll
      </button>
    </div>
  </div>
);

const PayRunModalContent = ({ payRun, onClose }) => (
  <div className="flex flex-col">
    <div>
      <h5 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
        Payroll Summary – {payRun.month}
      </h5>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
        Key details for this payroll run.
      </p>
    </div>

    <div className="mt-6 space-y-3 text-theme-sm">
      <InfoRow label="Processed On" value={payRun.processedOn} />
      <InfoRow label="Employees" value={String(payRun.employees)} />
      <InfoRow label="Net Payout" value={payRun.netPayout} />
      <InfoRow label="Status" value={payRun.status} />
      <div className="mt-2 flex gap-2">
        <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-theme-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
          Download Bank Advice
        </button>
        <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-theme-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
          Download Statutory File
        </button>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end">
      <button
        type="button"
        onClick={onClose}
        className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
      >
        Close
      </button>
    </div>
  </div>
);

const FnfModalContent = ({ fnf, onClose }) => (
  <div className="flex flex-col">
    <div>
      <h5 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
        Full &amp; Final – {fnf.name}
      </h5>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
        Review exit details and settlement amount.
      </p>
    </div>

    <div className="mt-6 space-y-3 text-theme-sm">
      <InfoRow
        label="Employee"
        value={`${fnf.name} · ${fnf.employeeCode}`}
      />
      <InfoRow label="Last Working Day" value={fnf.lastWorkingDay} />
      <InfoRow label="F&F Status" value={fnf.fnfStatus} />
      <InfoRow label="Settlement Amount" value={fnf.amount} />
      <div className="mt-2 rounded-lg bg-gray-25 p-3 text-theme-xs text-gray-600 dark:bg-gray-950/40 dark:text-gray-400">
        <p className="font-medium text-gray-900 dark:text-white/90">
          Components (illustrative)
        </p>
        <ul className="mt-1 space-y-1 list-disc list-inside">
          <li>Unpaid salary till LWD</li>
          <li>Leave encashment</li>
          <li>Bonuses / variable pay due</li>
          <li>Loan / advance recoveries, statutory dues</li>
        </ul>
      </div>
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
        className="flex w-full justify-center rounded-lg bg-success-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-success-600 sm:w-auto"
      >
        Mark as Settled
      </button>
    </div>
  </div>
);

export default Payroll;
