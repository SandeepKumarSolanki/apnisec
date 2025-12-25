const AppError = require('./AppError');

/**
 * Rate Limit Error Class
 * Used when rate limit is exceeded
 */
class RateLimitError extends AppError {
    constructor(message = 'Too many requests, please try again later', retryAfter = 60) {
        super(message, 429);
        this.name = 'RateLimitError';
        this.retryAfter = retryAfter;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            retryAfter: this.retryAfter
        };
    }
}

module.exports = RateLimitError;
