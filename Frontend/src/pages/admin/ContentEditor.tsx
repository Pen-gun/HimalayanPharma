import { useEffect, useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  api,
  type SiteContent,
  type Stat,
  type Testimonial,
  type Highlight,
  type JobListing,
  type ContactLocation,
  type MediaItem,
  type HomeContent,
} from '../../lib/api';
import { useContentMutation } from '../../hooks/useAdminMutations';
import { StatsEditor } from '../../components/admin/StatsEditor';
import { TestimonialEditor } from '../../components/admin/TestimonialEditor';
import { HighlightEditor } from '../../components/admin/HighlightEditor';
import { JobEditor } from '../../components/admin/JobEditor';
import { LocationEditor } from '../../components/admin/LocationEditor';
import { MediaEditor } from '../../components/admin/MediaEditor';
import { HomeContentEditor } from '../../components/admin/HomeContentEditor';
import { DEFAULT_HOME_CONTENT } from '../../data/contentDefaults';

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

const ContentEditor = () => {
  const [form, setForm] = useState<FormState>({
    home: DEFAULT_HOME_CONTENT,
    testimonials: [],
    stats: [],
    scienceHighlights: [],
    commitments: [],
    jobs: [],
    contactLocations: [],
    mediaItems: [],
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    document.title = 'Content Editor | Admin';
  }, []);

  const { data: contentRes, isLoading } = useQuery({
    queryKey: ['admin-content'],
    queryFn: () => api.content.get(),
  });

  const content = contentRes?.data;

  // Load content into form when data arrives
  useEffect(() => {
    if (content) {
      const newForm: FormState = {
        home: content.home || DEFAULT_HOME_CONTENT,
        testimonials: content.testimonials || [],
        stats: content.stats || [],
        scienceHighlights: content.scienceHighlights || [],
        commitments: content.commitments || [],
        jobs: content.jobs || [],
        contactLocations: content.contactLocations || [],
        mediaItems: content.mediaItems || [],
      };
      setForm(newForm);
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

  const handleFormChange = () => {
    setHasChanges(true);
  };

  return (
    <div className="space-y-8 scroll-smooth">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Content Management</h1>
            <p className="mt-1 text-slate-600">Edit site-wide content: testimonials, statistics, job listings, locations, and media gallery</p>
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

          {/* Home Section */}
          <section id="home" className="scroll-mt-24">
            <HomeContentEditor
              home={form.home}
              onChange={(home) => {
                setForm({ ...form, home });
                handleFormChange();
              }}
            />
          </section>

          {/* Stats Section */}
          <section id="stats" className="scroll-mt-24">
            <StatsEditor
              stats={form.stats}
              onChange={(stats) => {
                setForm({ ...form, stats });
                handleFormChange();
              }}
            />
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="scroll-mt-24">
            <TestimonialEditor
              testimonials={form.testimonials}
              onChange={(testimonials) => {
                setForm({ ...form, testimonials });
                handleFormChange();
              }}
            />
          </section>

          {/* Science Highlights Section */}
          <section id="science-highlights" className="scroll-mt-24">
            <HighlightEditor
              highlights={form.scienceHighlights}
              onChange={(scienceHighlights) => {
                setForm({ ...form, scienceHighlights });
                handleFormChange();
              }}
              title="Science Highlights"
              subtitle="Research and scientific breakthroughs"
              color="slate"
            />
          </section>

          {/* Commitments Section */}
          <section id="commitments" className="scroll-mt-24">
            <HighlightEditor
              highlights={form.commitments}
              onChange={(commitments) => {
                setForm({ ...form, commitments });
                handleFormChange();
              }}
              title="Company Commitments"
              subtitle="Our values and promises to customers"
              color="slate"
            />
          </section>

          {/* Media Gallery Section */}
          <section id="media-gallery" className="scroll-mt-24">
            <MediaEditor
              items={form.mediaItems}
              onChange={(mediaItems) => {
                setForm({ ...form, mediaItems });
                handleFormChange();
              }}
            />
          </section>

          {/* Jobs Section */}
          <section id="jobs" className="scroll-mt-24">
            <JobEditor
              jobs={form.jobs}
              onChange={(jobs) => {
                setForm({ ...form, jobs });
                handleFormChange();
              }}
            />
          </section>

          {/* Locations Section */}
          <section id="locations" className="scroll-mt-24">
            <LocationEditor
              locations={form.contactLocations}
              onChange={(contactLocations) => {
                setForm({ ...form, contactLocations });
                handleFormChange();
              }}
            />
          </section>

          {/* Submit Button */}
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
                '✓ Save all changes'
              )}
            </button>
            {hasChanges && (
              <button
                type="button"
                className="rounded-lg bg-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-300 transition"
                onClick={() => {
                  if (content) {
                    setForm({
                      home: content.home || DEFAULT_HOME_CONTENT,
                      testimonials: content.testimonials || [],
                      stats: content.stats || [],
                      scienceHighlights: content.scienceHighlights || [],
                      commitments: content.commitments || [],
                      jobs: content.jobs || [],
                      contactLocations: content.contactLocations || [],
                      mediaItems: content.mediaItems || [],
                    });
                    setHasChanges(false);
                  }
                }}
              >
                ⟲ Discard changes
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ContentEditor;
