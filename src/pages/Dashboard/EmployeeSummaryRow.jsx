// components/dashboard/EmployeeSummaryRow.jsx
import StatCard from "./StatCard";

/**
 * EmployeeSummaryRow — renders the four employee-count tiles.
 *
 * Props:
 *  total          {number}  – total active employees
 *  relieved       {number}  – relieved count
 *  newEmployees   {number}  – new hires this month
 *  newMonth       {string}  – month label shown in the "New Employees" tile (e.g. "Mar-2026")
 *  joiningPending {number}  – pending joiners
 */
export default function EmployeeSummaryRow({
  total = 0,
  relieved = 0,
  newEmployees = 0,
  newMonth = "Mar-2026",
  joiningPending = 0,
}) {
  const cards = [
    {
      icon: "👥",
      label: "Total Employees",
      value: total,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      icon: "✖",
      label: "Relieved",
      value: relieved,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      icon: "➕",
      label: `New Employees (${newMonth})`,
      value: newEmployees,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      icon: "📇",
      label: "Joining Pending",
      value: joiningPending,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
    },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-slate-700 mb-3">Employees</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}
