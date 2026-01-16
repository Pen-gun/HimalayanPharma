import { HomeContentEditor } from '../../../components/admin/HomeContentEditor';
import { ContentSectionShell } from './ContentSectionShell';

const HomeContentPage = () => {
  return (
    <ContentSectionShell
      title="Homepage Content"
      description="Edit hero copy, section labels, and call-to-action text."
    >
      {(form, updateForm) => (
        <HomeContentEditor
          home={form.home}
          onChange={(home) => updateForm({ ...form, home })}
        />
      )}
    </ContentSectionShell>
  );
};

export default HomeContentPage;
