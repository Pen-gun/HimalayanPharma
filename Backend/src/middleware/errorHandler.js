// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Always log error for debugging
  console.error('=== ERROR ===');
  console.error('Path:', req.method, req.path);
  console.error('Message:', err.message);
  console.error('Stack:', err.stack);
  console.error('============');
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: messages,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Mongoose CastError (invalid ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Default error - sanitize message in production
  const message = isDevelopment ? err.message : 'Internal Server Error';
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message,
    ...(isDevelopment && { stack: err.stack }), // Only include stack in development
  });
};

export default errorHandler;
