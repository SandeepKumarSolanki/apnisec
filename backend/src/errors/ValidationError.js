const AppError = require('./AppError');

/**
 * Validation Error Class
 * Used for input validation failures
 */
class ValidationError extends AppError {
    constructor(message, errors = []) {
        super(message, 400);
        this.name = 'ValidationError';
        this.errors = errors;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            errors: this.errors
        };
    }
}

module.exports = ValidationError;
