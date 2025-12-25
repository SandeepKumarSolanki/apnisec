const rateLimitConfig = require('../config/rateLimit.config');
const { RateLimitError } = require('../errors');

/**
 * Rate Limiter Class
 * Custom rate limiting implementation with in-memory storage
 */
class RateLimiter {
    constructor(options = {}) {
        this.windowMs = options.windowMs || rateLimitConfig.windowMs;
        this.maxRequests = options.maxRequests || rateLimitConfig.maxRequests;
        this.message = options.message || rateLimitConfig.message;

        // In-memory storage for rate limiting
        this.store = new Map();

        // Clean up expired entries every minute
        this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
    }

    /**
     * Get client identifier (IP or user ID)
     * @param {Object} req - Express request
     * @returns {String} Client identifier
     */
    getClientId(req) {
        // Use user ID if authenticated, otherwise use IP
        if (req.user && req.user.id) {
            return `user:${req.user.id}`;
        }

        // Get IP from various headers (for proxies) or connection
        const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
            req.headers['x-real-ip'] ||
            req.connection?.remoteAddress ||
            req.socket?.remoteAddress ||
            'unknown';

        return `ip:${ip}`;
    }

    /**
     * Get rate limit info for client
     * @param {String} clientId - Client identifier
     * @returns {Object} Rate limit info
     */
    getRateLimitInfo(clientId) {
        const now = Date.now();
        let record = this.store.get(clientId);

        // If no record or window expired, create new record
        if (!record || now > record.resetTime) {
            record = {
                count: 0,
                resetTime: now + this.windowMs,
                firstRequest: now
            };
            this.store.set(clientId, record);
        }

        return record;
    }

    /**
     * Increment request count
     * @param {String} clientId - Client identifier
     * @returns {Object} Updated rate limit info
     */
    increment(clientId) {
        const record = this.getRateLimitInfo(clientId);
        record.count++;
        this.store.set(clientId, record);
        return record;
    }

    /**
     * Check if client is rate limited
     * @param {String} clientId - Client identifier
     * @returns {Boolean} Is rate limited
     */
    isRateLimited(clientId) {
        const record = this.getRateLimitInfo(clientId);
        return record.count >= this.maxRequests;
    }

    /**
     * Clean up expired records
     */
    cleanup() {
        const now = Date.now();
        for (const [clientId, record] of this.store.entries()) {
            if (now > record.resetTime) {
                this.store.delete(clientId);
            }
        }
    }

    /**
     * Get Express middleware
     * @returns {Function} Express middleware
     */
    middleware() {
        return (req, res, next) => {
            const clientId = this.getClientId(req);
            const record = this.getRateLimitInfo(clientId);

            // Calculate remaining requests and reset time
            const remaining = Math.max(0, this.maxRequests - record.count);
            const resetSeconds = Math.ceil((record.resetTime - Date.now()) / 1000);

            // Set rate limit headers
            res.setHeader('X-RateLimit-Limit', this.maxRequests);
            res.setHeader('X-RateLimit-Remaining', remaining);
            res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

            // Check if rate limited
            if (this.isRateLimited(clientId)) {
                res.setHeader('Retry-After', resetSeconds);

                return res.status(429).json({
                    success: false,
                    message: this.message,
                    retryAfter: resetSeconds,
                    code: 'RATE_LIMIT_EXCEEDED'
                });
            }

            // Increment count and proceed
            this.increment(clientId);
            next();
        };
    }

    /**
     * Destroy the rate limiter (cleanup interval)
     */
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
}

// Create default instance
const defaultRateLimiter = new RateLimiter();

module.exports = {
    RateLimiter,
    rateLimitMiddleware: defaultRateLimiter.middleware()
};
