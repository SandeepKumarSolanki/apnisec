const BaseService = require('./BaseService');
const IssueRepository = require('../repositories/IssueRepository');
const UserRepository = require('../repositories/UserRepository');
const EmailService = require('./EmailService');
const { NotFoundError } = require('../errors');

/**
 * Issue Service Class
 * Handles issue business logic
 */
class IssueService extends BaseService {
    constructor() {
        const repository = new IssueRepository();
        super(repository);
        this.issueRepository = repository;
        this.userRepository = new UserRepository();
        this.emailService = new EmailService();
    }

    /**
     * Get all issues for user
     * @param {String} userId - User ID
     * @param {Object} filters - Query filters
     * @returns {Promise<Array>} User's issues
     */
    async getAllForUser(userId, filters = {}) {
        const { type, status, sort = 'createdAt', order = 'desc' } = filters;

        const query = { user: userId };
        if (type) query.type = type;
        if (status) query.status = status;

        const options = {
            sort: { [sort]: order === 'desc' ? -1 : 1 }
        };

        return await this.issueRepository.find(query, options);
    }

    /**
     * Get single issue for user
     * @param {String} issueId - Issue ID
     * @param {String} userId - User ID
     * @returns {Promise<Object>} Issue
     */
    async getOneForUser(issueId, userId) {
        const issue = await this.issueRepository.findByIdAndUser(issueId, userId);
        if (!issue) {
            throw new NotFoundError('Issue');
        }
        return issue;
    }

    /**
     * Create issue for user
     * @param {String} userId - User ID
     * @param {Object} issueData - Issue data
     * @returns {Promise<Object>} Created issue
     */
    async createForUser(userId, issueData) {
        const issue = await this.issueRepository.createForUser(userId, issueData);

        // Get user for email
        const user = await this.userRepository.findById(userId);

        // Send issue created email (don't await)
        if (user) {
            this.emailService.sendIssueCreated(user, issue).catch(err => {
                console.error('Failed to send issue created email:', err.message);
            });
        }

        return issue;
    }

    /**
     * Update issue for user
     * @param {String} issueId - Issue ID
     * @param {String} userId - User ID
     * @param {Object} updateData - Update data
     * @returns {Promise<Object>} Updated issue
     */
    async updateForUser(issueId, userId, updateData) {
        const issue = await this.issueRepository.updateForUser(issueId, userId, updateData);
        if (!issue) {
            throw new NotFoundError('Issue');
        }
        return issue;
    }

    /**
     * Delete issue for user
     * @param {String} issueId - Issue ID
     * @param {String} userId - User ID
     * @returns {Promise<Object>} Deleted issue
     */
    async deleteForUser(issueId, userId) {
        const issue = await this.issueRepository.deleteForUser(issueId, userId);
        if (!issue) {
            throw new NotFoundError('Issue');
        }
        return issue;
    }

    /**
     * Get issue statistics for user
     * @param {String} userId - User ID
     * @returns {Promise<Object>} Statistics
     */
    async getStatsForUser(userId) {
        return await this.issueRepository.getStatsByUser(userId);
    }
}

module.exports = IssueService;
