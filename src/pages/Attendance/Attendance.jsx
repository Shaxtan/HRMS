import { useMemo, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Modal } from "../../components/ui/modal";

const Attendance = () => {
  const [activeTab, setActiveTab] = useState("records"); // 'records' | 'upload' | 'corrections' | 'overtime'
  const [uploadDate, setUploadDate] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadLocation, setUploadLocation] = useState("All");

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [records] = useState([
    {
      id: "1",
      employeeCode: "EMP001",
      name: "Rohan Sharma",
      date: "2026-02-20",
      inTime: "09:12",
      outTime: "18:05",
      status: "Present", // Present | Absent | Half-day | On Leave
      location: "Pune",
    },
    {
      id: "2",
      employeeCode: "EMP002",
      name: "Neha Patel",
      date: "2026-02-20",
      inTime: "10:08",
      outTime: "19:10",
      status: "Late",
      location: "Remote",
    },
    {
      id: "3",
      employeeCode: "EMP003",
      name: "Amit Verma",
      date: "2026-02-20",
      inTime: "-",
      outTime: "-",
      status: "Absent",
      location: "Mumbai",
    },
  ]);

  const [corrections] = useState([
    {
      id: "c1",
      employeeCode: "EMP002",
      name: "Neha Patel",
      date: "2026-02-18",
      requestedChange: "Mark Present (missed punch-in)",
      reason: "Biometric device issue",
      status: "Pending", // Pending | Approved | Rejected
      raisedOn: "2026-02-19",
    },
  ]);

  const [overtimeRequests] = useState([
    {
      id: "ot1",
      employeeCode: "EMP001",
      name: "Rohan Sharma",
      date: "2026-02-19",
      hours: 2,
      type: "Overtime", // Overtime | LOP Reversal
      reason: "Release deployment",
      status: "Approved",
    },
    {
      id: "ot2",
      employeeCode: "EMP003",
      name: "Amit Verma",
      date: "2026-02-18",
      hours: 1,
      type: "LOP Reversal",
      reason: "Worked from client site, missed punch",
      status: "Pending",
    },
  ]);

  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [selectedCorrection, setSelectedCorrection] = useState(null);

  const [isOvertimeModalOpen, setIsOvertimeModalOpen] = useState(false);
  const [selectedOvertime, setSelectedOvertime] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setUploadFile(file || null);
  };

  const handleUploadSubmit = () => {
    if (!uploadFile || !uploadDate) return;
    // integrate: send to API, then reset
    setUploadFile(null);
    setUploadDate("");
    setUploadLocation("All");
  };

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchesSearch =
        !search.trim() ||
        rec.name.toLowerCase().includes(search.toLowerCase()) ||
        rec.employeeCode.toLowerCase().includes(search.toLowerCase());
      const matchesDate = !filterDate || rec.date === filterDate;
      const matchesStatus =
        filterStatus === "All" || rec.status === filterStatus;
      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [records, search, filterDate, filterStatus]);

  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;
  const lateCount = records.filter((r) => r.status === "Late").length;

  const pendingCorrections = corrections.filter(
    (c) => c.status === "Pending"
  ).length;
  const pendingOvertime = overtimeRequests.filter(
    (o) => o.status === "Pending"
  ).length;

  return (
    <>
      <PageMeta
        title="Attendance | HRMS Admin"
        description="Manage attendance uploads, records, corrections and overtime / LOP."
      />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-theme-xl font-semibold text-gray-900 dark:text-white/90">
              Attendance
            </h1>
            <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
              Upload attendance data, review records and handle corrections & overtime.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full bg-gray-50 p-1 dark:bg-gray-900">
              <TabButton
                label="Records"
                active={activeTab === "records"}
                onClick={() => setActiveTab("records")}
              />
              <TabButton
                label="Upload"
                active={activeTab === "upload"}
                onClick={() => setActiveTab("upload")}
              />
              <TabButton
                label="Corrections"
                active={activeTab === "corrections"}
                onClick={() => setActiveTab("corrections")}
              />
              <TabButton
                label="Overtime / LOP"
                active={activeTab === "overtime"}
                onClick={() => setActiveTab("overtime")}
              />
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-3 md:grid-cols-4">
          <SummaryCard
            label="Present Today"
            value={presentCount}
            badge="Live"
            badgeColor="bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-200"
          />
          <SummaryCard
            label="Absent Today"
            value={absentCount}
            badge="Attention"
            badgeColor="bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-200"
          />
          <SummaryCard
            label="Late Arrivals"
            value={lateCount}
            badge="Punctuality"
            badgeColor="bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-200"
          />
          <SummaryCard
            label="Pending Actions"
            value={pendingCorrections + pendingOvertime}
            badge="Corrections & OT"
            badgeColor="bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-900/20 dark:text-blue-light-300"
          />
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]">
          {activeTab === "upload" && (
            <UploadAttendanceSection
              uploadDate={uploadDate}
              setUploadDate={setUploadDate}
              uploadFile={uploadFile}
              handleFileChange={handleFileChange}
              uploadLocation={uploadLocation}
              setUploadLocation={setUploadLocation}
              onUpload={handleUploadSubmit}
            />
          )}

          {activeTab === "records" && (
            <AttendanceRecordsSection
              records={filteredRecords}
              search={search}
              setSearch={setSearch}
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          )}

          {activeTab === "corrections" && (
            <CorrectionsSection
              corrections={corrections}
              onOpenCorrection={(c) => {
                setSelectedCorrection(c);
                setIsCorrectionModalOpen(true);
              }}
            />
          )}

          {activeTab === "overtime" && (
            <OvertimeSection
              overtimeRequests={overtimeRequests}
              onOpenOvertime={(o) => {
                setSelectedOvertime(o);
                setIsOvertimeModalOpen(true);
              }}
            />
          )}
        </div>

        {/* Correction modal */}
        <Modal
          isOpen={isCorrectionModalOpen}
          onClose={() => setIsCorrectionModalOpen(false)}
          className="max-w-[640px] p-6 lg:p-8"
        >
          {selectedCorrection && (
            <CorrectionModalContent
              correction={selectedCorrection}
              onClose={() => setIsCorrectionModalOpen(false)}
            />
          )}
        </Modal>

        {/* Overtime modal */}
        <Modal
          isOpen={isOvertimeModalOpen}
          onClose={() => setIsOvertimeModalOpen(false)}
          className="max-w-[640px] p-6 lg:p-8"
        >
          {selectedOvertime && (
            <OvertimeModalContent
              overtime={selectedOvertime}
              onClose={() => setIsOvertimeModalOpen(false)}
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

const StatusChip = ({ status }) => {
  let cls =
    "inline-flex items-center rounded-full px-2.5 py-1 text-theme-xs font-medium ";
  let label = status;

  if (status === "Present") {
    cls +=
      "bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-200";
  } else if (status === "Absent") {
    cls +=
      "bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-200";
  } else if (status === "Late") {
    cls +=
      "bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-200";
  } else if (status === "Half-day" || status === "On Leave") {
    cls +=
      "bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-900/20 dark:text-blue-light-300";
  }

  return (
    <span className={cls}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
};

/* Sections */

const UploadAttendanceSection = ({
  uploadDate,
  setUploadDate,
  uploadFile,
  handleFileChange,
  uploadLocation,
  setUploadLocation,
  onUpload,
}) => (
  <div className="grid gap-6 px-5 py-5 md:grid-cols-[1.7fr,1.3fr]">
    {/* Left: upload card */}
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
        Upload Attendance
      </h3>
      <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
        Upload biometric or timesheet data in CSV or Excel format.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-1.5 block text-theme-xs font-medium text-gray-700 dark:text-gray-400">
            Attendance Date
          </label>
          <input
            type="date"
            value={uploadDate}
            onChange={(e) => setUploadDate(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-theme-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-theme-xs font-medium text-gray-700 dark:text-gray-400">
            Location / Branch
          </label>
          <select
            value={uploadLocation}
            onChange={(e) => setUploadLocation(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-theme-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option value="All">All Locations</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-theme-xs font-medium text-gray-700 dark:text-gray-400">
            Upload File
          </label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-25 px-4 py-6 text-center text-theme-xs text-gray-500 hover:border-brand-300 hover:bg-brand-25 dark:border-gray-700 dark:bg-gray-950/40 dark:text-gray-400">
            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="mb-1 text-theme-sm font-medium text-gray-900 dark:text-white/90">
              {uploadFile ? uploadFile.name : "Click to upload or drag & drop"}
            </span>
            <span>CSV or Excel file. Max 10MB.</span>
          </label>
        </div>

        <div className="flex items-center justify-between text-theme-xs text-gray-500 dark:text-gray-400">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Template formats
            </p>
            <p>Employee ID, Date, In Time, Out Time, Shift, Status</p>
          </div>
          <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-theme-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
            Download Sample
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onUpload}
            className="rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600"
          >
            Upload & Validate
          </button>
        </div>
      </div>
    </div>

    {/* Right: summary / last uploads */}
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
          Last Uploads
        </h3>
        <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
          Quick view of recent attendance imports.
        </p>

        <div className="mt-3 space-y-3 text-theme-xs">
          <div className="flex items-center justify-between rounded-lg bg-gray-25 px-3 py-2 dark:bg-gray-950/40">
            <div>
              <p className="font-medium text-gray-900 dark:text-white/90">
                20 Feb 2026 · Pune
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                120 records imported · 0 errors
              </p>
            </div>
            <span className="rounded-full bg-success-50 px-3 py-1 text-[11px] font-medium text-success-700 dark:bg-success-900/30 dark:text-success-200">
              Completed
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-gray-25 px-3 py-2 dark:bg-gray-950/40">
            <div>
              <p className="font-medium text-gray-900 dark:text-white/90">
                19 Feb 2026 · Mumbai
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                98 records imported · 3 warnings
              </p>
            </div>
            <span className="rounded-full bg-warning-50 px-3 py-1 text-[11px] font-medium text-warning-700 dark:bg-warning-900/30 dark:text-warning-200">
              Warnings
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 text-theme-xs text-gray-500 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        <p className="font-medium text-gray-900 dark:text-white/90">
          Best practice
        </p>
        <p className="mt-1">
          Lock attendance data after payroll is processed, and use corrections or
          overtime modules to make post-lock adjustments.
        </p>
      </div>
    </div>
  </div>
);

const AttendanceRecordsSection = ({
  records,
  search,
  setSearch,
  filterDate,
  setFilterDate,
  filterStatus,
  setFilterStatus,
}) => (
  <>
    <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-64 rounded-lg border border-gray-300 bg-transparent px-3 pl-9 text-theme-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-transparent px-3 text-theme-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-transparent px-3 text-theme-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option value="All">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="On Leave">On Leave</option>
            <option value="Half-day">Half-day</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-theme-xs text-gray-500 dark:text-gray-400">
          <span className="inline-flex h-2 w-2 rounded-full bg-success-500" />
          <span>Present</span>
          <span className="inline-flex h-2 w-2 rounded-full bg-warning-400" />
          <span>Late</span>
          <span className="inline-flex h-2 w-2 rounded-full bg-error-500" />
          <span>Absent</span>
        </div>
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
                Date
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                In
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Out
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {records.map((rec) => (
              <tr
                key={rec.id}
                className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
              >
                <td className="px-4 py-3">
                  <div className="text-theme-sm font-medium text-gray-900 dark:text-white/90">
                    {rec.name} · {rec.employeeCode}
                  </div>
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {rec.date}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {rec.inTime}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {rec.outTime}
                </td>
                <td className="px-4 py-3">
                  <StatusChip status={rec.status} />
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {rec.location}
                </td>
              </tr>
            ))}

            {records.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
                >
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-theme-xs text-gray-500 dark:border-gray-800 dark:text-gray-400 sm:flex-row">
          <span>Showing {records.length} records</span>
          <div className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 text-theme-xs dark:border-gray-700 dark:bg-gray-900">
            <button className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
              Prev
            </button>
            <button className="rounded-md bg-brand-50 px-3 py-1 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
              1
            </button>
            <button className="rounded-md px-3 py-1 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
              2
            </button>
            <button className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);

const CorrectionsSection = ({ corrections, onOpenCorrection }) => (
  <div className="px-5 py-5">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
          Attendance Corrections
        </h3>
        <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
          Review employee requests for attendance regularization.
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
              Date
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Requested Change
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Raised On
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
          {corrections.map((corr) => (
            <tr
              key={corr.id}
              className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
            >
              <td className="px-4 py-3">
                <div className="text-theme-sm font-medium text-gray-900 dark:text-white/90">
                  {corr.name} · {corr.employeeCode}
                </div>
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {corr.date}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {corr.requestedChange}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {corr.raisedOn}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {corr.status}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onOpenCorrection(corr)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                >
                  Review
                </button>
              </td>
            </tr>
          ))}

          {corrections.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
              >
                No correction requests.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const OvertimeSection = ({ overtimeRequests, onOpenOvertime }) => (
  <div className="px-5 py-5">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
          Overtime / LOP Adjustments
        </h3>
        <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
          Track overtime, LOP reversals and approvals before payroll.
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
              Date
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Type
            </th>
            <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
              Hours / Days
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
          {overtimeRequests.map((req) => (
            <tr
              key={req.id}
              className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
            >
              <td className="px-4 py-3">
                <div className="text-theme-sm font-medium text-gray-900 dark:text:white/90">
                  {req.name} · {req.employeeCode}
                </div>
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {req.date}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {req.type}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {req.type === "Overtime"
                  ? `${req.hours} hrs`
                  : `${req.hours} day(s)`}
              </td>
              <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                {req.status}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onOpenOvertime(req)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                >
                  Review
                </button>
              </td>
            </tr>
          ))}

          {overtimeRequests.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
              >
                No overtime or LOP adjustments.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

/* Modal contents */

const CorrectionModalContent = ({ correction, onClose }) => (
  <div className="flex flex-col">
    <div>
      <h5 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
        Review Correction
      </h5>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
        Approve or reject this attendance regularization request.
      </p>
    </div>

    <div className="mt-6 space-y-3 text-theme-sm">
      <InfoRow label="Employee" value={`${correction.name} · ${correction.employeeCode}`} />
      <InfoRow label="Date" value={correction.date} />
      <InfoRow label="Requested Change" value={correction.requestedChange} />
      <InfoRow label="Reason" value={correction.reason} />
      <InfoRow label="Raised On" value={correction.raisedOn} />
      <InfoRow label="Current Status" value={correction.status} />
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
        className="flex w-full justify-center rounded-lg bg-error-50 px-4 py-2.5 text-theme-sm font-medium text-error-700 hover:bg-error-100 dark:bg-error-900/40 dark:text-error-200 sm:w-auto"
      >
        Reject
      </button>
      <button
        type="button"
        className="flex w-full justify-center rounded-lg bg-success-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-success-600 sm:w-auto"
      >
        Approve
      </button>
    </div>
  </div>
);

const OvertimeModalContent = ({ overtime, onClose }) => (
  <div className="flex flex-col">
    <div>
      <h5 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
        Review Overtime / LOP
      </h5>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
        Confirm these adjustments before payroll processing.
      </p>
    </div>

    <div className="mt-6 space-y-3 text-theme-sm">
      <InfoRow label="Employee" value={`${overtime.name} · ${overtime.employeeCode}`} />
      <InfoRow label="Date" value={overtime.date} />
      <InfoRow label="Type" value={overtime.type} />
      <InfoRow
        label="Hours / Days"
        value={overtime.type === "Overtime" ? `${overtime.hours} hrs` : `${overtime.hours} day(s)`}
      />
      <InfoRow label="Reason" value={overtime.reason} />
      <InfoRow label="Current Status" value={overtime.status} />
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
        className="flex w-full justify-center rounded-lg bg-error-50 px-4 py-2.5 text-theme-sm font-medium text-error-700 hover:bg-error-100 dark:bg-error-900/40 dark:text-error-200 sm:w-auto"
      >
        Reject
      </button>
      <button
        type="button"
        className="flex w-full justify-center rounded-lg bg-success-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-success-600 sm:w-auto"
      >
        Approve
      </button>
    </div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex gap-3">
    <div className="w-32 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
      {label}
    </div>
    <div className="flex-1 text-theme-sm text-gray-900 dark:text-white/90">
      {value}
    </div>
  </div>
);

export default Attendance;
