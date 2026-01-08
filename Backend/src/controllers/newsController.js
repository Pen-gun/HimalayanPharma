import News from '../models/news.model.js';
import { validationResult } from 'express-validator';

export const getAllNews = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { page = 1, limit = 10, tag, search, isPublished } = req.query;

    const query = {};

    if (tag) {
      query.tags = tag;
    }

    if (typeof isPublished !== 'undefined') {
      query.isPublished = isPublished === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = Math.min(parseInt(limit, 10) || 10, 100);
    const skip = (pageNum - 1) * limitNum;

    const news = await News.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await News.countDocuments(query);

    return res.status(200).json({
      success: true,
      count: news.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: news,
    });
  } catch (error) {
    console.error('Error in getAllNews:', error);
    next(error);
  }
};

export const getNewsById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News item not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

export const createNews = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      title,
      summary,
      content,
      coverImage,
      tags,
      isPublished,
      author,
      publishedAt,
    } = req.body;

    const shouldPublish = Boolean(isPublished);
    const resolvedPublishedAt = shouldPublish ? publishedAt || new Date() : null;

    const news = await News.create({
      title,
      summary,
      content,
      coverImage,
      tags: Array.isArray(tags) ? tags : [],
      isPublished: shouldPublish,
      author,
      publishedAt: resolvedPublishedAt,
    });

    return res.status(201).json({
      success: true,
      message: 'News item created successfully',
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNews = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const {
      title,
      summary,
      content,
      coverImage,
      tags,
      isPublished,
      author,
      publishedAt,
    } = req.body;

    let news = await News.findById(id);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News item not found',
      });
    }

    const shouldPublish = typeof isPublished === 'boolean' ? isPublished : news.isPublished;
    let resolvedPublishedAt = news.publishedAt;
    if (shouldPublish && !publishedAt && !resolvedPublishedAt) {
      resolvedPublishedAt = new Date();
    } else if (publishedAt) {
      resolvedPublishedAt = publishedAt;
    } else if (!shouldPublish) {
      resolvedPublishedAt = null;
    }

    news = await News.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        content,
        coverImage,
        tags: Array.isArray(tags) ? tags : undefined,
        isPublished: shouldPublish,
        author,
        publishedAt: resolvedPublishedAt,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'News item updated successfully',
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News item not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'News item deleted successfully',
      data: news,
    });
  } catch (error) {
    next(error);
  }
};
