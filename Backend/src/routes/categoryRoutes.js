import express from 'express';
import { body } from 'express-validator';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/v1/categories
router.get('/', getAllCategories);

// GET /api/v1/categories/:id
router.get('/:id', getCategoryById);

// POST /api/v1/categories (protected)
router.post(
  '/',
  protect,
  restrictTo('admin'),
  [body('name').notEmpty().withMessage('Category name is required')],
  createCategory
);

// PUT /api/v1/categories/:id (protected)
router.put(
  '/:id',
  protect,
  restrictTo('admin'),
  [body('name').notEmpty().withMessage('Category name is required')],
  updateCategory
);

// DELETE /api/v1/categories/:id (protected)
router.delete('/:id', protect, restrictTo('admin'), deleteCategory);

export default router;
