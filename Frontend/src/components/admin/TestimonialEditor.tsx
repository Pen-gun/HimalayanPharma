import type { Testimonial } from '../../lib/api';
import { removeArrayItem, updateArrayItem, createEmptyTestimonial } from '../../utils/admin';

interface TestimonialEditorProps {
  testimonials: Testimonial[];
  onChange: (testimonials: Testimonial[]) => void;
}

export const TestimonialEditor = ({ testimonials, onChange }: TestimonialEditorProps) => {
  return (
    <section className="space-y-4 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Testimonials</h3>
          <p className="text-sm text-slate-600">Customer reviews and quotes</p>
        </div>
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {testimonials.length} items
        </span>
      </div>

      <div className="space-y-4">
        {testimonials.length === 0 ? (
          <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">No testimonials added yet</p>
        ) : (
          testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 hover:border-slate-300 transition"
            >
              <div className="flex gap-3">
                <input
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                  placeholder="Name"
                  value={testimonial.name}
                  onChange={(e) => onChange(updateArrayItem(testimonials, idx, { name: e.target.value }))}
                />
                <input
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                  placeholder="Title / Designation"
                  value={testimonial.title}
                  onChange={(e) => onChange(updateArrayItem(testimonials, idx, { title: e.target.value }))}
                />
              </div>

              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                placeholder="Avatar image URL"
                value={testimonial.avatar}
                onChange={(e) => onChange(updateArrayItem(testimonials, idx, { avatar: e.target.value }))}
              />

              <textarea
                className="w-full min-h-[80px] rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-vertical"
                placeholder="Quote or testimonial message"
                value={testimonial.quote}
                onChange={(e) => onChange(updateArrayItem(testimonials, idx, { quote: e.target.value }))}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                  onClick={() => onChange(removeArrayItem(testimonials, idx))}
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
        className="w-full rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200 transition"
        onClick={() => onChange([...testimonials, createEmptyTestimonial()])}
      >
        + Add Testimonial
      </button>
    </section>
  );
};
