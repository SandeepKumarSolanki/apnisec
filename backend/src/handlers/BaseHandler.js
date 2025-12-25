/**
 * Base Handler Class
 * Provides common response methods for all handlers
 */
class BaseHandler {
    constructor() {
        // Bind methods to ensure 'this' context
        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
        this.created = this.created.bind(this);
        this.noContent = this.noContent.bind(this);
    }

    /**
     * Send success response
     * @param {Object} res - Express response
     * @param {*} data - Response data
     * @param {String} message - Success message
     * @param {Number} statusCode - HTTP status code
     */
    success(res, data = null, message = 'Success', statusCode = 200) {
        const response = {
            success: true,
            message
        };

        if (data !== null) {
            response.data = data;
        }

        return res.status(statusCode).json(response);
    }

    /**
     * Send created response
     * @param {Object} res - Express response
     * @param {*} data - Response data
     * @param {String} message - Success message
     */
    created(res, data = null, message = 'Created successfully') {
        return this.success(res, data, message, 201);
    }

    /**
     * Send no content response
     * @param {Object} res - Express response
     */
    noContent(res) {
        return res.status(204).send();
    }

    /**
     * Send error response
     * @param {Object} res - Express response
     * @param {String} message - Error message
     * @param {Number} statusCode - HTTP status code
     * @param {Array} errors - Validation errors
     */
    error(res, message = 'Error', statusCode = 400, errors = null) {
        const response = {
            success: false,
            message
        };

        if (errors) {
            response.errors = errors;
        }

        return res.status(statusCode).json(response);
    }

    /**
     * Wrap async handler to catch errors
     * @param {Function} fn - Async function
     * @returns {Function} Wrapped function
     */
    asyncHandler(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
}

module.exports = BaseHandler;
