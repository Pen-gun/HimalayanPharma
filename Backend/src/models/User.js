import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

/**
 * Refresh Token Schema
 * Stores hashed refresh tokens with expiry and device info
 */
const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Optional: device/session tracking
  userAgent: String,
  ipAddress: String,
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'editor', 'customer'],
      default: 'customer',
    },
    // Refresh tokens array for multi-device support
    refreshTokens: [refreshTokenSchema],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    return error;
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

/**
 * Generate and store a new refresh token
 * @param {Object} options - userAgent, ipAddress for device tracking
 * @returns {String} - The unhashed refresh token to send to client
 */
userSchema.methods.createRefreshToken = async function (options = {}) {
  // Generate a random token
  const refreshToken = crypto.randomBytes(40).toString('hex');
  
  // Hash the token for secure storage
  const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
  
  // Set expiry (7 days)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  // Remove expired tokens and limit to 5 active sessions
  this.refreshTokens = this.refreshTokens
    .filter(rt => rt.expiresAt > new Date())
    .slice(-4); // Keep last 4, adding new one makes 5
  
  // Add the new token
  this.refreshTokens.push({
    token: hashedToken,
    expiresAt,
    userAgent: options.userAgent,
    ipAddress: options.ipAddress,
  });
  
  await this.save();
  
  return refreshToken;
};

/**
 * Validate and remove a refresh token (for rotation)
 * @param {String} token - The unhashed refresh token
 * @returns {Boolean} - Whether the token was valid
 */
userSchema.methods.validateRefreshToken = async function (token) {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
  const tokenIndex = this.refreshTokens.findIndex(
    rt => rt.token === hashedToken && rt.expiresAt > new Date()
  );
  
  if (tokenIndex === -1) {
    return false;
  }
  
  // Remove the used token (rotation)
  this.refreshTokens.splice(tokenIndex, 1);
  await this.save();
  
  return true;
};

/**
 * Remove a specific refresh token (logout)
 */
userSchema.methods.removeRefreshToken = async function (token) {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  this.refreshTokens = this.refreshTokens.filter(rt => rt.token !== hashedToken);
  await this.save();
};

/**
 * Remove all refresh tokens (logout from all devices)
 */
userSchema.methods.removeAllRefreshTokens = async function () {
  this.refreshTokens = [];
  await this.save();
};

export default mongoose.model('User', userSchema);
