import { useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import { commitments } from '../data/mockData';

const Commitments = () => {
  useEffect(() => {
    document.title = 'Commitments | Himalayan Pharma Works';
  }, []);

  return (
    <div className="section-shell space-y-10">
      <SectionHeader
        eyebrow="Commitments"
        title="Sustainability, quality, and community"
        subtitle="From seed to shelf, we prioritize regenerative practices, transparent labels, and low-impact packaging."
        align="center"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {commitments.map((item) => (
          <div key={item.title} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-700 p-8 text-white">
        <h3 className="text-2xl font-semibold">Regenerative sourcing charter</h3>
        <p className="mt-3 text-sm text-emerald-50">
          We co-create with Himalayan growers to protect biodiversity, improve soil health, and ensure fair compensation. Annual impact reports detail water savings, soil carbon gains, and community health programs.
        </p>
        <p className="mt-3 text-xs text-emerald-50/80">Audit summary available on request.</p>
      </div>
    </div>
  );
};

export default Commitments;
