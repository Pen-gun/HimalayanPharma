import type { HomeContent } from '../../lib/api';

interface HomeContentEditorProps {
  home: HomeContent;
  onChange: (home: HomeContent) => void;
}

const inputClass =
  'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none';

const textareaClass =
  'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none';

export const HomeContentEditor = ({ home, onChange }: HomeContentEditorProps) => {
  const updateSection = <K extends keyof HomeContent>(section: K, updates: Partial<HomeContent[K]>) => {
    onChange({ ...home, [section]: { ...home[section], ...updates } });
  };

  const updateListItem = (
    section: 'about',
    field: 'bullets' | 'highlights',
    index: number,
    value: string
  ) => {
    const list = [...home[section][field]];
    list[index] = value;
    updateSection(section, { [field]: list } as Partial<HomeContent['about']>);
  };

  const addListItem = (section: 'about', field: 'bullets' | 'highlights') => {
    const list = [...home[section][field], ''];
    updateSection(section, { [field]: list } as Partial<HomeContent['about']>);
  };

  const removeListItem = (section: 'about', field: 'bullets' | 'highlights', index: number) => {
    const list = home[section][field].filter((_, idx) => idx !== index);
    updateSection(section, { [field]: list } as Partial<HomeContent['about']>);
  };

  const updateLimit = (section: 'featured' | 'journal', value: string) => {
    const parsed = Number(value);
    updateSection(section, { limit: Number.isFinite(parsed) ? parsed : 0 } as Partial<HomeContent[typeof section]>);
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Homepage Content</h3>
        <p className="text-sm text-slate-600">Edit hero copy, section labels, and call-to-action text</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-800">Hero</h4>
          <div className="mt-3 grid gap-3">
            <input
              className={inputClass}
              value={home.hero.heading}
              onChange={(e) => updateSection('hero', { heading: e.target.value })}
              placeholder="Hero heading"
            />
            <textarea
              className={textareaClass}
              rows={2}
              value={home.hero.subheading}
              onChange={(e) => updateSection('hero', { subheading: e.target.value })}
              placeholder="Hero subheading"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className={inputClass}
                value={home.hero.primaryText}
                onChange={(e) => updateSection('hero', { primaryText: e.target.value })}
                placeholder="Primary CTA label"
              />
              <input
                className={inputClass}
                value={home.hero.primaryLink}
                onChange={(e) => updateSection('hero', { primaryLink: e.target.value })}
                placeholder="Primary CTA link"
              />
              <input
                className={inputClass}
                value={home.hero.secondaryText}
                onChange={(e) => updateSection('hero', { secondaryText: e.target.value })}
                placeholder="Secondary CTA label"
              />
              <input
                className={inputClass}
                value={home.hero.secondaryLink}
                onChange={(e) => updateSection('hero', { secondaryLink: e.target.value })}
                placeholder="Secondary CTA link"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-800">Featured Products</h4>
          <div className="mt-3 grid gap-3">
            <input
              className={inputClass}
              value={home.featured.eyebrow}
              onChange={(e) => updateSection('featured', { eyebrow: e.target.value })}
              placeholder="Eyebrow label"
            />
            <input
              className={inputClass}
              value={home.featured.title}
              onChange={(e) => updateSection('featured', { title: e.target.value })}
              placeholder="Section title"
            />
            <textarea
              className={textareaClass}
              rows={2}
              value={home.featured.subtitle}
              onChange={(e) => updateSection('featured', { subtitle: e.target.value })}
              placeholder="Section subtitle"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className={inputClass}
                value={home.featured.ctaText}
                onChange={(e) => updateSection('featured', { ctaText: e.target.value })}
                placeholder="CTA label"
              />
              <input
                className={inputClass}
                value={home.featured.ctaLink}
                onChange={(e) => updateSection('featured', { ctaLink: e.target.value })}
                placeholder="CTA link"
              />
              <input
                className={inputClass}
                type="number"
                min={1}
                value={home.featured.limit}
                onChange={(e) => updateLimit('featured', e.target.value)}
                placeholder="Number of products"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-800">About Section</h4>
          <div className="mt-3 grid gap-3">
            <input
              className={inputClass}
              value={home.about.eyebrow}
              onChange={(e) => updateSection('about', { eyebrow: e.target.value })}
              placeholder="Eyebrow label"
            />
            <input
              className={inputClass}
              value={home.about.title}
              onChange={(e) => updateSection('about', { title: e.target.value })}
              placeholder="Section title"
            />
            <textarea
              className={textareaClass}
              rows={2}
              value={home.about.subtitle}
              onChange={(e) => updateSection('about', { subtitle: e.target.value })}
              placeholder="Section subtitle"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className={inputClass}
                value={home.about.ctaText}
                onChange={(e) => updateSection('about', { ctaText: e.target.value })}
                placeholder="CTA label"
              />
              <input
                className={inputClass}
                value={home.about.ctaLink}
                onChange={(e) => updateSection('about', { ctaLink: e.target.value })}
                placeholder="CTA link"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">Bullets</p>
              <div className="mt-2 space-y-2">
                {home.about.bullets.map((bullet, idx) => (
                  <div key={`bullet-${idx}`} className="flex gap-2">
                    <input
                      className={inputClass}
                      value={bullet}
                      onChange={(e) => updateListItem('about', 'bullets', idx, e.target.value)}
                      placeholder="Bullet text"
                    />
                    <button
                      type="button"
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                      onClick={() => removeListItem('about', 'bullets', idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
                  onClick={() => addListItem('about', 'bullets')}
                >
                  + Add bullet
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">Highlights</p>
              <div className="mt-2 space-y-2">
                {home.about.highlights.map((highlight, idx) => (
                  <div key={`highlight-${idx}`} className="flex gap-2">
                    <input
                      className={inputClass}
                      value={highlight}
                      onChange={(e) => updateListItem('about', 'highlights', idx, e.target.value)}
                      placeholder="Highlight text"
                    />
                    <button
                      type="button"
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                      onClick={() => removeListItem('about', 'highlights', idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
                  onClick={() => addListItem('about', 'highlights')}
                >
                  + Add highlight
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-800">Stories</h4>
          <div className="mt-3 grid gap-3">
            <input
              className={inputClass}
              value={home.stories.eyebrow}
              onChange={(e) => updateSection('stories', { eyebrow: e.target.value })}
              placeholder="Eyebrow label"
            />
            <input
              className={inputClass}
              value={home.stories.title}
              onChange={(e) => updateSection('stories', { title: e.target.value })}
              placeholder="Section title"
            />
            <textarea
              className={textareaClass}
              rows={2}
              value={home.stories.subtitle}
              onChange={(e) => updateSection('stories', { subtitle: e.target.value })}
              placeholder="Section subtitle"
            />
            <input
              className={inputClass}
              value={home.stories.loadingText}
              onChange={(e) => updateSection('stories', { loadingText: e.target.value })}
              placeholder="Loading text"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h4 className="text-sm font-semibold text-slate-800">Journal</h4>
          <div className="mt-3 grid gap-3">
            <input
              className={inputClass}
              value={home.journal.eyebrow}
              onChange={(e) => updateSection('journal', { eyebrow: e.target.value })}
              placeholder="Eyebrow label"
            />
            <input
              className={inputClass}
              value={home.journal.title}
              onChange={(e) => updateSection('journal', { title: e.target.value })}
              placeholder="Section title"
            />
            <textarea
              className={textareaClass}
              rows={2}
              value={home.journal.subtitle}
              onChange={(e) => updateSection('journal', { subtitle: e.target.value })}
              placeholder="Section subtitle"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className={inputClass}
                value={home.journal.ctaText}
                onChange={(e) => updateSection('journal', { ctaText: e.target.value })}
                placeholder="CTA label"
              />
              <input
                className={inputClass}
                value={home.journal.ctaLink}
                onChange={(e) => updateSection('journal', { ctaLink: e.target.value })}
                placeholder="CTA link"
              />
              <input
                className={inputClass}
                type="number"
                min={1}
                value={home.journal.limit}
                onChange={(e) => updateLimit('journal', e.target.value)}
                placeholder="Number of posts"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
