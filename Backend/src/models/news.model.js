import mongoose, { Schema, model } from 'mongoose';

const newsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    summery: {
        type: String,
        required: [true, 'Summery is required'],
        maxlength: [500, 'Summery cannot exceed 500 characters'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    imageUrl: {
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

},{ timestamps: true });

export const News = model('News', newsSchema);