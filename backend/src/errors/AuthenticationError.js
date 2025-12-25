const AppError = require('./AppError');

/**
 * Authentication Error Class
 * Used for authentication failures
 */
class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed') {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}

module.exports = AuthenticationError;
