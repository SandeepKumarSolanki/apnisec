const validator = require('validator');

/**
 * Base Validator Class
 * Provides common validation methods
 */
class BaseValidator {
    constructor() {
        this.errors = [];
    }

    /**
     * Reset errors
     */
    reset() {
        this.errors = [];
    }

    /**
     * Add error
     * @param {String} field - Field name
     * @param {String} message - Error message
     */
    addError(field, message) {
        this.errors.push({ field, message });
    }

    /**
     * Check if validation passed
     * @returns {Boolean} Is valid
     */
    isValid() {
        return this.errors.length === 0;
    }

    /**
     * Get validation result
     * @returns {Object} Validation result
     */
    getResult() {
        return {
            isValid: this.isValid(),
            errors: this.errors
        };
    }

    /**
     * Validate required field
     * @param {*} value - Value to check
     * @param {String} field - Field name
     * @param {String} label - Human readable label
     */
    required(value, field, label) {
        if (value === undefined || value === null || value === '') {
            this.addError(field, `${label} is required`);
            return false;
        }
        return true;
    }

    /**
     * Validate string minimum length
     * @param {String} value - Value to check
     * @param {Number} min - Minimum length
     * @param {String} field - Field name
     * @param {String} label - Human readable label
     */
    minLength(value, min, field, label) {
        if (value && value.length < min) {
            this.addError(field, `${label} must be at least ${min} characters`);
            return false;
        }
        return true;
    }

    /**
     * Validate string maximum length
     * @param {String} value - Value to check
     * @param {Number} max - Maximum length
     * @param {String} field - Field name
     * @param {String} label - Human readable label
     */
    maxLength(value, max, field, label) {
        if (value && value.length > max) {
            this.addError(field, `${label} must not exceed ${max} characters`);
            return false;
        }
        return true;
    }

    /**
     * Validate email format
     * @param {String} value - Email to validate
     * @param {String} field - Field name
     */
    email(value, field = 'email') {
        if (value && !validator.isEmail(value)) {
            this.addError(field, 'Please provide a valid email address');
            return false;
        }
        return true;
    }

    /**
     * Validate enum value
     * @param {*} value - Value to check
     * @param {Array} allowed - Allowed values
     * @param {String} field - Field name
     * @param {String} label - Human readable label
     */
    enum(value, allowed, field, label) {
        if (value && !allowed.includes(value)) {
            this.addError(field, `${label} must be one of: ${allowed.join(', ')}`);
            return false;
        }
        return true;
    }

    /**
     * Validate MongoDB ObjectId
     * @param {String} value - ID to validate
     * @param {String} field - Field name
     * @param {String} label - Human readable label
     */
    objectId(value, field, label) {
        if (value && !validator.isMongoId(value)) {
            this.addError(field, `${label} is not a valid ID`);
            return false;
        }
        return true;
    }

    /**
     * Sanitize string input
     * @param {String} value - Value to sanitize
     * @returns {String} Sanitized value
     */
    sanitize(value) {
        if (typeof value !== 'string') return value;
        return validator.escape(validator.trim(value));
    }
}

module.exports = BaseValidator;
