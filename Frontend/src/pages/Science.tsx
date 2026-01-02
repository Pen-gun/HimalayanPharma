import { useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useContent } from '../hooks/useContent';

const Science = () => {
  const { data: contentData, isLoading } = useContent();

  useEffect(() => {
    document.title = 'Science & Research | Himalayan Pharma Works';
  }, []);

  const highlights = contentData?.data.scienceHighlights || [];

  return (
    <div className="section-shell space-y-10">
      <SectionHeader
        eyebrow="Science"
        title="Research, validation, and quality by design"
        subtitle="We marry traditional knowledge with modern lab rigor to ensure safety, efficacy, and consistency across every batch."
        align="center"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {isLoading && highlights.length === 0 && (
          <p className="text-slate-600">Loading highlights...</p>
        )}
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold text-emerald-900">Clinical studies</h3>
          <p className="mt-3 text-sm text-slate-700">
            Ongoing clinical collaborations across hepatology, metabolic wellness, and immune balance. We focus on double-blind, placebo-controlled designs with transparent endpoints and published results.
          </p>
          <p className="mt-2 text-xs text-slate-500">Data coming soon — request our study summaries via the contact page.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-emerald-900">Quality systems</h3>
          <p className="mt-3 text-sm text-slate-700">
            cGMP-certified facilities, pharmacopeial specs, and multi-point testing: identity, purity, heavy metals, pesticides, microbiology, and stability. Every lot ships with a Certificate of Analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Science;
