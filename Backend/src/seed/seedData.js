import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectToDB from '../config/db.js';
import SiteContent from '../models/SiteContent.js';
import { DEFAULT_SITE_CONTENT } from './siteContentDefaults.js';

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: `./${envFile}` });

const shouldForce = process.argv.includes('--force');

const mergeIfMissing = (target, source) => {
  if (Array.isArray(target)) {
    return target.length > 0 ? target : source;
  }

  if (target && typeof target === 'object') {
    const merged = { ...target };
    Object.entries(source).forEach(([key, value]) => {
      if (merged[key] === undefined || merged[key] === null) {
        merged[key] = value;
      } else if (typeof merged[key] === 'object' && merged[key] !== null && typeof value === 'object' && value !== null) {
        merged[key] = mergeIfMissing(merged[key], value);
      }
    });
    return merged;
  }

  return target ?? source;
};

const seedSiteContent = async () => {
  const existing = await SiteContent.findOne({ key: 'default' });

  const payload = DEFAULT_SITE_CONTENT;

  if (existing && !shouldForce) {
    const merged = {
      ...existing.toObject(),
      ...payload,
      home: mergeIfMissing(existing.home || {}, payload.home),
      testimonials: mergeIfMissing(existing.testimonials || [], payload.testimonials),
      stats: mergeIfMissing(existing.stats || [], payload.stats),
      scienceHighlights: mergeIfMissing(existing.scienceHighlights || [], payload.scienceHighlights),
      commitments: mergeIfMissing(existing.commitments || [], payload.commitments),
      jobs: mergeIfMissing(existing.jobs || [], payload.jobs),
      contactLocations: mergeIfMissing(existing.contactLocations || [], payload.contactLocations),
      mediaItems: mergeIfMissing(existing.mediaItems || [], payload.mediaItems),
    };
    await SiteContent.updateOne({ key: 'default' }, { $set: merged });
    console.log('SiteContent updated with missing defaults.');
    return;
  }

  if (existing && shouldForce) {
    await SiteContent.updateOne({ key: 'default' }, { $set: payload });
    console.log('SiteContent overwritten.');
    return;
  }

  await SiteContent.create(payload);
  console.log('SiteContent created.');
};

const run = async () => {
  try {
    await connectToDB();
    await seedSiteContent();
  } catch (error) {
    console.error('Seed failed:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

run();
