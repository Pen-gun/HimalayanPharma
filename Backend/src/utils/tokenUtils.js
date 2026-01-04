/**
 * Token Utilities
 * Handles JWT access tokens and cookie configuration
 */
import jwt from 'jsonwebtoken';

// Environment variables with defaults
const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE || '15m';
const REFRESH_TOKEN_EXPIRE_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRE_DAYS || '7', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Generate a short-lived access token
 * @param {Object} user - User object with _id and role
 * @returns {String} - JWT access token
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role,
      type: 'access'
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: ACCESS_TOKEN_EXPIRE }
  );
};

/**
 * Get cookie options for refresh token
 * Secure, HTTP-only cookie that works on desktop and mobile
 */
export const getRefreshTokenCookieOptions = () => {
  const isProduction = NODE_ENV === 'production';
  
  return {
    httpOnly: true,           // Prevents XSS attacks - JS can't access this cookie
    secure: true,             // Always require HTTPS (even in dev if testing with ngrok/tunnels)
    sameSite: 'none',         // Allow cross-origin cookies (needed for Vercel + Render)
    maxAge: REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60 * 1000, // 7 days in ms
    path: '/',                // Cookie available for all routes
  };
};

/**
 * Get cookie options for clearing refresh token (logout)
 */
export const getClearCookieOptions = () => {
  return {
    httpOnly: true,
    secure: true,             // Match the cookie creation settings
    sameSite: 'none',         // Match the cookie creation settings
    path: '/',
  };
};

/**
 * Cookie name constant
 */
export const REFRESH_TOKEN_COOKIE = 'refreshToken';

/**
 * Verify access token
 * @param {String} token - JWT token
 * @returns {Object|null} - Decoded token or null if invalid
 */
export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== 'access') {
      return null;
    }
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Extract token from various sources
 * Priority: Authorization header > Cookie
 */
export const extractAccessToken = (req) => {
  // 1. Check Authorization header (Bearer token)
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  
  // 2. Check access_token cookie (fallback for some mobile scenarios)
  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }
  
  return null;
};

/**
 * Extract refresh token from cookie
 */
export const extractRefreshToken = (req) => {
  return req.cookies?.[REFRESH_TOKEN_COOKIE] || null;
};
