import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle 401 Unauthorized
            if (error.response.status === 401) {
                const isAuthRoute = error.config.url?.includes('/auth/')
                if (!isAuthRoute) {
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                }
            }

            // Extract error message
            const message = error.response.data?.message || 'An error occurred'
            error.message = message
        }
        return Promise.reject(error)
    }
)

export default api
