// components/dashboard/EventTilePanel.jsx

/**
 * EventTilePanel — a titled panel that shows a date filter and a list of
 * event records (birthdays, work anniversaries, etc.).
 *
 * Props:
 *  title    {string}           – panel heading
 *  date     {string}           – date string shown in the readonly input (DD-MM-YYYY)
 *  records  {Array<ReactNode|string>} – list of record elements; renders "No records" when empty
 */
export default function EventTilePanel({ title, date, records = [] }) {
  return (
    <div className="rounded-md border border-slate-100 bg-slate-50 px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-slate-700">{title}</p>
        <input
          type="text"
          value={date}
          readOnly
          className="h-8 rounded border border-slate-200 bg-white px-2 text-xs text-slate-600"
        />
      </div>

      {records.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">No records</p>
      ) : (
        <ul className="space-y-2">
          {records.map((record, idx) => (
            <li key={idx} className="text-sm text-slate-700">
              {record}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
