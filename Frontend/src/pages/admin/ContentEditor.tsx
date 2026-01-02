import { useEffect, useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, type SiteContent, type Stat, type Testimonial, type Highlight, type JobListing, type ContactLocation } from '../../lib/api';
import { useContentMutation } from '../../hooks/useAdminMutations';
import { StatsEditor } from '../../components/admin/StatsEditor';
import { TestimonialEditor } from '../../components/admin/TestimonialEditor';
import { HighlightEditor } from '../../components/admin/HighlightEditor';
import { JobEditor } from '../../components/admin/JobEditor';
import { LocationEditor } from '../../components/admin/LocationEditor';

type FormState = {
  testimonials: Testimonial[];
  stats: Stat[];
  scienceHighlights: Highlight[];
  commitments: Highlight[];
  jobs: JobListing[];
  contactLocations: ContactLocation[];
};

const ContentEditor = () => {
  const [form, setForm] = useState<FormState>({
    testimonials: [],
    stats: [],
    scienceHighlights: [],
    commitments: [],
    jobs: [],
    contactLocations: [],
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
        testimonials: content.testimonials || [],
        stats: content.stats || [],
        scienceHighlights: content.scienceHighlights || [],
        commitments: content.commitments || [],
        jobs: content.jobs || [],
        contactLocations: content.contactLocations || [],
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
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Content Management</h1>
            <p className="mt-1 text-slate-600">Edit site-wide content: testimonials, statistics, job listings, and locations</p>
          </div>
          {hasChanges && (
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800">
              Unsaved changes
            </span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
            <p className="text-slate-600">Loading content...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stats Section */}
          <StatsEditor
            stats={form.stats}
            onChange={(stats) => {
              setForm({ ...form, stats });
              handleFormChange();
            }}
          />

          {/* Testimonials Section */}
          <TestimonialEditor
            testimonials={form.testimonials}
            onChange={(testimonials) => {
              setForm({ ...form, testimonials });
              handleFormChange();
            }}
          />

          {/* Science Highlights Section */}
          <HighlightEditor
            highlights={form.scienceHighlights}
            onChange={(scienceHighlights) => {
              setForm({ ...form, scienceHighlights });
              handleFormChange();
            }}
            title="Science Highlights"
            subtitle="Research and scientific breakthroughs"
            color="purple"
          />

          {/* Commitments Section */}
          <HighlightEditor
            highlights={form.commitments}
            onChange={(commitments) => {
              setForm({ ...form, commitments });
              handleFormChange();
            }}
            title="Company Commitments"
            subtitle="Our values and promises to customers"
            color="amber"
          />

          {/* Jobs Section */}
          <JobEditor
            jobs={form.jobs}
            onChange={(jobs) => {
              setForm({ ...form, jobs });
              handleFormChange();
            }}
          />

          {/* Locations Section */}
          <LocationEditor
            locations={form.contactLocations}
            onChange={(contactLocations) => {
              setForm({ ...form, contactLocations });
              handleFormChange();
            }}
          />

          {/* Submit Button */}
          <div className="sticky bottom-6 flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-emerald-600 px-6 py-3 text-center font-semibold text-white shadow-lg hover:bg-emerald-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                      testimonials: content.testimonials || [],
                      stats: content.stats || [],
                      scienceHighlights: content.scienceHighlights || [],
                      commitments: content.commitments || [],
                      jobs: content.jobs || [],
                      contactLocations: content.contactLocations || [],
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
