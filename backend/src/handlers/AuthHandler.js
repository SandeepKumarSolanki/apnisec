const BaseHandler = require('./BaseHandler');
const AuthService = require('../services/AuthService');
const { AuthValidator } = require('../validators');
const { ValidationError } = require('../errors');

/**
 * Auth Handler Class
 * Handles authentication-related requests
 */
class AuthHandler extends BaseHandler {
    constructor() {
        super();
        this.authService = new AuthService();
        this.validator = new AuthValidator();
    }

    /**
     * Register new user
     * POST /api/auth/register
     */
    register = this.asyncHandler(async (req, res) => {
        // Sanitize and validate input
        const data = this.validator.sanitizeRegister(req.body);
        const validation = this.validator.validateRegister(data);

        if (!validation.isValid) {
            throw new ValidationError('Validation failed', validation.errors);
        }

        // Register user
        const result = await this.authService.register(data);

        return this.created(res, result, 'Registration successful');
    });

    /**
     * Login user
     * POST /api/auth/login
     */
    login = this.asyncHandler(async (req, res) => {
        // Sanitize and validate input
        const data = this.validator.sanitizeLogin(req.body);
        const validation = this.validator.validateLogin(data);

        if (!validation.isValid) {
            throw new ValidationError('Validation failed', validation.errors);
        }

        // Login user
        const result = await this.authService.login(data);

        return this.success(res, result, 'Login successful');
    });

    /**
     * Logout user
     * POST /api/auth/logout
     */
    logout = this.asyncHandler(async (req, res) => {
        // For JWT-based auth, logout is handled client-side
        // Server can optionally blacklist the token
        return this.success(res, null, 'Logout successful');
    });

    /**
     * Get current user
     * GET /api/auth/me
     */
    me = this.asyncHandler(async (req, res) => {
        const user = await this.authService.getCurrentUser(req.user.id);
        return this.success(res, { user }, 'User retrieved successfully');
    });
}

module.exports = AuthHandler;
