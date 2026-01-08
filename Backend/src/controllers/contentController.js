import SiteContent from '../models/SiteContent.js';

export const getContent = async (req, res, next) => {
  try {
    const content = await SiteContent.findOne({ key: 'default' });

    if (!content) {
      const created = await SiteContent.create({ key: 'default' });
      return res.status(200).json({ success: true, data: created });
    }

    return res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

export const upsertContent = async (req, res, next) => {
  try {
    const payload = req.body || {};

    const content = await SiteContent.findOneAndUpdate(
      { key: 'default' },
      {
        key: 'default',
        testimonials: Array.isArray(payload.testimonials) ? payload.testimonials : [],
        stats: Array.isArray(payload.stats) ? payload.stats : [],
        scienceHighlights: Array.isArray(payload.scienceHighlights) ? payload.scienceHighlights : [],
        commitments: Array.isArray(payload.commitments) ? payload.commitments : [],
        jobs: Array.isArray(payload.jobs) ? payload.jobs : [],
        contactLocations: Array.isArray(payload.contactLocations) ? payload.contactLocations : [],
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Content updated', data: content });
  } catch (error) {
    next(error);
  }
};
