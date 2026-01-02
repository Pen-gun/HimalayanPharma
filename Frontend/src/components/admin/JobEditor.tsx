import type { JobListing } from '../../lib/api';
import { removeArrayItem, updateArrayItem, createEmptyJob } from '../../utils/admin';

interface JobEditorProps {
  jobs: JobListing[];
  onChange: (jobs: JobListing[]) => void;
}

export const JobEditor = ({ jobs, onChange }: JobEditorProps) => {
  return (
    <section className="space-y-4 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-orange-900">Job Listings</h3>
          <p className="text-sm text-slate-600">Positions and career opportunities</p>
        </div>
        <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
          {jobs.length} positions
        </span>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">No job listings added yet</p>
        ) : (
          jobs.map((job, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 hover:border-slate-300 transition"
            >
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                  placeholder="Job title"
                  value={job.title}
                  onChange={(e) => onChange(updateArrayItem(jobs, idx, { title: e.target.value }))}
                />
                <input
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                  placeholder="Location"
                  value={job.location}
                  onChange={(e) => onChange(updateArrayItem(jobs, idx, { location: e.target.value }))}
                />
              </div>

              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                placeholder="Employment type (e.g., Full-time, Remote)"
                value={job.type}
                onChange={(e) => onChange(updateArrayItem(jobs, idx, { type: e.target.value }))}
              />

              <textarea
                className="w-full min-h-[60px] rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-vertical"
                placeholder="Job summary and description"
                value={job.summary}
                onChange={(e) => onChange(updateArrayItem(jobs, idx, { summary: e.target.value }))}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                  onClick={() => onChange(removeArrayItem(jobs, idx))}
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
        className="w-full rounded-lg bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-200 transition"
        onClick={() => onChange([...jobs, createEmptyJob()])}
      >
        + Add Job Listing
      </button>
    </section>
  );
};
