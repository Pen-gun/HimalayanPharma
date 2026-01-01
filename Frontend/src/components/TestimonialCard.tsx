import { memo } from 'react';
import type{ Testimonial } from '../data/mockData';

interface Props {
  testimonial: Testimonial;
}

const TestimonialCard = memo(({ testimonial }: Props) => (
  <div className="glass-panel flex h-full flex-col gap-3 rounded-2xl p-5">
    <div className="flex items-center gap-3">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="h-12 w-12 rounded-full object-cover"
        loading="lazy"
      />
      <div>
        <p className="text-sm font-semibold text-emerald-900">{testimonial.name}</p>
        <p className="text-xs text-emerald-700">{testimonial.title}</p>
      </div>
    </div>
    <p className="text-sm text-slate-700">"{testimonial.quote}"</p>
  </div>
));

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
