import { JobEditor } from '../../../components/admin/JobEditor';
import { ContentSectionShell } from './ContentSectionShell';

const JobsContentPage = () => {
  return (
    <ContentSectionShell
      title="Job Listings"
      description="Update career opportunities shown on the Careers page."
    >
      {(form, updateForm) => (
        <JobEditor
          jobs={form.jobs}
          onChange={(jobs) => updateForm({ ...form, jobs })}
        />
      )}
    </ContentSectionShell>
  );
};

export default JobsContentPage;
