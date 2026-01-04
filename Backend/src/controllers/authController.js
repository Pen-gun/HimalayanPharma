import User from '../models/User.js';
import { validationResult } from 'express-validator';
import {
  generateAccessToken,
  getRefreshTokenCookieOptions,
  getClearCookieOptions,
  REFRESH_TOKEN_COOKIE,
  extractRefreshToken,
} from '../utils/tokenUtils.js';

/**
 * Helper: Send tokens response
 * Sets refresh token as HTTP-only cookie and returns access token in body
 */
const sendTokenResponse = async (user, statusCode, res, req, message) => {
  // Generate access token
  const accessToken = generateAccessToken(user);
  
  // Generate refresh token and store in DB
  const refreshToken = await user.createRefreshToken({
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip || req.connection?.remoteAddress,
  });
  
  // Set refresh token as HTTP-only cookie
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, getRefreshTokenCookieOptions());
  
  // Send response
  res.status(statusCode).json({
    success: true,
    message,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      // Include expiresIn for frontend to know when to refresh
      expiresIn: 15 * 60, // 15 minutes in seconds
    },
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer',
    });

    await sendTokenResponse(user, 201, res, req, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    await sendTokenResponse(user, 200, res, req, 'Login successful');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Refresh access token using refresh token from cookie
 * @route   POST /api/v1/auth/refresh
 * @access  Public (but requires valid refresh token cookie)
 */
export const refreshToken = async (req, res, next) => {
  try {
    const token = extractRefreshToken(req);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided',
      });
    }

    // Find user with this refresh token
    // We need to check all users since token is hashed
    const users = await User.find({ 'refreshTokens.0': { $exists: true } });
    
    let validUser = null;
    for (const user of users) {
      const isValid = await user.validateRefreshToken(token);
      if (isValid) {
        validUser = user;
        break;
      }
    }

    if (!validUser) {
      // Clear the invalid cookie
      res.clearCookie(REFRESH_TOKEN_COOKIE, getClearCookieOptions());
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
      });
    }

    // Generate new tokens (token rotation)
    await sendTokenResponse(validUser, 200, res, req, 'Token refreshed successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user (invalidate refresh token)
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
export const logout = async (req, res, next) => {
  try {
    const refreshTokenValue = extractRefreshToken(req);
    
    if (req.user && refreshTokenValue) {
      const user = await User.findById(req.user.id);
      if (user) {
        await user.removeRefreshToken(refreshTokenValue);
      }
    }
    
    // Clear the refresh token cookie
    res.clearCookie(REFRESH_TOKEN_COOKIE, getClearCookieOptions());
    
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout from all devices
 * @route   POST /api/v1/auth/logout-all
 * @access  Private
 */
export const logoutAll = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }
    
    const user = await User.findById(req.user.id);
    if (user) {
      await user.removeAllRefreshTokens();
    }
    
    // Clear the refresh token cookie
    res.clearCookie(REFRESH_TOKEN_COOKIE, getClearCookieOptions());
    
    res.status(200).json({
      success: true,
      message: 'Logged out from all devices',
    });
  } catch (error) {
    next(error);
  }
};
