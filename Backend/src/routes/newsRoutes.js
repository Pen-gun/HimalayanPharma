import express from 'express';
import { body } from 'express-validator';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/v1/news
router.get('/', getAllNews);

// GET /api/v1/news/:id
router.get('/:id', getNewsById);

// POST /api/v1/news (protected)
router.post(
  '/',
  protect,
  restrictTo('admin'),
  [
    body('title').notEmpty().withMessage('News title is required'),
    body('summary').notEmpty().withMessage('News summary is required'),
    body('content').notEmpty().withMessage('News content is required'),
    body('author').notEmpty().withMessage('News author is required'),
  ],
  createNews
);

// PUT /api/v1/news/:id (protected)
router.put(
  '/:id',
  protect,
  restrictTo('admin'),
  [
    body('title').notEmpty().withMessage('News title is required'),
    body('summary').notEmpty().withMessage('News summary is required'),
    body('content').notEmpty().withMessage('News content is required'),
    body('author').notEmpty().withMessage('News author is required'),
  ],
  updateNews
);

// DELETE /api/v1/news/:id (protected)
router.delete('/:id', protect, restrictTo('admin'), deleteNews);

export default router;
