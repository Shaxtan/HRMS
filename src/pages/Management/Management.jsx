import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Modal } from "../../components/ui/modal";

const Management = () => {
  const [isAddOrgModalOpen, setIsAddOrgModalOpen] = useState(false);

  // later you can replace with API + form submit
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    gstNumber: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate API call here
    console.log("New organization payload:", formData);
    setIsAddOrgModalOpen(false);
    setFormData({
      name: "",
      organization: "",
      gstNumber: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  return (
    <>
      <PageMeta
        title="Management | HRMS Admin"
        description="Manage organizations, clients and related details."
      />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-theme-xl font-semibold text-gray-900 dark:text-white/90">
              Management
            </h1>
            <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
              Add and manage organizations and their statutory details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddOrgModalOpen(true)}
              className="rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600"
            >
              + Add Organization
            </button>
          </div>
        </div>

        {/* Main card (placeholder table / list for later) */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-5 py-5">
            <h3 className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
              Organizations
            </h3>
            <p className="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">
              Once you add organizations, they will appear here with basic
              details and quick actions.
            </p>

            <div className="mt-6 rounded-xl border border-dashed border-gray-200 bg-gray-25 px-4 py-6 text-center text-theme-sm text-gray-500 dark:border-gray-800 dark:bg-gray-950/40 dark:text-gray-400">
              No organizations added yet. Click{" "}
              <span className="font-medium text-brand-600 dark:text-brand-400">
                “Add Organization”
              </span>{" "}
              to create the first one.
            </div>
          </div>
        </div>

        {/* Add Organization Modal */}
        <Modal
          isOpen={isAddOrgModalOpen}
          onClose={() => setIsAddOrgModalOpen(false)}
          className="max-w-[720px] p-6 lg:p-8"
        >
          <AddOrganizationModalContent
            formData={formData}
            onChange={handleChange}
            onClose={() => setIsAddOrgModalOpen(false)}
            onSubmit={handleSubmit}
          />
        </Modal>
      </div>
    </>
  );
};

const AddOrganizationModalContent = ({ formData, onChange, onClose, onSubmit }) => (
  <form
    onSubmit={onSubmit}
    className="flex flex-col"
  >
    <div>
      <h5 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
        Add Organization
      </h5>
      <p className="text-theme-xs text-gray-500 dark:text-gray-400">
        Capture basic details, contact and statutory information.
      </p>
    </div>

    <div className="mt-6 space-y-4 text-theme-sm">
      {/* Row 1 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Display Name"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Acme Pvt. Ltd."
        />
        <Field
          label="Legal Organization Name"
          name="organization"
          value={formData.organization}
          onChange={onChange}
          placeholder="Acme Technologies Private Limited"
        />
      </div>

      {/* Row 2 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="GST Number"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={onChange}
          placeholder="27ABCDE1234F1Z5"
        />
        <Field
          label="Primary Contact Person"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={onChange}
          placeholder="Rohan Sharma"
        />
      </div>

      {/* Row 3 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Contact Email"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={onChange}
          placeholder="hr@acme.com"
        />
        <Field
          label="Contact Phone"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={onChange}
          placeholder="+91 98765 43210"
        />
      </div>

      {/* Row 4 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Address Line 1"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={onChange}
          placeholder="Plot 21, IT Park"
        />
        <Field
          label="Address Line 2"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={onChange}
          placeholder="Phase 2, Hinjawadi"
        />
      </div>

      {/* Row 5 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="City"
          name="city"
          value={formData.city}
          onChange={onChange}
          placeholder="Pune"
        />
        <Field
          label="State"
          name="state"
          value={formData.state}
          onChange={onChange}
          placeholder="Maharashtra"
        />
        <Field
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={onChange}
          placeholder="411057"
        />
      </div>

      <div className="mt-2 rounded-lg bg-gray-25 p-3 text-theme-xs text-gray-600 dark:bg-gray-950/40 dark:text-gray-400">
        Use the legal name and GSTIN as per registration certificates to avoid
        issues in invoices and statutory reports.
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
      >
        Save Organization
      </button>
    </div>
  </form>
);

const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={name}
      className="text-theme-xs font-medium text-gray-600 dark:text-gray-300"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-theme-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
    />
  </div>
);

export default Management;
