const BaseValidator = require('./BaseValidator');

/**
 * Auth Validator Class
 * Validates authentication-related inputs
 */
class AuthValidator extends BaseValidator {
    constructor() {
        super();
    }

    /**
     * Validate registration data
     * @param {Object} data - Registration data
     * @returns {Object} Validation result
     */
    validateRegister(data) {
        this.reset();

        // Name validation
        if (this.required(data.name, 'name', 'Name')) {
            this.minLength(data.name, 2, 'name', 'Name');
            this.maxLength(data.name, 50, 'name', 'Name');
        }

        // Email validation
        if (this.required(data.email, 'email', 'Email')) {
            this.email(data.email);
        }

        // Password validation
        if (this.required(data.password, 'password', 'Password')) {
            this.minLength(data.password, 6, 'password', 'Password');
            this.maxLength(data.password, 128, 'password', 'Password');
        }

        return this.getResult();
    }

    /**
     * Validate login data
     * @param {Object} data - Login data
     * @returns {Object} Validation result
     */
    validateLogin(data) {
        this.reset();

        // Email validation
        if (this.required(data.email, 'email', 'Email')) {
            this.email(data.email);
        }

        // Password validation
        this.required(data.password, 'password', 'Password');

        return this.getResult();
    }

    /**
     * Sanitize registration data
     * @param {Object} data - Registration data
     * @returns {Object} Sanitized data
     */
    sanitizeRegister(data) {
        return {
            name: this.sanitize(data.name || ''),
            email: (data.email || '').toLowerCase().trim(),
            password: data.password || ''
        };
    }

    /**
     * Sanitize login data
     * @param {Object} data - Login data
     * @returns {Object} Sanitized data
     */
    sanitizeLogin(data) {
        return {
            email: (data.email || '').toLowerCase().trim(),
            password: data.password || ''
        };
    }

    /**
     * Validate forgot password data
     * @param {Object} data - Forgot password data
     * @returns {Object} Validation result
     */
    validateForgotPassword(data) {
        this.reset();

        // Email validation
        if (this.required(data.email, 'email', 'Email')) {
            this.email(data.email);
        }

        return this.getResult();
    }

    /**
     * Validate reset password data
     * @param {Object} data - Reset password data
     * @returns {Object} Validation result
     */
    validateResetPassword(data) {
        this.reset();

        // Token validation
        this.required(data.token, 'token', 'Reset token');

        // Password validation
        if (this.required(data.password, 'password', 'Password')) {
            this.minLength(data.password, 6, 'password', 'Password');
            this.maxLength(data.password, 128, 'password', 'Password');
        }

        return this.getResult();
    }

    /**
     * Sanitize forgot password data
     * @param {Object} data - Forgot password data
     * @returns {Object} Sanitized data
     */
    sanitizeForgotPassword(data) {
        return {
            email: (data.email || '').toLowerCase().trim()
        };
    }

    /**
     * Sanitize reset password data
     * @param {Object} data - Reset password data
     * @returns {Object} Sanitized data
     */
    sanitizeResetPassword(data) {
        return {
            token: (data.token || '').trim(),
            password: data.password || ''
        };
    }
}

module.exports = AuthValidator;
