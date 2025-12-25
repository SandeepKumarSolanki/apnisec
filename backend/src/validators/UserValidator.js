const BaseValidator = require('./BaseValidator');

/**
 * User Validator Class
 * Validates user profile-related inputs
 */
class UserValidator extends BaseValidator {
    constructor() {
        super();
    }

    /**
     * Validate profile update data
     * @param {Object} data - Profile data
     * @returns {Object} Validation result
     */
    validateProfileUpdate(data) {
        this.reset();

        // Name validation (optional for update)
        if (data.name !== undefined) {
            if (data.name === '') {
                this.addError('name', 'Name cannot be empty');
            } else {
                this.minLength(data.name, 2, 'name', 'Name');
                this.maxLength(data.name, 50, 'name', 'Name');
            }
        }

        // Phone validation (optional)
        if (data.phone) {
            this.maxLength(data.phone, 20, 'phone', 'Phone');
        }

        // Company validation (optional)
        if (data.company) {
            this.maxLength(data.company, 100, 'company', 'Company');
        }

        return this.getResult();
    }

    /**
     * Sanitize profile data
     * @param {Object} data - Profile data
     * @returns {Object} Sanitized data
     */
    sanitizeProfile(data) {
        const sanitized = {};

        if (data.name !== undefined) sanitized.name = this.sanitize(data.name);
        if (data.phone !== undefined) sanitized.phone = this.sanitize(data.phone);
        if (data.company !== undefined) sanitized.company = this.sanitize(data.company);

        return sanitized;
    }
}

module.exports = UserValidator;
