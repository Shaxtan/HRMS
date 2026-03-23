import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Modal } from "../../components/ui/modal";

const Organization = () => {
  const [activeTab, setActiveTab] = useState("departments"); // departments | designations | locations

  const [departments] = useState([
    { id: "d1", name: "Engineering", code: "ENG", head: "Rohan Sharma", strength: 45 },
    { id: "d2", name: "Human Resources", code: "HR", head: "Neha Patel", strength: 8 },
    { id: "d3", name: "Finance", code: "FIN", head: "Amit Verma", strength: 10 },
  ]);

  const [designations] = useState([
    { id: "des1", title: "Software Engineer", level: "L1", dept: "Engineering" },
    { id: "des2", title: "Senior Software Engineer", level: "L2", dept: "Engineering" },
    { id: "des3", title: "HR Executive", level: "L1", dept: "Human Resources" },
  ]);

  const [locations] = useState([
    { id: "loc1", name: "Pune HQ", code: "PUN", type: "Office", city: "Pune", state: "MH" },
    { id: "loc2", name: "Mumbai Branch", code: "MUM", type: "Office", city: "Mumbai", state: "MH" },
    { id: "loc3", name: "Remote", code: "REM", type: "Virtual", city: "-", state: "-" },
  ]);

  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  const [isLocModalOpen, setIsLocModalOpen] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(null);

  return (
    <>
      <PageMeta
        title="Organization | HRMS Admin"
        description="Manage departments, designations and locations."
      />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-theme-xl font-semibold text-gray-900 dark:text-white/90">
              Organization
            </h1>
            <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
              Define departments, designations and locations for the organization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full bg-gray-50 p-1 dark:bg-gray-900">
              <TabButton
                label="Departments"
                active={activeTab === "departments"}
                onClick={() => setActiveTab("departments")}
              />
              <TabButton
                label="Designations"
                active={activeTab === "designations"}
                onClick={() => setActiveTab("designations")}
              />
              <TabButton
                label="Locations"
                active={activeTab === "locations"}
                onClick={() => setActiveTab("locations")}
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid gap-3 md:grid-cols-3">
          <SummaryCard
            label="Departments"
            value={departments.length}
            badge="Teams"
            badgeColor="bg-blue-light-50 text-blue-light-700 dark:bg-blue-light-900/20 dark:text-blue-light-300"
          />
          <SummaryCard
            label="Designations"
            value={designations.length}
            badge="Job roles"
            badgeColor="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
          />
          <SummaryCard
            label="Locations"
            value={locations.length}
            badge="Sites"
            badgeColor="bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-200"
          />
        </div>

        {/* Main */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]">
          {activeTab === "departments" && (
            <DepartmentsSection
              departments={departments}
              onOpenDept={(d) => {
                setSelectedDept(d);
                setIsDeptModalOpen(true);
              }}
            />
          )}

          {activeTab === "designations" && (
            <DesignationsSection designations={designations} />
          )}

          {activeTab === "locations" && (
            <LocationsSection
              locations={locations}
              onOpenLoc={(l) => {
                setSelectedLoc(l);
                setIsLocModalOpen(true);
              }}
            />
          )}
        </div>

        {/* Department modal */}
        <Modal
          isOpen={isDeptModalOpen}
          onClose={() => setIsDeptModalOpen(false)}
          className="max-w-[640px] p-6 lg:p-8"
        >
          {selectedDept && (
            <DeptModalContent
              dept={selectedDept}
              onClose={() => setIsDeptModalOpen(false)}
            />
          )}
        </Modal>

        {/* Location modal */}
        <Modal
          isOpen={isLocModalOpen}
          onClose={() => setIsLocModalOpen(false)}
          className="max-w-[640px] p-6 lg:p-8"
        >
          {selectedLoc && (
            <LocModalContent
              loc={selectedLoc}
              onClose={() => setIsLocModalOpen(false)}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

/* small components */

const TabButton = ({ label, active, onClick }) => (
  <button
    className={`px-3 py-1.5 text-theme-xs rounded-full ${
      active
        ? "bg-white text-gray-900 shadow-theme-xs dark:bg-gray-800"
        : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const SummaryCard = ({ label, value, badge, badgeColor }) => (
  <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-theme-xs text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white/90">
          {value}
        </p>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-theme-xs font-medium ${badgeColor}`}
      >
        {badge}
      </span>
    </div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex gap-3">
    <div className="w-40 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
      {label}
    </div>
    <div className="flex-1 text-theme-sm text-gray-900 dark:text-white/90">
      {value}
    </div>
  </div>
);

/* Sections */

const DepartmentsSection = ({ departments, onOpenDept }) => (
  <>
    <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
            Departments
          </h3>
          <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
            Create simple department structure for org-level reporting.
          </p>
        </div>
        <button className="rounded-lg bg-brand-500 px-3 py-1.5 text-theme-xs font-medium text-white hover:bg-brand-600">
          Add Department
        </button>
      </div>
    </div>

    <div className="px-2 pb-4 pt-2 sm:px-5">
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-100 text-left text-theme-sm dark:divide-gray-800">
          <thead className="bg-gray-25 dark:bg-gray-950/40">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Department
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Code
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Head
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Strength
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {departments.map((d) => (
              <tr
                key={d.id}
                className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
              >
                <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                  {d.name}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {d.code}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {d.head}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {d.strength}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onOpenDept(d)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                  >
                    View / Edit
                  </button>
                </td>
              </tr>
            ))}

            {departments.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
                >
                  No departments added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

const DesignationsSection = ({ designations }) => (
  <>
    <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
            Designations
          </h3>
          <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
            Maintain a flat list of job titles and levels for mid-scale orgs.
          </p>
        </div>
        <button className="rounded-lg bg-brand-500 px-3 py-1.5 text-theme-xs font-medium text-white hover:bg-brand-600">
          Add Designation
        </button>
      </div>
    </div>

    <div className="px-2 pb-4 pt-2 sm:px-5">
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-100 text-left text-theme-sm dark:divide-gray-800">
          <thead className="bg-gray-25 dark:bg-gray-950/40">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Title
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Level
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Department
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {designations.map((des) => (
              <tr
                key={des.id}
                className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
              >
                <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                  {des.title}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {des.level}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {des.dept}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {designations.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
                >
                  No designations configured.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

const LocationsSection = ({ locations, onOpenLoc }) => (
  <>
    <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
            Locations
          </h3>
          <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
            Maintain a simple list of offices and virtual locations.
          </p>
        </div>
        <button className="rounded-lg bg-brand-500 px-3 py-1.5 text-theme-xs font-medium text-white hover:bg-brand-600">
          Add Location
        </button>
      </div>
    </div>

    <div className="px-2 pb-4 pt-2 sm:px-5">
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-100 text-left text-theme-sm dark:divide-gray-800">
          <thead className="bg-gray-25 dark:bg-gray-950/40">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Location
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Code
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                City
              </th>
              <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                State
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {locations.map((loc) => (
              <tr
                key={loc.id}
                className="hover:bg-gray-25 dark:hover:bg-gray-900/60"
              >
                <td className="px-4 py-3 text-theme-sm text-gray-900 dark:text-white/90">
                  {loc.name}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {loc.code}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {loc.type}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {loc.city}
                </td>
                <td className="px-4 py-3 text-theme-sm text-gray-600 dark:text-gray-300">
                  {loc.state}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onOpenLoc(loc)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-theme-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                  >
                    View / Edit
                  </button>
                </td>
              </tr>
            ))}

            {locations.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400"
                >
                  No locations configured.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

/* Modals */

const DeptModalContent = ({ dept, onClose }) => (
  <div className="flex flex-col">
    <div>
      <h5 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
        Department – {dept.name}
      </h5>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
        Basic department details for reporting and approvals.
      </p>
    </div>

    <div className="mt-6 space-y-3 text-theme-sm">
      <InfoRow label="Name" value={dept.name} />
      <InfoRow label="Code" value={dept.code} />
      <InfoRow label="Head" value={dept.head} />
      <InfoRow label="Current Strength" value={String(dept.strength)} />
    </div>

    <div className="mt-6 flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
      >
        Close
      </button>
      <button
        type="button"
        className="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
      >
        Edit Department
      </button>
    </div>
  </div>
);

const LocModalContent = ({ loc, onClose }) => (
  <div className="flex flex-col">
    <div>
      <h5 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
        Location – {loc.name}
      </h5>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
        Location details used in attendance, payroll and reporting.
      </p>
    </div>

    <div className="mt-6 space-y-3 text-theme-sm">
      <InfoRow label="Name" value={loc.name} />
      <InfoRow label="Code" value={loc.code} />
      <InfoRow label="Type" value={loc.type} />
      <InfoRow label="City" value={loc.city} />
      <InfoRow label="State" value={loc.state} />
    </div>

    <div className="mt-6 flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
      >
        Close
      </button>
      <button
        type="button"
        className="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
      >
        Edit Location
      </button>
    </div>
  </div>
);

export default Organization;
