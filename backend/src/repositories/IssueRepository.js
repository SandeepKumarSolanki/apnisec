const BaseRepository = require('./BaseRepository');
const Issue = require('../models/Issue');

/**
 * Issue Repository Class
 * Handles all issue data access operations
 */
class IssueRepository extends BaseRepository {
    constructor() {
        super(Issue);
    }

    /**
     * Find all issues for a user
     * @param {String} userId - User ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} User's issues
     */
    async findByUser(userId, options = {}) {
        const query = { user: userId };
        return await this.find(query, options);
    }

    /**
     * Find issues by user and type
     * @param {String} userId - User ID
     * @param {String} type - Issue type
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Filtered issues
     */
    async findByUserAndType(userId, type, options = {}) {
        const query = { user: userId, type };
        return await this.find(query, options);
    }

    /**
     * Find issues by user and status
     * @param {String} userId - User ID
     * @param {String} status - Issue status
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Filtered issues
     */
    async findByUserAndStatus(userId, status, options = {}) {
        const query = { user: userId, status };
        return await this.find(query, options);
    }

    /**
     * Find issue by ID and user (for authorization)
     * @param {String} issueId - Issue ID
     * @param {String} userId - User ID
     * @returns {Promise<Object>} Issue document
     */
    async findByIdAndUser(issueId, userId) {
        return await this.model.findOne({ _id: issueId, user: userId });
    }

    /**
     * Create issue for user
     * @param {String} userId - User ID
     * @param {Object} issueData - Issue data
     * @returns {Promise<Object>} Created issue
     */
    async createForUser(userId, issueData) {
        const data = { ...issueData, user: userId };
        return await this.create(data);
    }

    /**
     * Update issue for user (with authorization check)
     * @param {String} issueId - Issue ID
     * @param {String} userId - User ID
     * @param {Object} updateData - Update data
     * @returns {Promise<Object>} Updated issue
     */
    async updateForUser(issueId, userId, updateData) {
        return await this.model.findOneAndUpdate(
            { _id: issueId, user: userId },
            updateData,
            { new: true }
        );
    }

    /**
     * Delete issue for user (with authorization check)
     * @param {String} issueId - Issue ID
     * @param {String} userId - User ID
     * @returns {Promise<Object>} Deleted issue
     */
    async deleteForUser(issueId, userId) {
        return await this.model.findOneAndDelete({ _id: issueId, user: userId });
    }

    /**
     * Count issues by user
     * @param {String} userId - User ID
     * @returns {Promise<Number>} Issue count
     */
    async countByUser(userId) {
        return await this.count({ user: userId });
    }

    /**
     * Get issue statistics for user
     * @param {String} userId - User ID
     * @returns {Promise<Object>} Issue statistics
     */
    async getStatsByUser(userId) {
        const stats = await this.model.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    open: { $sum: { $cond: [{ $eq: ['$status', 'open'] }, 1, 0] } },
                    inProgress: { $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] } },
                    resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
                    closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } }
                }
            }
        ]);

        return stats[0] || { total: 0, open: 0, inProgress: 0, resolved: 0, closed: 0 };
    }
}

module.exports = IssueRepository;
