import api from './api'

export const userService = {
    // Get user profile
    async getProfile() {
        const response = await api.get('/users/profile')
        return response.data.data.profile
    },

    // Update user profile
    async updateProfile(profileData) {
        const response = await api.put('/users/profile', profileData)
        return response.data.data.profile
    }
}

export default userService
