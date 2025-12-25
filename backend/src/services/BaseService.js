/**
 * Base Service Class
 * Provides common functionality for all services
 */
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Get all items
     * @param {Object} query - Query filters
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Items
     */
    async getAll(query = {}, options = {}) {
        return await this.repository.find(query, options);
    }

    /**
     * Get item by ID
     * @param {String} id - Item ID
     * @returns {Promise<Object>} Item
     */
    async getById(id) {
        return await this.repository.findById(id);
    }

    /**
     * Create item
     * @param {Object} data - Item data
     * @returns {Promise<Object>} Created item
     */
    async create(data) {
        return await this.repository.create(data);
    }

    /**
     * Update item by ID
     * @param {String} id - Item ID
     * @param {Object} data - Update data
     * @returns {Promise<Object>} Updated item
     */
    async updateById(id, data) {
        return await this.repository.updateById(id, data);
    }

    /**
     * Delete item by ID
     * @param {String} id - Item ID
     * @returns {Promise<Object>} Deleted item
     */
    async deleteById(id) {
        return await this.repository.deleteById(id);
    }

    /**
     * Count items
     * @param {Object} query - Query filters
     * @returns {Promise<Number>} Count
     */
    async count(query = {}) {
        return await this.repository.count(query);
    }
}

module.exports = BaseService;
