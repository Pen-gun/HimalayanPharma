import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
    },
    price: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Full description is required'],
    },
    benefits: {
      type: [String],
      default: [],
    },
    ingredients: {
      type: [String],
      default: [],
    },
    usage: {
      type: String,
      required: [true, 'Usage instructions are required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    scientificInfo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
