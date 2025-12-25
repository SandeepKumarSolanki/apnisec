const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

/**
 * JWT Utility Class
 * Handles token generation and verification
 */
class JwtUtil {
    constructor() {
        this.secret = jwtConfig.secret;
        this.expiresIn = jwtConfig.expiresIn;
        this.algorithm = jwtConfig.algorithm;
    }

    /**
     * Generate JWT token
     * @param {Object} payload - Token payload
     * @param {String} expiresIn - Token expiration (optional)
     * @returns {String} JWT token
     */
    generateToken(payload, expiresIn = null) {
        return jwt.sign(payload, this.secret, {
            expiresIn: expiresIn || this.expiresIn,
            algorithm: this.algorithm
        });
    }

    /**
     * Verify JWT token
     * @param {String} token - JWT token
     * @returns {Object} Decoded payload
     * @throws {Error} If token is invalid
     */
    verifyToken(token) {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token has expired');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new Error('Invalid token');
            }
            throw error;
        }
    }

    /**
     * Decode token without verification
     * @param {String} token - JWT token
     * @returns {Object} Decoded payload
     */
    decodeToken(token) {
        return jwt.decode(token);
    }

    /**
     * Generate access token for user
     * @param {Object} user - User object
     * @returns {String} Access token
     */
    generateAccessToken(user) {
        return this.generateToken({
            id: user._id || user.id,
            email: user.email,
            role: user.role
        });
    }

    /**
     * Generate refresh token for user
     * @param {Object} user - User object
     * @returns {String} Refresh token (30 days)
     */
    generateRefreshToken(user) {
        return this.generateToken(
            { id: user._id || user.id },
            '30d'
        );
    }
}

module.exports = JwtUtil;
