import { TestimonialEditor } from '../../../components/admin/TestimonialEditor';
import { ContentSectionShell } from './ContentSectionShell';

const TestimonialsContentPage = () => {
  return (
    <ContentSectionShell
      title="Testimonials"
      description="Curate testimonials shown across the homepage."
    >
      {(form, updateForm) => (
        <TestimonialEditor
          testimonials={form.testimonials}
          onChange={(testimonials) => updateForm({ ...form, testimonials })}
        />
      )}
    </ContentSectionShell>
  );
};

export default TestimonialsContentPage;
