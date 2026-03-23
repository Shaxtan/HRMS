// pages/Employees/Employees.jsx
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../MyComponents/Table/DataTable";
import Attendance from "../Dashboard/AttendanceSummaryRow";
import { Info, IndianRupee, Pause, X, Smartphone } from "lucide-react";

const employees = [
  {
    id: 1,
    name: "Amit Kamboj",
    status: "Active",
    phone: "9758057500",
    ctc: 50000,
    salaryInHand: 50000,
    doj: "08/12/2025",
    jobType: "Permanent",
    tpCode: "TP44455",
    department: "BIMLRAJ OUTSOURCING P.LTD.",
  },
  {
    id: 2,
    name: "Shauryam Raghaw",
    status: "Active",
    phone: "9891798469",
    ctc: 30000,
    salaryInHand: 30000,
    doj: "08/12/2025",
    jobType: "Permanent",
    tpCode: "TP44456",
    department: "BIMLRAJ OUTSOURCING P.LTD.",
  },
  {
    id: 3,
    name: "Shivam Malik",
    status: "Active",
    phone: "8630608010",
    ctc: 35000,
    salaryInHand: 35000,
    doj: "08/12/2025",
    jobType: "Permanent",
    tpCode: "TP44458",
    department: "BIMLRAJ OUTSOURCING P.LTD.",
  },
];

const columns = [
  { key: "name",         header: "Employee"       },
  { key: "status",       header: "Status"         },
  { key: "phone",        header: "Phone"          },
  { key: "ctc",          header: "CTC"            },
  { key: "salaryInHand", header: "Salary in Hand" },
  { key: "doj",          header: "DOJ"            },
  { key: "jobType",      header: "Job Type"       },
  { key: "tpCode",       header: "TP Code"        },
  { key: "department",   header: "Department"     },
];

// ── Reusable action button ────────────────────────────────────────────────────
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

export default function Employees() {

  // Wire these to your modals / API calls
  const handleInfo    = (emp) => console.log("Info",    emp);
  const handleSalary  = (emp) => console.log("Salary",  emp);
  const handleHold    = (emp) => console.log("Hold",    emp);
  const handleRemove  = (emp) => console.log("Remove",  emp);
  const handleMobile  = (emp) => console.log("Mobile",  emp);

  return (
    <>
      <Attendance />

      <PageMeta
        title="Employees | HRMS"
        description="Employees listing and statistics"
      />

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">Employees</h1>
          <nav className="text-xs text-slate-400">
            Home <span className="mx-1">›</span> Employees
          </nav>
        </div>

        <DataTable
          columns={columns}
          data={employees}
          actions={(row) => (
            <>
              <ActionBtn title="Info"   onClick={() => handleInfo(row)}>
                <Info size={13} />
              </ActionBtn>

              <ActionBtn title="Salary" onClick={() => handleSalary(row)}>
                <IndianRupee size={13} />
              </ActionBtn>

              <ActionBtn title="Hold"   onClick={() => handleHold(row)}>
                <Pause size={13} />
              </ActionBtn>

              <ActionBtn title="Remove" onClick={() => handleRemove(row)} danger>
                <X size={13} />
              </ActionBtn>

              <ActionBtn title="Mobile" onClick={() => handleMobile(row)}>
                <Smartphone size={13} />
              </ActionBtn>
            </>
          )}
        />
      </div>
    </>
  );
}
