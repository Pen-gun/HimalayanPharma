import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { getContent, upsertContent } from '../controllers/contentController.js';

const router = express.Router();

// Public: read site content
router.get('/', getContent);

// Admin only: replace site content
router.put('/', protect, restrictTo('admin'), upsertContent);

export default router;
