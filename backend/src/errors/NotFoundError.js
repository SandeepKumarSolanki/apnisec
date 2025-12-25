const AppError = require('./AppError');

/**
 * Not Found Error Class
 * Used when a resource is not found
 */
class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404);
        this.name = 'NotFoundError';
        this.resource = resource;
    }
}

module.exports = NotFoundError;
