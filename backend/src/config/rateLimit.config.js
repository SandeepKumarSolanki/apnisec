
const rateLimitConfig = {
    windowMs: 15 * 60 * 1000, 
    maxRequests: 100, 
    message: 'Too many requests, please try again later.',
    standardHeaders: true, 
    legacyHeaders: false
};

module.exports = rateLimitConfig;
