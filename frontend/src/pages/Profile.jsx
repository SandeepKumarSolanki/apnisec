import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import userService from '../services/userService'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'

function Profile() {
    const { user, updateUser } = useAuth()
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        company: user?.company || ''
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validate = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = 'Name is required'
        if (formData.name && formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setLoading(true)
        try {
            const updatedProfile = await userService.updateProfile(formData)
            updateUser(updatedProfile)
            toast.success('Profile updated successfully!')
        } catch (error) {
            toast.error(error.message || 'Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const formatDate = (date) => {
        if (!date) return 'Never'
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                        <p className="text-gray-400">Manage your account information</p>
                    </div>

                    {/* Profile Card */}
                    <div className="card mb-8">
                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-dark-border">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-3xl font-bold text-dark-900">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                                <p className="text-gray-400">{user?.email}</p>
                                <span className="inline-block mt-2 px-3 py-1 bg-primary-500/10 text-primary-500 text-sm rounded-full capitalize">
                                    {user?.role}
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        disabled
                                        className="input-field opacity-50 cursor-not-allowed"
                                    />
                                    <p className="text-gray-500 text-xs mt-1">Email cannot be changed</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 000-0000"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Your company name"
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary flex items-center gap-2"
                                >
                                    {loading && (
                                        <div className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></div>
                                    )}
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Account Info */}
                    <div className="card">
                        <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-dark-border">
                                <span className="text-gray-400">Account Status</span>
                                <span className={`px-3 py-1 rounded-full text-sm ${user?.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {user?.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-dark-border">
                                <span className="text-gray-400">Member Since</span>
                                <span className="text-white">{formatDate(user?.createdAt)}</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-gray-400">Last Login</span>
                                <span className="text-white">{formatDate(user?.lastLogin)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile
