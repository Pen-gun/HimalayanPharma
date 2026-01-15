import type { Highlight } from '../../lib/api';
import { removeArrayItem, updateArrayItem, createEmptyHighlight } from '../../utils/admin';

interface HighlightEditorProps {
  highlights: Highlight[];
  onChange: (highlights: Highlight[]) => void;
  title: string;
  subtitle: string;
  color: 'slate';
}

const colorSchemes = {
  slate: {
    border: 'border-slate-200',
    gradient: 'from-white to-white',
    label: 'bg-blue-50 text-blue-700',
    button: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    focus: 'focus:ring-blue-400',
  },
};

export const HighlightEditor = ({ highlights, onChange, title, subtitle, color }: HighlightEditorProps) => {
  const scheme = colorSchemes[color];

  return (
    <section className={`space-y-4 rounded-2xl border ${scheme.border} bg-white p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-lg font-semibold ${scheme.label.split(' ')[1]}`}>{title}</h3>
          <p className="text-sm text-slate-600">{subtitle}</p>
        </div>
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${scheme.label}`}>
          {highlights.length} items
        </span>
      </div>

      <div className="space-y-3">
        {highlights.length === 0 ? (
          <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">No items added yet</p>
        ) : (
          highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 transition"
            >
              <input
                className={`w-full rounded-lg border border-slate-200 px-3 py-2 text-sm ${scheme.focus} focus:border-transparent outline-none`}
                placeholder="Title"
                value={highlight.title}
                onChange={(e) => onChange(updateArrayItem(highlights, idx, { title: e.target.value }))}
              />

              <textarea
                className={`w-full min-h-[60px] rounded-lg border border-slate-200 px-3 py-2 text-sm ${scheme.focus} focus:border-transparent outline-none resize-vertical`}
                placeholder="Description"
                value={highlight.description}
                onChange={(e) => onChange(updateArrayItem(highlights, idx, { description: e.target.value }))}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                  onClick={() => onChange(removeArrayItem(highlights, idx))}
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
        className={`w-full rounded-lg px-4 py-2 text-sm font-semibold ${scheme.button} transition`}
        onClick={() => onChange([...highlights, createEmptyHighlight()])}
      >
        + Add Item
      </button>
    </section>
  );
};
