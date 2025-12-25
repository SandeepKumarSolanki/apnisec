const bcrypt = require('bcryptjs');

/**
 * Password Utility Class
 * Handles password hashing and comparison
 */
class PasswordUtil {
    constructor(saltRounds = 12) {
        this.saltRounds = saltRounds;
    }

    /**
     * Hash a password
     * @param {String} password - Plain text password
     * @returns {Promise<String>} Hashed password
     */
    async hash(password) {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }

    /**
     * Compare password with hash
     * @param {String} password - Plain text password
     * @param {String} hash - Hashed password
     * @returns {Promise<Boolean>} Match result
     */
    async compare(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    /**
     * Validate password strength
     * @param {String} password - Password to validate
     * @returns {Object} Validation result with isValid and errors
     */
    validateStrength(password) {
        const errors = [];

        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }

        if (password.length > 128) {
            errors.push('Password must not exceed 128 characters');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

module.exports = PasswordUtil;
