import express from 'express';
import { body } from 'express-validator';

import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/v1/contact
router.post(
    '/',
    [
        body('fullName').notEmpty().withMessage('Full name is required'),
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('message').notEmpty().withMessage('Message is required'),
    ],
    submitContactForm
);

export default router;