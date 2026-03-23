// pages/index.jsx  (or app/page.jsx for App Router)
import PageMeta from "../../components/common/PageMeta";

import EmployeeSummaryRow from "../../pages/Dashboard/EmployeeSummaryRow";
import AttendanceSummaryRow from "../../pages/Dashboard/AttendanceSummaryRow";
import EventTilePanel from "../../pages/Dashboard/EventTilePanel";
import EmployeesOnLeave from "../../pages/Dashboard/EmployeesOnLeave";
import UpcomingHolidays from "../../pages/Dashboard/UpcomingHolidays";
import ChartPanel from "../../pages/Dashboard/ChartPanel";

// ─── Static / fetched data (move to a data layer / API call as needed) ────────

const employeeStats = {
  total: 10,
  relieved: 0,
  newEmployees: 0,
  newMonth: "Mar-2026",
  joiningPending: 0,
};

const attendanceStats = {
  employees: 4,
  present: 4,
  absent: 0,
  lateComers: 0,
};

const todayDate = "19-03-2026";

const upcomingHolidays = [
  { day: 19, month: "Mar", name: "NAVRATRI STARTS" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js HR Dashboard"
        description="HR-style dashboard with summary, attendance, holidays and employees data"
      />

      <div className="space-y-6">
        {/* ── DASHBOARD SUMMARY ─────────────────────────────────────────────── */}
        <section className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Dashboard Summary
          </h2>

          {/* Employee counts */}
          <EmployeeSummaryRow {...employeeStats} />

          {/* Attendance counts */}
          <AttendanceSummaryRow {...attendanceStats} />

          {/* Birthdays / Work Anniversaries */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">
              Birthdays / Work Anniversaries / Leaves / Holidays
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EventTilePanel
                title="Today's Birthdays"
                date={todayDate}
                records={[]}
              />
              <EventTilePanel
                title="Today's Work Anniversaries"
                date={todayDate}
                records={[]}
              />
            </div>
          </div>
        </section>

        {/* ── LOWER 2 × 2 GRID ──────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EmployeesOnLeave records={[]} />

          <UpcomingHolidays
            regions={["HARYANA"]}
            selectedRegion="HARYANA"
            holidayType="PUBLIC HOLIDAY"
            holidays={upcomingHolidays}
          />

          <ChartPanel
            title="Department Wise Employee"
            placeholder="Department wise chart"
          />

          <ChartPanel
            title="Functional Designation (Expertise) Wise Employee"
            placeholder="Functional designation chart"
          />
        </section>
      </div>
    </>
  );
}
