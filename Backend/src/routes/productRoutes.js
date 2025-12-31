import express from 'express';
import { body } from 'express-validator';
import {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/v1/products/featured - MUST come before /:id
router.get('/featured', getFeaturedProducts);

// GET /api/v1/products
router.get('/', getAllProducts);

// GET /api/v1/products/:id
router.get('/:id', getProductById);

// POST /api/v1/products (protected)
router.post(
  '/',
  protect,
  restrictTo('admin'),
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('category').notEmpty().withMessage('Product category is required'),
    body('shortDescription')
      .notEmpty()
      .withMessage('Short description is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('usage').notEmpty().withMessage('Usage instructions are required'),
  ],
  createProduct
);

// PUT /api/v1/products/:id (protected)
router.put(
  '/:id',
  protect,
  restrictTo('admin'),
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('category').notEmpty().withMessage('Product category is required'),
    body('shortDescription')
      .notEmpty()
      .withMessage('Short description is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('usage').notEmpty().withMessage('Usage instructions are required'),
  ],
  updateProduct
);

// DELETE /api/v1/products/:id (protected)
router.delete('/:id', protect, restrictTo('admin'), deleteProduct);

export default router;
