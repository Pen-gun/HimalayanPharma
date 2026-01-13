import type { MediaItem } from '../lib/api';

interface MediaGalleryProps {
  items: MediaItem[];
}

const MediaGallery = ({ items }: MediaGalleryProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="section-shell space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Gallery</p>
        <h2 className="text-2xl font-semibold text-slate-900">Audio, video, and visual stories</h2>
        <p className="text-sm text-slate-600">Highlights from our labs, farms, and community.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <div
            key={`${item.type}-${item.title}-${idx}`}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="space-y-3">
              {item.type === 'image' && (
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-44 w-full rounded-xl object-cover"
                  loading="lazy"
                />
              )}

              {item.type === 'video' && (
                <video
                  controls
                  className="h-44 w-full rounded-xl bg-slate-900"
                  poster={item.thumbnailUrl || undefined}
                >
                  <source src={item.url} />
                </video>
              )}

              {item.type === 'audio' && (
                <div className="space-y-3">
                  {item.thumbnailUrl && (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="h-32 w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                  )}
                  <audio controls className="w-full">
                    <source src={item.url} />
                  </audio>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">{item.type}</span>
                  {item.provider && <span>{item.provider}</span>}
                </div>
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                {item.description && <p className="text-sm text-slate-600">{item.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaGallery;
