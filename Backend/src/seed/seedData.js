import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectToDB from '../config/db.js';
import SiteContent from '../models/SiteContent.js';
import { DEFAULT_HOME_CONTENT } from './siteContentDefaults.js';

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

  const payload = {
    key: 'default',
    home: DEFAULT_HOME_CONTENT,
  };

  if (existing && !shouldForce) {
    const merged = {
      ...existing.toObject(),
      ...payload,
      home: mergeIfMissing(existing.home || {}, payload.home),
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
