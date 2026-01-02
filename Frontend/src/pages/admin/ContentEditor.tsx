import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type SiteContent, type Stat, type Testimonial, type Highlight, type JobListing, type ContactLocation } from '../../lib/api';

type FormState = {
  testimonials: Testimonial[];
  stats: Stat[];
  scienceHighlights: Highlight[];
  commitments: Highlight[];
  jobs: JobListing[];
  contactLocations: ContactLocation[];
};

const ContentEditor = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>({
    testimonials: [],
    stats: [],
    scienceHighlights: [],
    commitments: [],
    jobs: [],
    contactLocations: [],
  });

  useEffect(() => {
    document.title = 'Content Editor | Admin';
  }, []);

  const { data: contentRes, isLoading, isFetching } = useQuery({
    queryKey: ['admin-content'],
    queryFn: () => api.content.get(),
  });

  const content = contentRes?.data;

  useEffect(() => {
    if (content) {
      setForm({
        testimonials: content.testimonials || [],
        stats: content.stats || [],
        scienceHighlights: content.scienceHighlights || [],
        commitments: content.commitments || [],
        jobs: content.jobs || [],
        contactLocations: content.contactLocations || [],
      });
    }
  }, [content]);

  const updateMutation = useMutation({
    mutationFn: (payload: SiteContent) => api.content.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
      queryClient.invalidateQueries({ queryKey: ['content'] });
      alert('Content updated successfully!');
    },
    onError: () => {
      alert('Failed to update content');
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      _id: content?._id || '',
      ...form,
    } as SiteContent;
    updateMutation.mutate(payload);
  };

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase text-emerald-700">Site content</p>
          <h2 className="text-xl font-semibold text-emerald-900">Edit testimonials, stats, and more</h2>
        </div>
      </section>

      {isLoading && isFetching ? (
        <p className="text-slate-600">Loading content...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Stats */}
          <section className="space-y-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-900">Stats</h3>
            <div className="space-y-3">
              {form.stats.map((stat, idx) => (
                <div key={idx} className="flex gap-3">
                  <input
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Label"
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...form.stats];
                      newStats[idx].label = e.target.value;
                      setForm({ ...form, stats: newStats });
                    }}
                  />
                  <input
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Value"
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...form.stats];
                      newStats[idx].value = e.target.value;
                      setForm({ ...form, stats: newStats });
                    }}
                  />
                  <button
                    type="button"
                    className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                    onClick={() => {
                      setForm({ ...form, stats: form.stats.filter((_, i) => i !== idx) });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setForm({ ...form, stats: [...form.stats, { label: '', value: '' }] })}
            >
              Add stat
            </button>
          </section>

          {/* Testimonials */}
          <section className="space-y-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-900">Testimonials</h3>
            <div className="space-y-6">
              {form.testimonials.map((testimonial, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Name"
                      value={testimonial.name}
                      onChange={(e) => {
                        const newTestimonials = [...form.testimonials];
                        newTestimonials[idx].name = e.target.value;
                        setForm({ ...form, testimonials: newTestimonials });
                      }}
                    />
                    <input
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Title"
                      value={testimonial.title}
                      onChange={(e) => {
                        const newTestimonials = [...form.testimonials];
                        newTestimonials[idx].title = e.target.value;
                        setForm({ ...form, testimonials: newTestimonials });
                      }}
                    />
                    <input
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
                      placeholder="Avatar URL"
                      value={testimonial.avatar}
                      onChange={(e) => {
                        const newTestimonials = [...form.testimonials];
                        newTestimonials[idx].avatar = e.target.value;
                        setForm({ ...form, testimonials: newTestimonials });
                      }}
                    />
                    <textarea
                      className="min-h-[72px] rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
                      placeholder="Quote"
                      value={testimonial.quote}
                      onChange={(e) => {
                        const newTestimonials = [...form.testimonials];
                        newTestimonials[idx].quote = e.target.value;
                        setForm({ ...form, testimonials: newTestimonials });
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                    onClick={() => {
                      setForm({ ...form, testimonials: form.testimonials.filter((_, i) => i !== idx) });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setForm({
                  ...form,
                  testimonials: [...form.testimonials, { name: '', title: '', quote: '', avatar: '' }],
                })
              }
            >
              Add testimonial
            </button>
          </section>

          {/* Science highlights */}
          <section className="space-y-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-900">Science highlights</h3>
            <div className="space-y-3">
              {form.scienceHighlights.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <input
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...form.scienceHighlights];
                      newItems[idx].title = e.target.value;
                      setForm({ ...form, scienceHighlights: newItems });
                    }}
                  />
                  <div className="flex gap-2">
                    <textarea
                      className="flex-1 min-h-[60px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...form.scienceHighlights];
                        newItems[idx].description = e.target.value;
                        setForm({ ...form, scienceHighlights: newItems });
                      }}
                    />
                    <button
                      type="button"
                      className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 h-fit"
                      onClick={() => {
                        setForm({ ...form, scienceHighlights: form.scienceHighlights.filter((_, i) => i !== idx) });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setForm({
                  ...form,
                  scienceHighlights: [...form.scienceHighlights, { title: '', description: '' }],
                })
              }
            >
              Add highlight
            </button>
          </section>

          {/* Commitments */}
          <section className="space-y-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-900">Commitments</h3>
            <div className="space-y-3">
              {form.commitments.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <input
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...form.commitments];
                      newItems[idx].title = e.target.value;
                      setForm({ ...form, commitments: newItems });
                    }}
                  />
                  <div className="flex gap-2">
                    <textarea
                      className="flex-1 min-h-[60px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...form.commitments];
                        newItems[idx].description = e.target.value;
                        setForm({ ...form, commitments: newItems });
                      }}
                    />
                    <button
                      type="button"
                      className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 h-fit"
                      onClick={() => {
                        setForm({ ...form, commitments: form.commitments.filter((_, i) => i !== idx) });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setForm({
                  ...form,
                  commitments: [...form.commitments, { title: '', description: '' }],
                })
              }
            >
              Add commitment
            </button>
          </section>

          {/* Jobs */}
          <section className="space-y-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-900">Jobs</h3>
            <div className="space-y-6">
              {form.jobs.map((job, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Title"
                      value={job.title}
                      onChange={(e) => {
                        const newJobs = [...form.jobs];
                        newJobs[idx].title = e.target.value;
                        setForm({ ...form, jobs: newJobs });
                      }}
                    />
                    <input
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Location"
                      value={job.location}
                      onChange={(e) => {
                        const newJobs = [...form.jobs];
                        newJobs[idx].location = e.target.value;
                        setForm({ ...form, jobs: newJobs });
                      }}
                    />
                    <input
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Type (e.g., Full-time)"
                      value={job.type}
                      onChange={(e) => {
                        const newJobs = [...form.jobs];
                        newJobs[idx].type = e.target.value;
                        setForm({ ...form, jobs: newJobs });
                      }}
                    />
                    <textarea
                      className="min-h-[60px] rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
                      placeholder="Summary"
                      value={job.summary}
                      onChange={(e) => {
                        const newJobs = [...form.jobs];
                        newJobs[idx].summary = e.target.value;
                        setForm({ ...form, jobs: newJobs });
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                    onClick={() => {
                      setForm({ ...form, jobs: form.jobs.filter((_, i) => i !== idx) });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setForm({
                  ...form,
                  jobs: [...form.jobs, { title: '', location: '', type: '', summary: '' }],
                })
              }
            >
              Add job
            </button>
          </section>

          {/* Contact locations */}
          <section className="space-y-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-900">Contact locations</h3>
            <div className="space-y-6">
              {form.contactLocations.map((location, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="grid gap-3">
                    <input
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Office name"
                      value={location.office}
                      onChange={(e) => {
                        const newLocations = [...form.contactLocations];
                        newLocations[idx].office = e.target.value;
                        setForm({ ...form, contactLocations: newLocations });
                      }}
                    />
                    <input
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Address"
                      value={location.address}
                      onChange={(e) => {
                        const newLocations = [...form.contactLocations];
                        newLocations[idx].address = e.target.value;
                        setForm({ ...form, contactLocations: newLocations });
                      }}
                    />
                    <input
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Phone"
                      value={location.phone}
                      onChange={(e) => {
                        const newLocations = [...form.contactLocations];
                        newLocations[idx].phone = e.target.value;
                        setForm({ ...form, contactLocations: newLocations });
                      }}
                    />
                    <input
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="Email"
                      value={location.email}
                      onChange={(e) => {
                        const newLocations = [...form.contactLocations];
                        newLocations[idx].email = e.target.value;
                        setForm({ ...form, contactLocations: newLocations });
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                    onClick={() => {
                      setForm({ ...form, contactLocations: form.contactLocations.filter((_, i) => i !== idx) });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setForm({
                  ...form,
                  contactLocations: [...form.contactLocations, { office: '', address: '', phone: '', email: '' }],
                })
              }
            >
              Add location
            </button>
          </section>

          <button type="submit" className="btn-primary w-full" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? 'Saving...' : 'Save all changes'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContentEditor;
