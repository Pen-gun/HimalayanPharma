import { useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useContent } from '../hooks/useContent';

const Careers = () => {
  const { data: contentData, isLoading } = useContent();

  useEffect(() => {
    document.title = 'Careers | Himalayan Pharma Works';
  }, []);

  const jobs = contentData?.data.jobs || [];

  return (
    <div className="section-shell space-y-10">
      <SectionHeader
        eyebrow="Careers"
        title="Join a team shaping the future of herbal science"
        subtitle="Researchers, storytellers, sustainability advocates, and operators welcome."
        align="center"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && jobs.length === 0 && <p className="text-slate-600">Loading roles...</p>}
        {jobs.map((job, idx) => (
          <div key={job.title + idx} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{job.type}</div>
            <h3 className="mt-2 text-lg font-semibold text-emerald-900">{job.title}</h3>
            <p className="text-sm text-emerald-700">{job.location}</p>
            <p className="mt-3 text-sm text-slate-700">{job.summary}</p>
            <button className="mt-4 btn-secondary w-full">View role</button>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-emerald-900">Send an open application</h3>
        <p className="mt-2 text-sm text-slate-700">Tell us about your expertise. We review every submission.</p>
        <form className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            className="rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
            placeholder="Full name"
            aria-label="Full name"
          />
          <input
            className="rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
            placeholder="Email"
            type="email"
            aria-label="Email"
          />
          <input
            className="rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
            placeholder="Role of interest"
            aria-label="Role of interest"
          />
          <input
            className="rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
            placeholder="Location"
            aria-label="Location"
          />
          <textarea
            className="md:col-span-2 rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
            rows={4}
            placeholder="Briefly describe your experience"
            aria-label="Experience"
          />
          <button type="button" className="btn-primary md:col-span-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Careers;
