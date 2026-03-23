// components/dashboard/AttendanceSummaryRow.jsx
import StatCard from "./StatCard";

/**
 * AttendanceSummaryRow — renders the four attendance tiles.
 *
 * Props:
 *  employees   {number}  – total employees
 *  present     {number}  – present today
 *  absent      {number}  – absent today
 *  lateComers  {number}  – late arrivals today
 */
export default function AttendanceSummaryRow({
  employees = 0,
  present = 0,
  absent = 0,
  lateComers = 0,
}) {
  const cards = [
    {
      icon: "👥",
      label: "Employees",
      value: employees,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      borderColor: "border-green-400",
      cardBg: "bg-green-50",
      labelColor: "text-green-700",
      valueColor: "text-green-700",
    },
    {
      icon: "🎓",
      label: "Present",
      value: present,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
      borderColor: "border-amber-400",
      cardBg: "bg-amber-50",
      labelColor: "text-amber-700",
      valueColor: "text-amber-700",
    },
    {
      icon: "👎",
      label: "Absent",
      value: absent,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-500",
      borderColor: "border-cyan-400",
      cardBg: "bg-cyan-50",
      labelColor: "text-cyan-700",
      valueColor: "text-cyan-700",
    },
    {
      icon: "⏰",
      label: "Late Comers",
      value: lateComers,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      borderColor: "border-rose-400",
      cardBg: "bg-rose-50",
      labelColor: "text-rose-700",
      valueColor: "text-rose-700",
    },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-slate-700 mb-3">Attendance</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}
