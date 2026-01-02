import { useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import StatsBar from '../components/StatsBar';
import { useContent } from '../hooks/useContent';

const About = () => {
  const { data: contentData } = useContent();

  useEffect(() => {
    document.title = 'About | Himalayan Pharma Works';
  }, []);

  const stats = contentData?.data.stats || [];

  const timeline = [
    { year: '1990', detail: 'Founded near the lower Himalayas with a focus on herbal research.' },
    { year: '2005', detail: 'Opened first cGMP-certified manufacturing campus and R&D center.' },
    { year: '2015', detail: 'Expanded to 60+ global markets with evidence-led Ayurveda.' },
    { year: '2025', detail: 'Launched regenerative sourcing charter with partner farms.' },
  ];

  const leadership = [
    { name: 'Dr. Meera Iyer', role: 'Chief Scientific Officer', focus: 'Phytochemistry, clinical affairs' },
    { name: 'Arjun Malhotra', role: 'Head of Sustainability', focus: 'Regenerative agriculture, community health' },
    { name: 'Sofia Carter', role: 'VP, Global Markets', focus: 'Clinical storytelling, omni-channel growth' },
  ];

  return (
    <div className="section-shell space-y-12">
      <SectionHeader
        eyebrow="About"
        title="History, mission, and leadership"
        subtitle="We blend Himalayan botanicals with modern research to deliver clean, trustworthy wellness products for families everywhere."
        align="center"
      />

      <StatsBar stats={stats} />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="glass-panel rounded-3xl p-8">
          <h3 className="text-2xl font-semibold text-emerald-900">Our mission</h3>
          <p className="mt-4 text-sm text-slate-700">
            To make evidence-led Ayurveda accessible worldwide by pairing regenerative sourcing, rigorous science, and compassionate care. We commit to transparent labels, clinically studied actives, and sustainable packaging at every step.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li>• Plant-first formulas, standardized for potency and purity.</li>
            <li>• Third-party testing and batch-level Certificates of Analysis.</li>
            <li>• Community investments that elevate growers, not just supply chains.</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-emerald-800">Timeline</h4>
          <div className="space-y-4">
            {timeline.map((item, idx) => (
              <div key={`${item.year}-${idx}`} className="flex gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                <div className="text-lg font-semibold text-emerald-800">{item.year}</div>
                <p className="text-sm text-slate-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-emerald-800">Leadership</h4>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leadership.map((leader) => (
            <div key={leader.name} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="text-base font-semibold text-emerald-900">{leader.name}</div>
              <div className="text-sm text-emerald-700">{leader.role}</div>
              <p className="mt-3 text-sm text-slate-700">{leader.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
