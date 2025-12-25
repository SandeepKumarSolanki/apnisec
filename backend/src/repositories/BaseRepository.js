/**
 * Base Repository Class
 * Provides common CRUD operations for all repositories
 */
class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    /**
     * Create a new document
     * @param {Object} data - Document data
     * @returns {Promise<Object>} Created document
     */
    async create(data) {
        const document = new this.model(data);
        return await document.save();
    }

    /**
     * Find document by ID
     * @param {String} id - Document ID
     * @param {String} select - Fields to select
     * @returns {Promise<Object>} Found document
     */
    async findById(id, select = '') {
        return await this.model.findById(id).select(select);
    }

    /**
     * Find one document by query
     * @param {Object} query - Query object
     * @param {String} select - Fields to select
     * @returns {Promise<Object>} Found document
     */
    async findOne(query, select = '') {
        return await this.model.findOne(query).select(select);
    }

    /**
     * Find all documents matching query
     * @param {Object} query - Query object
     * @param {Object} options - Query options (sort, limit, skip)
     * @returns {Promise<Array>} Array of documents
     */
    async find(query = {}, options = {}) {
        const { sort = { createdAt: -1 }, limit = 50, skip = 0, select = '' } = options;
        return await this.model
            .find(query)
            .select(select)
            .sort(sort)
            .limit(limit)
            .skip(skip);
    }

    /**
     * Update document by ID
     * @param {String} id - Document ID
     * @param {Object} data - Update data
     * @param {Object} options - Update options
     * @returns {Promise<Object>} Updated document
     */
    async updateById(id, data, options = { new: true }) {
        return await this.model.findByIdAndUpdate(id, data, options);
    }

    /**
     * Delete document by ID
     * @param {String} id - Document ID
     * @returns {Promise<Object>} Deleted document
     */
    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }

    /**
     * Count documents matching query
     * @param {Object} query - Query object
     * @returns {Promise<Number>} Count
     */
    async count(query = {}) {
        return await this.model.countDocuments(query);
    }

    /**
     * Check if document exists
     * @param {Object} query - Query object
     * @returns {Promise<Boolean>} Exists
     */
    async exists(query) {
        const doc = await this.model.findOne(query);
        return !!doc;
    }
}

module.exports = BaseRepository;
