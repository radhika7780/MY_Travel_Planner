import { body, validationResult } from 'express-validator';

/**
 * Reusable middleware to check for validation errors
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
        });
    }
    next();
};

/**
 * Validation rules for user registration
 */
export const registerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

/**
 * Validation rules for user login
 */
export const loginValidation = [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
];

/**
 * Validation rules for creating a booking
 */
export const createBookingValidation = [
    body('tripId').isMongoId().withMessage('Invalid Trip ID'),
    body('numberOfSeats').isInt({ min: 1 }).withMessage('Must book at least one seat'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
];

/**
 * Validation rules for initiating payment
 */
export const initiatePaymentValidation = [
    body('bookingId').isMongoId().withMessage('Invalid Booking ID'),
];

/**
 * Validation rules for verifying payment
 */
export const verifyPaymentValidation = [
    body('bookingId').isMongoId().withMessage('Invalid Booking ID'),
    body('transactionId').trim().notEmpty().withMessage('Transaction ID is required'),
];
