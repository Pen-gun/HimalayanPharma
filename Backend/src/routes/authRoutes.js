import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getMe,
  logout,
  logoutAll,
  refreshToken,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/v1/auth/register
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  register
);

// POST /api/v1/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

// POST /api/v1/auth/refresh - Get new access token using refresh token cookie
router.post('/refresh', refreshToken);

// GET /api/v1/auth/me - Get current user (protected)
router.get('/me', protect, getMe);

// POST /api/v1/auth/logout - Logout current session
router.post('/logout', protect, logout);

// POST /api/v1/auth/logout-all - Logout from all devices
router.post('/logout-all', protect, logoutAll);

export default router;
