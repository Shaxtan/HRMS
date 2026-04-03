// pages/Recruit/Branding.jsx
import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";

const EMPTY_MENU = { id: 1, name: "", url: "" };

export default function Branding() {
  const [subdomain, setSubdomain] = useState("");
  const [unpublishDays, setUnpublishDays] = useState("");
  const [menus, setMenus] = useState([EMPTY_MENU]);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);

  const careersUrl = subdomain
    ? `https://${subdomain}.tankhapay.com/careers`
    : "https://your-subdomain.tankhapay.com/careers";

  function handleMenuChange(id, key, value) {
    setMenus((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [key]: value } : m))
    );
  }

  function handleAddMenu() {
    setMenus((prev) => [...prev, { id: Date.now(), name: "", url: "" }]);
  }

  function handleRemoveMenu(id) {
    setMenus((prev) => prev.filter((m) => m.id !== id));
  }

  function handleLogoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  }

  function handleFaviconChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFaviconFile(file);
    const url = URL.createObjectURL(file);
    setFaviconPreview(url);
  }

  return (
    <>
      <PageMeta
        title="Branding | HRMS"
        description="Configure branding, subdomain, and careers page menu"
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">Branding</h1>
          <nav className="text-xs text-slate-400">
            Home <span className="mx-1">›</span> Recruit{" "}
            <span className="mx-1">›</span> Branding
          </nav>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-8">
          {/* Logo & Favicon */}
          <section className="grid gap-6 md:grid-cols-2">
            {/* Choose Logo */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-800">
                Choose logo
              </h2>
              <p className="text-xs text-slate-500">
                Upload a company logo to display on your login and careers
                pages. Recommended size: 200×50px, PNG or SVG.
              </p>

              <div className="flex items-center gap-4">
                <label className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-100 hover:border-blue-300 hover:text-blue-700 transition-all">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                  Choose file
                </label>
                <span className="text-xs text-slate-400">
                  {logoFile ? logoFile.name : "No file chosen"}
                </span>
              </div>

              {logoPreview && (
                <div className="mt-2 inline-flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-[11px] text-slate-500">Preview</span>
                </div>
              )}
            </div>

            {/* Choose Favicon */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-800">
                Choose favicon
              </h2>
              <p className="text-xs text-slate-500">
                Upload a favicon to show in the browser tab. Recommended size:
                32×32px, PNG or ICO.
              </p>

              <div className="flex items-center gap-4">
                <label className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-100 hover:border-blue-300 hover:text-blue-700 transition-all">
                  <input
                    type="file"
                    accept="image/png,image/x-icon,image/vnd.microsoft.icon,image/svg+xml"
                    className="hidden"
                    onChange={handleFaviconChange}
                  />
                  Choose file
                </label>
                <span className="text-xs text-slate-400">
                  {faviconFile ? faviconFile.name : "No file chosen"}
                </span>
              </div>

              {faviconPreview && (
                <div className="mt-2 inline-flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                  <div className="h-8 w-8 rounded-md border border-slate-200 bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={faviconPreview}
                      alt="Favicon preview"
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Preview</span>
                </div>
              )}
            </div>
          </section>

          {/* Subdomain */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-800">Subdomain</h2>
            <p className="text-xs text-slate-500">
              When you choose a subdomain, your login page will be available at{" "}
              <span className="font-medium text-slate-700">
                https://{"{subdomain}"}.tankhapay.com
              </span>
              .
            </p>

            <div className="max-w-md">
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                Subdomain
              </label>
              <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <span className="text-slate-400 text-xs">https://</span>
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.trim())}
                  className="flex-1 bg-transparent border-none outline-none px-1 text-sm text-slate-700 placeholder:text-slate-300"
                  placeholder="mydomain"
                />
                <span className="text-slate-400 text-xs">
                  .tankhapay.com
                </span>
              </div>
            </div>
          </section>

          {/* Unpublish job after X days */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Unpublish job after
            </h2>
            <div className="flex items-end gap-3 max-w-xs">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Days
                </label>
                <input
                  type="number"
                  min={0}
                  value={unpublishDays}
                  onChange={(e) => setUnpublishDays(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="30"
                />
              </div>
            </div>
          </section>

          {/* Careers URL preview */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Careers URL
            </h2>
            <p className="text-xs text-slate-500">
              Your new custom branded tankhapay URL is:
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-blue-600">
                {careersUrl}
              </span>
            </div>
          </section>

          {/* Configure Menu */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-800">
                Configure Menu
              </h2>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-medium text-slate-500">
                <span>Menu Name</span>
                <span>Menu URL</span>
              </div>

              <div className="space-y-2">
                {menus.map((menu) => (
                  <div
                    key={menu.id}
                    className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-3 items-center"
                  >
                    <input
                      type="text"
                      value={menu.name}
                      onChange={(e) =>
                        handleMenuChange(menu.id, "name", e.target.value)
                      }
                      placeholder="e.g. About Us"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <input
                      type="text"
                      value={menu.url}
                      onChange={(e) =>
                        handleMenuChange(menu.id, "url", e.target.value)
                      }
                      placeholder="e.g. /about-us"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    {menus.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMenu(menu.id)}
                        className="text-xs text-red-500 hover:text-red-600 font-medium px-2 py-1 rounded-lg hover:bg-red-50"
                      >
                        Remove
                      </button>
                    )}
                    {menus.length === 1 && (
                      <div className="hidden md:block" />
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddMenu}
                className="inline-flex items-center gap-1 rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
              >
                <span className="text-base leading-none">+</span>
                <span>add menu</span>
              </button>
            </div>
          </section>

          {/* Save actions */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              Cancel
            </button>
            <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
