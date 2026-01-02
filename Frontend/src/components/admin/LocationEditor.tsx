import type { ContactLocation } from '../../lib/api';
import { removeArrayItem, updateArrayItem, createEmptyLocation } from '../../utils/admin';

interface LocationEditorProps {
  locations: ContactLocation[];
  onChange: (locations: ContactLocation[]) => void;
}

export const LocationEditor = ({ locations, onChange }: LocationEditorProps) => {
  return (
    <section className="space-y-4 rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-rose-900">Office Locations</h3>
          <p className="text-sm text-slate-600">Contact information for each office</p>
        </div>
        <span className="inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
          {locations.length} offices
        </span>
      </div>

      <div className="space-y-4">
        {locations.length === 0 ? (
          <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">No locations added yet</p>
        ) : (
          locations.map((location, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 hover:border-slate-300 transition"
            >
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none font-semibold"
                placeholder="Office name"
                value={location.office}
                onChange={(e) => onChange(updateArrayItem(locations, idx, { office: e.target.value }))}
              />

              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                placeholder="Street address"
                value={location.address}
                onChange={(e) => onChange(updateArrayItem(locations, idx, { address: e.target.value }))}
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                  placeholder="Phone number"
                  type="tel"
                  value={location.phone}
                  onChange={(e) => onChange(updateArrayItem(locations, idx, { phone: e.target.value }))}
                />
                <input
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
                  placeholder="Email address"
                  type="email"
                  value={location.email}
                  onChange={(e) => onChange(updateArrayItem(locations, idx, { email: e.target.value }))}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                  onClick={() => onChange(removeArrayItem(locations, idx))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        className="w-full rounded-lg bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-200 transition"
        onClick={() => onChange([...locations, createEmptyLocation()])}
      >
        + Add Office Location
      </button>
    </section>
  );
};
