import api from './api'

export const issueService = {
    // Get all issues with optional filters
    async getAll(filters = {}) {
        const params = new URLSearchParams()
        if (filters.type) params.append('type', filters.type)
        if (filters.status) params.append('status', filters.status)

        const response = await api.get(`/issues?${params.toString()}`)
        return response.data.data
    },

    // Get single issue by ID
    async getById(id) {
        const response = await api.get(`/issues/${id}`)
        return response.data.data.issue
    },

    // Create new issue
    async create(issueData) {
        const response = await api.post('/issues', issueData)
        return response.data.data.issue
    },

    // Update issue
    async update(id, issueData) {
        const response = await api.put(`/issues/${id}`, issueData)
        return response.data.data.issue
    },

    // Delete issue
    async delete(id) {
        await api.delete(`/issues/${id}`)
    }
}

export default issueService
