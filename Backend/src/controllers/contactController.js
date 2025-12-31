import Contact from '../models/Contact.model.js';
import { validationResult } from 'express-validator';

export const submitContactForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { fullName, email, message } = req.body;

    const contact = await Contact.create({
        fullName,
        email,
        message,
    });
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};