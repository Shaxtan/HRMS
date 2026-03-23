// components/dashboard/StatCard.jsx

/**
 * StatCard — a single metric tile used in summary rows.
 *
 * Props:
 *  icon        {string|ReactNode}  – emoji or any React icon element
 *  label       {string}            – descriptive label (e.g. "Total Employees")
 *  value       {number|string}     – the metric value
 *  iconBg      {string}            – Tailwind bg class for the icon circle (e.g. "bg-blue-100")
 *  iconColor   {string}            – Tailwind text class for the icon (e.g. "text-blue-500")
 *  borderColor {string}            – optional Tailwind border class (defaults to "border-slate-100")
 *  cardBg      {string}            – optional Tailwind bg class for the card (defaults to "bg-slate-50")
 *  labelColor  {string}            – optional Tailwind text class for label
 *  valueColor  {string}            – optional Tailwind text class for value
 */
export default function StatCard({
  icon,
  label,
  value,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-500",
  borderColor = "border-slate-100",
  cardBg = "bg-slate-50",
  labelColor = "text-slate-500",
  valueColor = "text-slate-800",
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-md border ${borderColor} ${cardBg} px-4 py-3`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
        >
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <p className={`text-sm ${labelColor}`}>{label}</p>
          <p className={`text-xl font-semibold ${valueColor}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
