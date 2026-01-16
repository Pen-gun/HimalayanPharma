import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, type SiteContent, type Stat, type Testimonial, type Highlight, type JobListing, type ContactLocation, type MediaItem, type HomeContent } from '../../../lib/api';
import { useContentMutation } from '../../../hooks/useAdminMutations';

type FormState = {
  home: HomeContent;
  testimonials: Testimonial[];
  stats: Stat[];
  scienceHighlights: Highlight[];
  commitments: Highlight[];
  jobs: JobListing[];
  contactLocations: ContactLocation[];
  mediaItems: MediaItem[];
};

const emptyHomeContent: HomeContent = {
  hero: {
    heading: '',
    subheading: '',
    primaryText: '',
    primaryLink: '',
    secondaryText: '',
    secondaryLink: '',
  },
  featured: {
    eyebrow: '',
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    limit: 0,
  },
  about: {
    eyebrow: '',
    title: '',
    subtitle: '',
    bullets: [],
    highlights: [],
    ctaText: '',
    ctaLink: '',
  },
  stories: {
    eyebrow: '',
    title: '',
    subtitle: '',
    loadingText: '',
  },
  journal: {
    eyebrow: '',
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    limit: 0,
  },
};

const createEmptyForm = (): FormState => ({
  home: emptyHomeContent,
  testimonials: [],
  stats: [],
  scienceHighlights: [],
  commitments: [],
  jobs: [],
  contactLocations: [],
  mediaItems: [],
});

const buildFormFromContent = (content: SiteContent): FormState => ({
  home: content.home || emptyHomeContent,
  testimonials: content.testimonials || [],
  stats: content.stats || [],
  scienceHighlights: content.scienceHighlights || [],
  commitments: content.commitments || [],
  jobs: content.jobs || [],
  contactLocations: content.contactLocations || [],
  mediaItems: content.mediaItems || [],
});

interface ContentSectionShellProps {
  title: string;
  description: string;
  children: (form: FormState, updateForm: (next: FormState) => void) => ReactNode;
}

export const ContentSectionShell = ({ title, description, children }: ContentSectionShellProps) => {
  const [form, setForm] = useState<FormState>(createEmptyForm());
  const [hasChanges, setHasChanges] = useState(false);

  const { data: contentRes, isLoading } = useQuery({
    queryKey: ['admin-content'],
    queryFn: () => api.content.get(),
  });

  const content = contentRes?.data;

  useEffect(() => {
    if (content) {
      setForm(buildFormFromContent(content));
      setHasChanges(false);
    }
  }, [content]);

  const updateMutation = useContentMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      _id: content?._id || '',
      ...form,
    } as SiteContent;
    updateMutation.mutate(payload);
    setHasChanges(false);
  };

  const updateForm = (next: FormState) => {
    setForm(next);
    setHasChanges(true);
  };

  return (
    <div className="space-y-8 scroll-smooth">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <p className="mt-1 text-slate-600">{description}</p>
          </div>
          {hasChanges && (
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-800">
              Unsaved changes
            </span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <p className="text-slate-600">Loading content...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {children(form, updateForm)}

          <div className="sticky bottom-6 flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-lg hover:bg-blue-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={updateMutation.isPending || !hasChanges}
            >
              {updateMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </span>
              ) : (
                'Save changes'
              )}
            </button>
            {hasChanges && (
              <button
                type="button"
                className="rounded-lg bg-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-300 transition"
                onClick={() => {
                  if (content) {
                    setForm(buildFormFromContent(content));
                    setHasChanges(false);
                  }
                }}
              >
                Discard changes
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
