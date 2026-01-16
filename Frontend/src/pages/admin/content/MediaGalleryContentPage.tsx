import { MediaEditor } from '../../../components/admin/MediaEditor';
import { ContentSectionShell } from './ContentSectionShell';

const MediaGalleryContentPage = () => {
  return (
    <ContentSectionShell
      title="Media Gallery"
      description="Manage images, videos, and audio in the media gallery."
    >
      {(form, updateForm) => (
        <MediaEditor
          items={form.mediaItems}
          onChange={(mediaItems) => updateForm({ ...form, mediaItems })}
        />
      )}
    </ContentSectionShell>
  );
};

export default MediaGalleryContentPage;
