const BaseHandler = require('./BaseHandler');
const UserService = require('../services/UserService');
const { UserValidator } = require('../validators');
const { ValidationError } = require('../errors');

/**
 * User Handler Class
 * Handles user profile-related requests
 */
class UserHandler extends BaseHandler {
    constructor() {
        super();
        this.userService = new UserService();
        this.validator = new UserValidator();
    }

    /**
     * Get user profile
     * GET /api/users/profile
     */
    getProfile = this.asyncHandler(async (req, res) => {
        const profile = await this.userService.getProfile(req.user.id);
        return this.success(res, { profile }, 'Profile retrieved successfully');
    });

    /**
     * Update user profile
     * PUT /api/users/profile
     */
    updateProfile = this.asyncHandler(async (req, res) => {
        // Sanitize and validate input
        const data = this.validator.sanitizeProfile(req.body);
        const validation = this.validator.validateProfileUpdate(data);

        if (!validation.isValid) {
            throw new ValidationError('Validation failed', validation.errors);
        }

        // Update profile
        const profile = await this.userService.updateProfile(req.user.id, data);
        return this.success(res, { profile }, 'Profile updated successfully');
    });
}

module.exports = UserHandler;
