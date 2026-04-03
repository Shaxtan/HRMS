// pages/Employees/FullnFinal.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../MyComponents/Table/DataTable";

const PROCESS_FILTERS = ["All", "Pending", "Completed"];

const columns = [
  { key: "sno", header: "S.No" },
  { key: "employeeName", header: "Employee Name" },
  { key: "employeeCode", header: "Employee Code" },
  { key: "department", header: "Department" },
  { key: "designation", header: "Designation" },
  { key: "exitType", header: "Exit Type" },
  { key: "status", header: "Status" },
  {
    key: "action",
    header: "Action",
    render: () => (
      <button
        type="button"
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-all"
      >
        Approve Process
      </button>
    ),
  },
];

export default function FullnFinal() {
  const [filterStatus, setFilterStatus] = useState("Pending");

  // Hook this to your API later; for now keep empty
  const employees = [];

  const filteredEmployees =
    filterStatus === "All"
      ? employees
      : employees.filter((e) => e.status === filterStatus);

  return (
    <>
      <PageMeta
        title="Full & Final | HRMS"
        description="Manage employees in exit process"
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">
            Full & Final
          </h1>
          <nav className="text-xs text-slate-400">
            Home <span className="mx-1">›</span> Employees{" "}
            <span className="mx-1">›</span> Full &amp; Final
          </nav>
        </div>

        {/* Top info + filter */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Employees in Exit Process
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-medium text-slate-500">
              Filter by Process Status
            </span>
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 text-xs">
              {PROCESS_FILTERS.slice(1).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    filterStatus === status
                      ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-5">
          {filteredEmployees.length === 0 ? (
            <div className="border border-dashed border-slate-200 rounded-xl py-10 flex flex-col items-center justify-center text-center">
              <p className="text-sm font-medium text-slate-700 mb-1">
                No employees found.
              </p>
              <p className="text-xs text-slate-400">
                There are currently no employees in the selected exit process
                status.
              </p>
            </div>
          ) : (
            <DataTable columns={columns} data={filteredEmployees} />
          )}
        </div>
      </div>
    </>
  );
}
