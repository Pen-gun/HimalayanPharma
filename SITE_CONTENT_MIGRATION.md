deldte# Backend Site Content Database & Frontend Integration

## What's been implemented

### 1. Backend changes

**New Model**: `Backend/src/models/SiteContent.js`
- Single MongoDB document stores all site-wide editable content: testimonials, stats, science highlights, commitments, jobs, contact locations
- Auto-seeded with default content matching the old mockData on first fetch

**New Controller**: `Backend/src/controllers/contentController.js`
- `GET /api/v1/content` — Fetches the content document; auto-creates with defaults if missing
- `PUT /api/v1/content` — Admin-only; upserts the entire content

**New Routes**: `Backend/src/routes/contentRoutes.js`
- Public read access to `/api/v1/content`
- Admin-protected write access

**App Integration**: `Backend/src/app.js`
- Registered content routes

---

### 2. Frontend API changes

**New Types**: `Frontend/src/lib/api.ts`
- `Stat`, `Testimonial`, `Highlight`, `JobListing`, `ContactLocation`, `SiteContent`
- Added `api.content.get()` and `api.content.update(payload)` endpoints

**New Hook**: `Frontend/src/hooks/useContent.ts`
- `useContent()` — Fetches content with 5-minute cache
- `useUpdateContent()` — Mutation for admin updates with cache invalidation

---

### 3. Frontend page changes

All pages now fetch from backend instead of static mockData:

- **Home.tsx** — Pulls stats and testimonials from `useContent()`
- **Science.tsx** — Fetches scienceHighlights
- **Commitments.tsx** — Fetches commitments
- **Careers.tsx** — Fetches jobs
- **About.tsx** — Fetches stats
- **Contact.tsx** — Fetches contactLocations
- **TestimonialCard.tsx** — Updated import to use shared API type

---

### 4. Admin Panel enhancements

**New Page**: `Frontend/src/pages/admin/ContentEditor.tsx`
- Full CRUD UI for all site content (stats, testimonials, science highlights, commitments, jobs, contact locations)
- Add/remove/edit buttons for each section
- Single "Save all changes" button
- Form state management with individual field updates

**Updated AdminLayout**: `Frontend/src/layouts/AdminLayout.tsx`
- Navigation tabs for Dashboard and Content
- Dynamic quick-jump links (hidden on content page)
- Location-aware styling

**Updated Routing**: `Frontend/src/App.tsx`
- Added `/admin/content` route lazy-loading ContentEditor

---

## How to use

### For admins:

1. Log in as an admin user (must have `role: 'admin'` in database)
2. Navigate to `/admin`
3. Click "**Content**" in the sidebar
4. Edit any section: add/remove testimonials, update stats, manage jobs/locations, etc.
5. Click "**Save all changes**" to persist

### For users:

- Visit any public page; all content now comes from the backend database
- When admins update content, the page cache invalidates and new data loads on refresh/navigation

---

## File structure

```
Backend/
  src/
    models/
      SiteContent.js          [NEW]
    controllers/
      contentController.js    [NEW]
    routes/
      contentRoutes.js        [NEW]
    app.js                    [MODIFIED - added route]

Frontend/
  src/
    lib/
      api.ts                  [MODIFIED - added types & endpoints]
    hooks/
      useContent.ts           [NEW]
    pages/
      Home.tsx                [MODIFIED - uses useContent]
      Science.tsx             [MODIFIED - uses useContent]
      Commitments.tsx         [MODIFIED - uses useContent]
      Careers.tsx             [MODIFIED - uses useContent]
      About.tsx               [MODIFIED - uses useContent]
      Contact.tsx             [MODIFIED - uses useContent]
      admin/
        ContentEditor.tsx      [NEW]
        AdminPanel.tsx         [unchanged]
    components/
      TestimonialCard.tsx      [MODIFIED - type import]
    layouts/
      AdminLayout.tsx          [MODIFIED - added nav tabs]
    App.tsx                    [MODIFIED - added route]
```

---

## Next steps

1. **Restart backend**: Changes to models and routes require a fresh start of `npm run dev` in Backend
2. **Test**: Log in with admin account, visit /admin/content, edit content and save
3. **Verify**: Public pages should reflect changes immediately (cache invalidation handles it)
4. **Seeders** (optional): You can create a migration/seeder script to populate initial content or backup/restore

---

## Default content

On first run, the system auto-seeds the content document with the exact same data from the old mockData.ts file, so existing pages display identically. No data loss—just migrated from static to dynamic.
