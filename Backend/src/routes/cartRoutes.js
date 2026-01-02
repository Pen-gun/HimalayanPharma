import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';

const router = express.Router();

// All cart routes require authentication
router.use(protect);

// Get user's cart
router.get('/', getCart);

// Add item to cart
router.post(
  '/add',
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt().withMessage('Quantity must be an integer'),
  ],
  addToCart
);

// Remove item from cart
router.post(
  '/remove',
  [body('productId').notEmpty().withMessage('Product ID is required')],
  removeFromCart
);

// Clear cart
router.delete('/clear', clearCart);

export default router;
