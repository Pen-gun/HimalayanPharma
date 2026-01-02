import type { Stat } from '../../lib/api';
import { removeArrayItem, updateArrayItem, createEmptyStat } from '../../utils/admin';

interface StatsEditorProps {
  stats: Stat[];
  onChange: (stats: Stat[]) => void;
}

export const StatsEditor = ({ stats, onChange }: StatsEditorProps) => {
  return (
    <section className="space-y-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-emerald-900">Statistics</h3>
          <p className="text-sm text-slate-600">Key metrics displayed on homepage</p>
        </div>
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          {stats.length} items
        </span>
      </div>

      <div className="space-y-3">
        {stats.length === 0 ? (
          <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">No statistics added yet</p>
        ) : (
          stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-200 bg-white p-4 flex flex-col gap-3 hover:border-slate-300 transition"
            >
              <div className="flex gap-3">
                <input
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                  placeholder="Label (e.g., Years in Business)"
                  value={stat.label}
                  onChange={(e) => onChange(updateArrayItem(stats, idx, { label: e.target.value }))}
                />
                <input
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                  placeholder="Value (e.g., 30+)"
                  value={stat.value}
                  onChange={(e) => onChange(updateArrayItem(stats, idx, { value: e.target.value }))}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                  onClick={() => onChange(removeArrayItem(stats, idx))}
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
        className="w-full rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-200 transition"
        onClick={() => onChange([...stats, createEmptyStat()])}
      >
        + Add Statistic
      </button>
    </section>
  );
};
