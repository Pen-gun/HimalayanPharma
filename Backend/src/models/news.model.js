import mongoose, { Schema, model } from 'mongoose';

const newsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    summary: {
        type: String,
        required: [true, 'Summary is required'],
        maxlength: [500, 'Summary cannot exceed 500 characters'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    coverImage: {
        type: String,
        trim: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
    },
    publishedAt: {
        type: Date,
        default: null,
    }

},{ timestamps: true });

export default model('News', newsSchema);