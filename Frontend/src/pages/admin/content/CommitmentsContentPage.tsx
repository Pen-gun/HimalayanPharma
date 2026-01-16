import { HighlightEditor } from '../../../components/admin/HighlightEditor';
import { ContentSectionShell } from './ContentSectionShell';

const CommitmentsContentPage = () => {
  return (
    <ContentSectionShell
      title="Company Commitments"
      description="Manage commitments displayed on the Commitments page."
    >
      {(form, updateForm) => (
        <HighlightEditor
          highlights={form.commitments}
          onChange={(commitments) => updateForm({ ...form, commitments })}
          title="Company Commitments"
          subtitle="Our values and promises to customers"
          color="slate"
        />
      )}
    </ContentSectionShell>
  );
};

export default CommitmentsContentPage;
