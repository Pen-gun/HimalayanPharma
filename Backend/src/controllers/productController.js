import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { validationResult } from 'express-validator';

export const getAllProducts = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { category, search, page = 1, limit = 10 } = req.query;

    let query = {};

    // Filter by category name (not ID)
    if (category && category !== 'All') {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = Math.min(parseInt(limit, 10) || 10, 100); // Max 100 items per page
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
      .populate('category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: products,
    });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('category');
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true })
      .populate('category')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      name,
      category,
      price,
      image,
      shortDescription,
      description,
      benefits,
      ingredients,
      usage,
      tags,
      featured,
      scientificInfo,
    } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      image,
      shortDescription,
      description,
      benefits: Array.isArray(benefits) ? benefits : [],
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      usage,
      tags: Array.isArray(tags) ? tags : [],
      featured: featured || false,
      scientificInfo,
    });

    await product.populate('category');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const {
      name,
      category,
      price,
      image,
      shortDescription,
      description,
      benefits,
      ingredients,
      usage,
      tags,
      featured,
      scientificInfo,
    } = req.body;

    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        price,
        image,
        shortDescription,
        description,
        benefits: Array.isArray(benefits) ? benefits : undefined,
        ingredients: Array.isArray(ingredients) ? ingredients : undefined,
        usage,
        tags: Array.isArray(tags) ? tags : undefined,
        featured: featured !== undefined ? featured : product.featured,
        scientificInfo,
      },
      { new: true, runValidators: true }
    ).populate('category');

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
