import { useState, useEffect } from 'react'

const issueTypes = [
    { value: 'cloud-security', label: 'Cloud Security' },
    { value: 'reteam-assessment', label: 'Reteam Assessment' },
    { value: 'vapt', label: 'VAPT' }
]

const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500' }
]

const statuses = [
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
]

function IssueForm({ issue, onSubmit, onCancel, loading }) {
    const [formData, setFormData] = useState({
        type: 'cloud-security',
        title: '',
        description: '',
        priority: 'medium',
        status: 'open'
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (issue) {
            setFormData({
                type: issue.type || 'cloud-security',
                title: issue.title || '',
                description: issue.description || '',
                priority: issue.priority || 'medium',
                status: issue.status || 'open'
            })
        }
    }, [issue])

    const validate = () => {
        const newErrors = {}
        if (!formData.title.trim()) newErrors.title = 'Title is required'
        if (formData.title.length < 3) newErrors.title = 'Title must be at least 3 characters'
        if (!formData.description.trim()) newErrors.description = 'Description is required'
        if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            onSubmit(formData)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Issue Type</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="input-field"
                >
                    {issueTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                </select>
            </div>

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter issue title"
                    className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue in detail..."
                    rows={4}
                    className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Priority */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                <div className="flex gap-3">
                    {priorities.map(priority => (
                        <button
                            key={priority.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                            className={`px-4 py-2 rounded-lg border transition-all ${formData.priority === priority.value
                                    ? `${priority.color} text-white border-transparent`
                                    : 'border-dark-border text-gray-400 hover:border-gray-500'
                                }`}
                        >
                            {priority.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Status (only for edit) */}
            {issue && (
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="input-field"
                    >
                        {statuses.map(status => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                    {loading && (
                        <div className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {issue ? 'Update Issue' : 'Create Issue'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn-secondary"
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default IssueForm
