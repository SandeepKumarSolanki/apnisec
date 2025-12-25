const BaseRepository = require('./BaseRepository');
const User = require('../models/User');

/**
 * User Repository Class
 * Handles all user data access operations
 */
class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    /**
     * Find user by email
     * @param {String} email - User email
     * @param {Boolean} includePassword - Include password in result
     * @returns {Promise<Object>} User document
     */
    async findByEmail(email, includePassword = false) {
        const query = this.model.findOne({ email: email.toLowerCase() });
        if (includePassword) {
            query.select('+password');
        }
        return await query;
    }

    /**
     * Find user by ID with password
     * @param {String} id - User ID
     * @returns {Promise<Object>} User document with password
     */
    async findByIdWithPassword(id) {
        return await this.model.findById(id).select('+password');
    }

    /**
     * Check if email exists
     * @param {String} email - Email to check
     * @returns {Promise<Boolean>} Email exists
     */
    async emailExists(email) {
        return await this.exists({ email: email.toLowerCase() });
    }

    /**
     * Update last login time
     * @param {String} id - User ID
     * @returns {Promise<Object>} Updated user
     */
    async updateLastLogin(id) {
        return await this.updateById(id, { lastLogin: new Date() });
    }

    /**
     * Update user profile
     * @param {String} id - User ID
     * @param {Object} profileData - Profile data to update
     * @returns {Promise<Object>} Updated user
     */
    async updateProfile(id, profileData) {
        const allowedFields = ['name', 'phone', 'company'];
        const filteredData = {};

        Object.keys(profileData).forEach(key => {
            if (allowedFields.includes(key)) {
                filteredData[key] = profileData[key];
            }
        });

        return await this.updateById(id, filteredData);
    }
}

module.exports = UserRepository;
