import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [200, 'Blog title cannot exceed 200 characters'],
    },
    excerpt: {
      type: String,
      required: [true, 'Blog excerpt is required'],
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    author: {
      type: String,
      default: 'Himalayan Pharma Works',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1508387024700-9fe5c0b36c70?auto=format&fit=crop&w=1200&q=80',
    },
    category: {
      type: String,
      enum: ['Science', 'Commitments', 'R&D', 'Wellness', 'News'],
      default: 'Wellness',
    },
    tags: {
      type: [String],
      default: [],
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);
