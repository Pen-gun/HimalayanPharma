import express from 'express';
import { body } from 'express-validator';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/v1/blog
router.get('/', getAllBlogs);

// GET /api/v1/blog/:id
router.get('/:id', getBlogById);

// POST /api/v1/blog (protected)
router.post(
  '/',
  protect,
  restrictTo('admin'),
  [
    body('title').notEmpty().withMessage('Blog title is required'),
    body('excerpt').notEmpty().withMessage('Blog excerpt is required'),
    body('content').notEmpty().withMessage('Blog content is required'),
  ],
  createBlog
);

// PUT /api/v1/blog/:id (protected)
router.put(
  '/:id',
  protect,
  restrictTo('admin'),
  [
    body('title').notEmpty().withMessage('Blog title is required'),
    body('excerpt').notEmpty().withMessage('Blog excerpt is required'),
    body('content').notEmpty().withMessage('Blog content is required'),
  ],
  updateBlog
);

// DELETE /api/v1/blog/:id (protected)
router.delete('/:id', protect, restrictTo('admin'), deleteBlog);

export default router;
