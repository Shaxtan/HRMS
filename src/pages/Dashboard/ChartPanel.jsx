// components/dashboard/ChartPanel.jsx

/**
 * ChartPanel — a titled card that renders either a chart or a placeholder.
 *
 * Props:
 *  title       {string}       – panel heading
 *  placeholder {string}       – text shown when no chart is provided
 *  children    {ReactNode}    – the actual chart component (e.g. a recharts <BarChart>)
 *                               if omitted, the dashed placeholder is rendered instead
 *  height      {string}       – Tailwind h-* class for the chart area (default "h-64")
 */
export default function ChartPanel({
  title,
  placeholder,
  children,
  height = "h-64",
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h3 className="text-lg font-semibold text-slate-700 mb-3">{title}</h3>

      {children ? (
        <div className={height}>{children}</div>
      ) : (
        <div
          className={`flex items-center justify-center ${height} border border-dashed border-slate-200 rounded-md`}
        >
          <span className="text-sm text-slate-400">
            {placeholder ?? "No data"}
          </span>
        </div>
      )}
    </div>
  );
}
