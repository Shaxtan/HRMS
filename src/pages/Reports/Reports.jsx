import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";

const Reports = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Decide active tab based on URL
  const activeTab = useMemo(() => {
    if (location.pathname.startsWith("/reports/attendance")) return "attendance";
    if (location.pathname.startsWith("/reports/salary-sheet")) return "salary";
    if (location.pathname.startsWith("/reports/invoice")) return "invoice";
    return "payroll"; // default
  }, [location.pathname]);

  // Dummy data – replace with API later
  const payrollReports = [
    {
      id: "pr1",
      name: "Monthly Payroll Summary",
      period: "January 2026",
      format: "Excel",
    },
    {
      id: "pr2",
      name: "Pay Register",
      period: "January 2026",
      format: "PDF",
    },
  ];

  const attendanceReports = [
    {
      id: "ar1",
      name: "Daily Attendance Summary",
      period: "01 Jan 2026 - 31 Jan 2026",
      format: "Excel",
    },
    {
      id: "ar2",
      name: "Late / Early Report",
      period: "January 2026",
      format: "PDF",
    },
  ];

  const salarySheets = [
    {
      id: "ss1",
      name: "Salary Sheet – Bank Transfer",
      period: "January 2026",
      format: "Excel",
    },
    {
      id: "ss2",
      name: "Salary Sheet – Cash / Cheque",
      period: "January 2026",
      format: "Excel",
    },
  ];

  const invoices = [
    {
      id: "inv1",
      invoiceNo: "INV-2026-001",
      client: "Acme Pvt Ltd",
      period: "January 2026",
      amount: "₹ 2,50,000",
      status: "Pending", // Pending | Paid
    },
    {
      id: "inv2",
      invoiceNo: "INV-2026-002",
      client: "Beta Corp",
      period: "January 2026",
      amount: "₹ 1,80,000",
      status: "Paid",
    },
  ];

  const changeTab = (tab) => {
    if (tab === "payroll") navigate("/reports/payroll");
    if (tab === "attendance") navigate("/reports/attendance");
    if (tab === "salary") navigate("/reports/salary-sheet");
    if (tab === "invoice") navigate("/reports/invoice");
  };

  return (
    <>
      <PageMeta
        title="Reports | HRMS Admin"
        description="Download payroll, attendance and invoice reports."
      />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-theme-xl font-semibold text-gray-900 dark:text-white/90">
              Reports
            </h1>
            <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
              Central place for payroll, attendance and billing reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full bg-gray-50 p-1 dark:bg-gray-900">
              <TabButton
                label="Payroll Reports"
                active={activeTab === "payroll"}
                onClick={() => changeTab("payroll")}
              />
              <TabButton
                label="Attendance Reports"
                active={activeTab === "attendance"}
                onClick={() => changeTab("attendance")}
              />
              <TabButton
                label="Salary Sheet Export"
                active={activeTab === "salary"}
                onClick={() => changeTab("salary")}
              />
              <TabButton
                label="Invoice (GST)"
                active={activeTab === "invoice"}
                onClick={() => changeTab("invoice")}
              />
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]">
          {activeTab === "payroll" && (
            <ReportListSection
              title="Payroll Reports"
              description="Download payroll summaries, pay registers and statutory outputs."
              reports={payrollReports}
            />
          )}

          {activeTab === "attendance" && (
            <ReportListSection
              title="Attendance Reports"
              description="Download attendance summaries and exception reports."
              reports={attendanceReports}
            />
          )}

          {activeTab === "salary" && (
            <ReportListSection
              title="Salary Sheet Export"
              description="Export salary sheets for bank upload and internal review."
              reports={salarySheets}
            />
          )}

          {activeTab === "invoice" && (
            <InvoiceSection invoices={invoices} />
          )}
        </div>
      </div>
    </>
  );
};

/* Reusable UI */

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

const ReportListSection = ({ title, description, reports }) => (
  <>
    <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
            {title}
          </h3>
          <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-theme-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
          Generate New
        </button>
      </div>
    </div>

    <div className="px-2 pb-4 pt-2 sm:px-5">
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-100 text-left text-theme-sm dark:divide-gray-800">
          <thead className="bg-gray-25 dark:bg-gray-950/40">
            <tr>
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
            {reports.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
              >
                <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                  {r.name}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {r.period}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {r.format}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">
                    Download
                  </button>
                </td>
              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
                >
                  No reports available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

/* Invoice section */

const InvoiceSection = ({ invoices }) => (
  <>
    <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
            Invoice (GST)
          </h3>
          <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
            Generate and track GST invoices for clients.
          </p>
        </div>
        <button className="rounded-lg bg-brand-500 px-3 py-1.5 text-theme-xs font-medium text-white hover:bg-brand-600">
          Create Invoice
        </button>
      </div>
    </div>

    <div className="px-2 pb-4 pt-2 sm:px-5">
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-100 text-left text-theme-sm dark:divide-gray-800">
          <thead className="bg-gray-25 dark:bg-gray-950/40">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Invoice #
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Client
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Period
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
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
              >
                <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                  {inv.invoiceNo}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {inv.client}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {inv.period}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                  {inv.amount}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {inv.status}
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

            {invoices.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
                >
                  No invoices created.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

export default Reports;
