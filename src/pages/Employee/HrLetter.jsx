// pages/Employees/HrLetter.jsx
import PageMeta from "../../components/common/PageMeta";

const HR_LETTERS = [
  {
    key: "appointment",
    title: "Appointment Letter",
    subtitle: "Appointment Letter",
    iconEmoji: "📨",
  },
  {
    key: "offer",
    title: "Offer Letter",
    subtitle: "Offer Letter",
    iconEmoji: "📄",
  },
  {
    key: "experience",
    title: "Experience Letter",
    subtitle: "Job Experience Letter",
    iconEmoji: "📑",
  },
  {
    key: "relieving",
    title: "Relieving letter",
    subtitle: "Relieving Letter",
    iconEmoji: "🧾",
  },
  {
    key: "resignation",
    title: "Resignation letter",
    subtitle: "Job Resignation Announcement",
    iconEmoji: "📦",
  },
];

export default function HrLetter() {
  return (
    <>
      <PageMeta
        title="HR Letter | HRMS"
        description="Preview and manage HR letter templates"
      />

      <div className="space-y-5">
        {/* Top row: Back + breadcrumb aligned to right like screenshot */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
          >
            <span className="text-lg leading-none">←</span>
            <span>Back</span>
          </button>
          <nav className="text-xs text-slate-400">
            Home <span className="mx-1">›</span> HR Letter
          </nav>
        </div>

        {/* Template Preview bar */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800">
            Template Preview
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full bg-emerald-500 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-600 transition-all shadow-sm"
            >
              ADD LETTERHEAD
            </button>
            <button
              type="button"
              className="rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-all shadow-sm"
            >
              ADD CATEGORY
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {HR_LETTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between pt-10 pb-4 px-6"
            >
              <div className="flex flex-col items-center gap-4">
                {/* Icon area – you can swap with real images later */}
                <div className="h-24 w-24 rounded-2xl bg-sky-50 flex items-center justify-center text-4xl">
                  <span>{item.iconEmoji}</span>
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-slate-800 group-hover:text-blue-600">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              {/* Bottom blue bar like screenshot */}
              <div className="mt-6 h-1 w-full bg-sky-200 group-hover:bg-sky-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
