const { AppError } = require('../errors');

/**
 * Global Error Handler Middleware
 * Handles all errors and sends appropriate responses
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = err.errors || null;

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError' && err.errors) {
        statusCode = 400;
        message = 'Validation Error';
        errors = Object.keys(err.errors).map(key => ({
            field: key,
            message: err.errors[key].message
        }));
    }

    // Handle Mongoose duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
        errors = [{ field, message }];
    }

    // Handle Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
        errors = [{ field: err.path, message: 'Invalid ID format' }];
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token has expired';
    }

    // Build response object
    const response = {
        success: false,
        message,
        statusCode
    };

    // Add errors array if present
    if (errors) {
        response.errors = errors;
    }

    // Add stack trace in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = errorHandler;
