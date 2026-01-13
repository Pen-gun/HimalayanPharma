import type { MediaItem } from '../../lib/api';
import { removeArrayItem, updateArrayItem, createEmptyMediaItem } from '../../utils/admin';

interface MediaEditorProps {
  items: MediaItem[];
  onChange: (items: MediaItem[]) => void;
}

const typeLabels: Record<MediaItem['type'], string> = {
  image: 'Image',
  video: 'Video',
  audio: 'Audio',
};

export const MediaEditor = ({ items, onChange }: MediaEditorProps) => {
  return (
    <section className="space-y-4 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-teal-900">Media Gallery</h3>
          <p className="text-sm text-slate-600">Audio, video, and image items shown on the site</p>
        </div>
        <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
          {items.length} items
        </span>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">No media items added yet</p>
        ) : (
          items.map((item, idx) => (
            <div
              key={`${item.type}-${idx}`}
              className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 hover:border-slate-300 transition"
            >
              <div className="flex flex-wrap gap-3">
                <select
                  className="min-w-[140px] rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
                  value={item.type}
                  onChange={(e) => onChange(updateArrayItem(items, idx, { type: e.target.value as MediaItem['type'] }))}
                >
                  {Object.entries(typeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => onChange(updateArrayItem(items, idx, { title: e.target.value }))}
                />
              </div>

              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
                placeholder="Media URL (image, audio, or video)"
                value={item.url}
                onChange={(e) => onChange(updateArrayItem(items, idx, { url: e.target.value }))}
              />

              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
                  placeholder="Thumbnail URL (optional)"
                  value={item.thumbnailUrl || ''}
                  onChange={(e) => onChange(updateArrayItem(items, idx, { thumbnailUrl: e.target.value }))}
                />
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
                  placeholder="Provider (optional)"
                  value={item.provider || ''}
                  onChange={(e) => onChange(updateArrayItem(items, idx, { provider: e.target.value }))}
                />
              </div>

              <textarea
                className="w-full min-h-[70px] rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none resize-vertical"
                placeholder="Short description (optional)"
                value={item.description || ''}
                onChange={(e) => onChange(updateArrayItem(items, idx, { description: e.target.value }))}
              />

              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Type: {typeLabels[item.type]}</span>
                <button
                  type="button"
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                  onClick={() => onChange(removeArrayItem(items, idx))}
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
        className="w-full rounded-lg bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-200 transition"
        onClick={() => onChange([...items, createEmptyMediaItem()])}
      >
        + Add Media Item
      </button>
    </section>
  );
};
