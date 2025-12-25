const BaseValidator = require('./BaseValidator');

/**
 * Issue Validator Class
 * Validates issue-related inputs
 */
class IssueValidator extends BaseValidator {
    constructor() {
        super();
        this.validTypes = ['cloud-security', 'reteam-assessment', 'vapt'];
        this.validPriorities = ['low', 'medium', 'high', 'critical'];
        this.validStatuses = ['open', 'in-progress', 'resolved', 'closed'];
    }

    /**
     * Validate create issue data
     * @param {Object} data - Issue data
     * @returns {Object} Validation result
     */
    validateCreate(data) {
        this.reset();

        // Type validation
        if (this.required(data.type, 'type', 'Issue type')) {
            this.enum(data.type, this.validTypes, 'type', 'Issue type');
        }

        // Title validation
        if (this.required(data.title, 'title', 'Title')) {
            this.minLength(data.title, 3, 'title', 'Title');
            this.maxLength(data.title, 200, 'title', 'Title');
        }

        // Description validation
        if (this.required(data.description, 'description', 'Description')) {
            this.minLength(data.description, 10, 'description', 'Description');
            this.maxLength(data.description, 5000, 'description', 'Description');
        }

        // Priority validation (optional)
        if (data.priority) {
            this.enum(data.priority, this.validPriorities, 'priority', 'Priority');
        }

        // Status validation (optional)
        if (data.status) {
            this.enum(data.status, this.validStatuses, 'status', 'Status');
        }

        return this.getResult();
    }

    /**
     * Validate update issue data
     * @param {Object} data - Issue data
     * @returns {Object} Validation result
     */
    validateUpdate(data) {
        this.reset();

        // Type validation (optional for update)
        if (data.type) {
            this.enum(data.type, this.validTypes, 'type', 'Issue type');
        }

        // Title validation (optional for update)
        if (data.title) {
            this.minLength(data.title, 3, 'title', 'Title');
            this.maxLength(data.title, 200, 'title', 'Title');
        }

        // Description validation (optional for update)
        if (data.description) {
            this.minLength(data.description, 10, 'description', 'Description');
            this.maxLength(data.description, 5000, 'description', 'Description');
        }

        // Priority validation (optional)
        if (data.priority) {
            this.enum(data.priority, this.validPriorities, 'priority', 'Priority');
        }

        // Status validation (optional)
        if (data.status) {
            this.enum(data.status, this.validStatuses, 'status', 'Status');
        }

        return this.getResult();
    }

    /**
     * Validate issue ID
     * @param {String} id - Issue ID
     * @returns {Object} Validation result
     */
    validateId(id) {
        this.reset();
        this.objectId(id, 'id', 'Issue ID');
        return this.getResult();
    }

    /**
     * Validate filter type
     * @param {String} type - Issue type
     * @returns {Object} Validation result
     */
    validateFilterType(type) {
        this.reset();
        this.enum(type, this.validTypes, 'type', 'Filter type');
        return this.getResult();
    }

    /**
     * Sanitize issue data
     * @param {Object} data - Issue data
     * @returns {Object} Sanitized data
     */
    sanitize(data) {
        const sanitized = {};

        if (data.type) sanitized.type = data.type.toLowerCase().trim();
        if (data.title) sanitized.title = this.sanitize(data.title);
        if (data.description) sanitized.description = data.description.trim();
        if (data.priority) sanitized.priority = data.priority.toLowerCase().trim();
        if (data.status) sanitized.status = data.status.toLowerCase().trim();

        return sanitized;
    }
}

module.exports = IssueValidator;
