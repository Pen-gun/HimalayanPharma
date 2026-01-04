import { verifyAccessToken, extractAccessToken } from '../utils/tokenUtils.js';

/**
 * Protect routes - Verify access token
 * Supports both Authorization header and cookie
 */
export const protect = (req, res, next) => {
  try {
    const token = extractAccessToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided',
        code: 'NO_TOKEN',
      });
    }

    const decoded = verifyAccessToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
        code: 'TOKEN_EXPIRED',
      });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Authentication failed',
      code: 'AUTH_FAILED',
      error: error.message,
    });
  }
};

/**
 * Optional authentication - Doesn't fail if no token
 * Useful for routes that work for both authenticated and anonymous users
 */
export const optionalAuth = (req, res, next) => {
  try {
    const token = extractAccessToken(req);

    if (token) {
      const decoded = verifyAccessToken(token);
      if (decoded) {
        req.user = decoded;
      }
    }
    
    next();
  } catch (error) {
    // Don't fail, just continue without user
    next();
  }
};

/**
 * Restrict to specific roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};
