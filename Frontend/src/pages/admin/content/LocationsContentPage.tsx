import { LocationEditor } from '../../../components/admin/LocationEditor';
import { ContentSectionShell } from './ContentSectionShell';

const LocationsContentPage = () => {
  return (
    <ContentSectionShell
      title="Contact Locations"
      description="Maintain office and contact location details."
    >
      {(form, updateForm) => (
        <LocationEditor
          locations={form.contactLocations}
          onChange={(contactLocations) => updateForm({ ...form, contactLocations })}
        />
      )}
    </ContentSectionShell>
  );
};

export default LocationsContentPage;
