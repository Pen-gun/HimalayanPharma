import { StatsEditor } from '../../../components/admin/StatsEditor';
import { ContentSectionShell } from './ContentSectionShell';

const StatsContentPage = () => {
  return (
    <ContentSectionShell
      title="Homepage Statistics"
      description="Manage key metrics displayed on the homepage."
    >
      {(form, updateForm) => (
        <StatsEditor
          stats={form.stats}
          onChange={(stats) => updateForm({ ...form, stats })}
        />
      )}
    </ContentSectionShell>
  );
};

export default StatsContentPage;
