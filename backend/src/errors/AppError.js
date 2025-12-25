/**
 * Base Application Error Class
 * All custom errors extend this class
 */
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = isOperational;
        this.timestamp = new Date().toISOString();

        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            success: false,
            status: this.status,
            statusCode: this.statusCode,
            message: this.message,
            timestamp: this.timestamp
        };
    }
}

module.exports = AppError;
