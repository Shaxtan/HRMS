// components/dashboard/UpcomingHolidays.jsx

/**
 * UpcomingHolidays — panel listing upcoming public/optional holidays.
 *
 * Props:
 *  regions          {string[]}  – list of region options for the select dropdown
 *  selectedRegion   {string}    – currently selected region
 *  onRegionChange   {function}  – callback (newRegion: string) => void
 *  holidayType      {string}    – label on the pill button (e.g. "PUBLIC HOLIDAY")
 *  holidays         {Array<{ day: string|number, month: string, name: string }>}
 *                               – list of holiday objects to render
 */
export default function UpcomingHolidays({
  regions = ["HARYANA"],
  selectedRegion = "HARYANA",
  onRegionChange,
  holidayType = "PUBLIC HOLIDAY",
  holidays = [],
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-700">
          Upcoming Holidays
        </h3>
        <div className="flex items-center gap-2">
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange?.(e.target.value)}
            className="h-8 rounded border border-slate-200 bg-white px-2 text-xs text-slate-600"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button className="h-8 rounded-full border border-sky-500 px-3 text-xs font-medium text-sky-500">
            {holidayType}
          </button>
        </div>
      </div>

      {/* Holiday cards */}
      {holidays.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-16">No records</p>
      ) : (
        <div className="flex flex-wrap gap-3 mt-2">
          {holidays.map((h, idx) => (
            <div
              key={idx}
              className="inline-flex items-center rounded-md border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div className="mr-4 flex flex-col items-center justify-center rounded-md border border-slate-200 px-3 py-2">
                <span className="text-xs text-slate-500">{h.day}</span>
                <span className="text-xs font-medium text-slate-700">
                  {h.month}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700">{h.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
