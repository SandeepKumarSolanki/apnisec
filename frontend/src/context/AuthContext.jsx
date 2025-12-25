import { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const response = await api.get('/auth/me')
                    setUser(response.data.data.user)
                } catch (error) {
                    console.error('Auth init error:', error)
                    localStorage.removeItem('token')
                    setToken(null)
                    setUser(null)
                }
            }
            setLoading(false)
        }

        initAuth()
    }, [token])

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password })
        const { token: newToken, user: userData } = response.data.data

        localStorage.setItem('token', newToken)
        setToken(newToken)
        setUser(userData)

        return userData
    }

    const register = async (name, email, password) => {
        const response = await api.post('/auth/register', { name, email, password })
        const { token: newToken, user: userData } = response.data.data

        localStorage.setItem('token', newToken)
        setToken(newToken)
        setUser(userData)

        return userData
    }

    const logout = async () => {
        try {
            await api.post('/auth/logout')
        } catch (error) {
            console.error('Logout error:', error)
        }

        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    const updateUser = (userData) => {
        setUser(userData)
    }

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
