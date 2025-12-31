import mongoose, { Schema } from 'mongoose';

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);