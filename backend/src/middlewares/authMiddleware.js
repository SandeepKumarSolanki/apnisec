const AuthService = require('../services/AuthService');
const { AuthenticationError } = require('../errors');

const authService = new AuthService();

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request
 */
const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AuthenticationError('No token provided');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new AuthenticationError('No token provided');
        }

        // Verify token
        const decoded = authService.verifyToken(token);

        // Attach user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (error) {
        if (error.message === 'Token has expired') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired',
                code: 'TOKEN_EXPIRED'
            });
        }

        if (error.message === 'Invalid token') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
                code: 'INVALID_TOKEN'
            });
        }

        return res.status(401).json({
            success: false,
            message: error.message || 'Authentication failed',
            code: 'AUTH_FAILED'
        });
    }
};

module.exports = authMiddleware;
