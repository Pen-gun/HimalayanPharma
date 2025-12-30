import { Link } from 'react-router-dom';
import { Leaf, Play } from 'lucide-react';

interface HeroProps {
  heading: string;
  subheading: string;
  tagline?: string;
  primaryText: string;
  primaryLink: string;
  secondaryText?: string;
  secondaryLink?: string;
  backgroundImage?: string;
}

const Hero = ({
  heading,
  subheading,
  tagline = 'Wellness rooted in nature. Proven in science.',
  primaryText,
  primaryLink,
  secondaryText,
  secondaryLink,
  backgroundImage = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
}: HeroProps) => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(13, 49, 30, 0.75), rgba(13, 49, 30, 0.4)), url(${backgroundImage})`,
        }}
      />
      <div className="section-shell grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="space-y-6 text-white">
          <span className="pill bg-white/15 text-emerald-50">Himalayan Pharma Works</span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="text-lg text-emerald-50/90 lg:text-xl">{subheading}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to={primaryLink} className="btn-primary bg-white text-emerald-800 shadow-white/30">
              <Leaf className="mr-2 h-4 w-4" />
              {primaryText}
            </Link>
            {secondaryText && secondaryLink && (
              <Link to={secondaryLink} className="btn-secondary border-white/60 text-white hover:bg-white/10">
                <Play className="mr-2 h-4 w-4" />
                {secondaryText}
              </Link>
            )}
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-50/80">{tagline}</p>
        </div>
        <div className="glass-panel rounded-2xl p-8 text-slate-900">
          <h3 className="text-xl font-semibold text-emerald-800">Science-backed Ayurveda</h3>
          <p className="mt-3 text-sm text-slate-700">
            We pair ancient Himalayan botanicals with chromatography, clinical validation, and strict quality by design to deliver consistent, trustworthy formulations.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {["Clinically studied", "Traceable sourcing", "cGMP labs", "Herbal + modern actives"].map((item) => (
              <div key={item} className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm font-semibold text-emerald-800">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
