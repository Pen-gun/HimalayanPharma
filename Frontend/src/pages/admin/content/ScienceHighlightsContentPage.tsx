import { HighlightEditor } from '../../../components/admin/HighlightEditor';
import { ContentSectionShell } from './ContentSectionShell';

const ScienceHighlightsContentPage = () => {
  return (
    <ContentSectionShell
      title="Science Highlights"
      description="Maintain the scientific highlights shown on the Science page."
    >
      {(form, updateForm) => (
        <HighlightEditor
          highlights={form.scienceHighlights}
          onChange={(scienceHighlights) => updateForm({ ...form, scienceHighlights })}
          title="Science Highlights"
          subtitle="Research and scientific breakthroughs"
          color="slate"
        />
      )}
    </ContentSectionShell>
  );
};

export default ScienceHighlightsContentPage;
