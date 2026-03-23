// components/dashboard/EmployeesOnLeave.jsx

/**
 * EmployeesOnLeave — panel showing employees currently on leave.
 *
 * Props:
 *  records  {Array<ReactNode|string>}  – leave records; shows "No records" when empty
 */
export default function EmployeesOnLeave({ records = [] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h3 className="text-lg font-semibold text-slate-700 mb-3">
        Employees on Leave
      </h3>

      {records.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-16">No records</p>
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
