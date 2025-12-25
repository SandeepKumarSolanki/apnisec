const BaseService = require('./BaseService');
const UserRepository = require('../repositories/UserRepository');
const EmailService = require('./EmailService');
const { NotFoundError } = require('../errors');

/**
 * User Service Class
 * Handles user profile business logic
 */
class UserService extends BaseService {
    constructor() {
        const repository = new UserRepository();
        super(repository);
        this.userRepository = repository;
        this.emailService = new EmailService();
    }

    /**
     * Get user profile
     * @param {String} userId - User ID
     * @returns {Promise<Object>} User profile
     */
    async getProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User');
        }

        return user.toPublicJSON();
    }

    /**
     * Update user profile
     * @param {String} userId - User ID
     * @param {Object} profileData - Profile data
     * @returns {Promise<Object>} Updated user profile
     */
    async updateProfile(userId, profileData) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User');
        }

        const updatedUser = await this.userRepository.updateProfile(userId, profileData);

        // Send profile updated email (don't await)
        this.emailService.sendProfileUpdated(updatedUser).catch(err => {
            console.error('Failed to send profile update email:', err.message);
        });

        return updatedUser.toPublicJSON();
    }
}

module.exports = UserService;
