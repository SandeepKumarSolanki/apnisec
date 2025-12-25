import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import issueService from '../services/issueService'
import Navbar from '../components/Navbar'
import IssueCard from '../components/IssueCard'
import IssueForm from '../components/IssueForm'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const issueTypes = [
    { value: '', label: 'All Types' },
    { value: 'cloud-security', label: 'Cloud Security' },
    { value: 'reteam-assessment', label: 'Reteam Assessment' },
    { value: 'vapt', label: 'VAPT' }
]

function Dashboard() {
    const { user } = useAuth()
    const [issues, setIssues] = useState([])
    const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0, closed: 0 })
    const [loading, setLoading] = useState(true)
    const [filterType, setFilterType] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [editingIssue, setEditingIssue] = useState(null)
    const [formLoading, setFormLoading] = useState(false)

    useEffect(() => {
        fetchIssues()
    }, [filterType])

    const fetchIssues = async () => {
        try {
            const filters = filterType ? { type: filterType } : {}
            const data = await issueService.getAll(filters)
            setIssues(data.issues || [])
            setStats(data.stats || { total: 0, open: 0, inProgress: 0, resolved: 0, closed: 0 })
        } catch (error) {
            toast.error('Failed to load issues')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateIssue = async (issueData) => {
        setFormLoading(true)
        try {
            await issueService.create(issueData)
            toast.success('Issue created successfully!')
            setShowForm(false)
            fetchIssues()
        } catch (error) {
            toast.error(error.message || 'Failed to create issue')
        } finally {
            setFormLoading(false)
        }
    }

    const handleUpdateIssue = async (issueData) => {
        setFormLoading(true)
        try {
            await issueService.update(editingIssue.id, issueData)
            toast.success('Issue updated successfully!')
            setEditingIssue(null)
            fetchIssues()
        } catch (error) {
            toast.error(error.message || 'Failed to update issue')
        } finally {
            setFormLoading(false)
        }
    }

    const handleDeleteIssue = async (issue) => {
        if (!confirm('Are you sure you want to delete this issue?')) return

        try {
            await issueService.delete(issue.id)
            toast.success('Issue deleted successfully!')
            fetchIssues()
        } catch (error) {
            toast.error(error.message || 'Failed to delete issue')
        }
    }

    const handleEdit = (issue) => {
        setEditingIssue(issue)
        setShowForm(false)
    }

    const closeModal = () => {
        setShowForm(false)
        setEditingIssue(null)
    }

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>!
                        </h1>
                        <p className="text-gray-400">Manage your security issues and track their progress.</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {[
                            { label: 'Total', value: stats.total, color: 'text-white' },
                            { label: 'Open', value: stats.open, color: 'text-blue-400' },
                            { label: 'In Progress', value: stats.inProgress, color: 'text-purple-400' },
                            { label: 'Resolved', value: stats.resolved, color: 'text-green-400' },
                            { label: 'Closed', value: stats.closed, color: 'text-gray-400' }
                        ].map((stat, index) => (
                            <div key={index} className="card text-center">
                                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Actions & Filters */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400">Filter:</span>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="input-field w-auto"
                            >
                                {issueTypes.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={() => { setShowForm(true); setEditingIssue(null); }}
                            className="btn-primary flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Issue
                        </button>
                    </div>

                    {/* Issues List */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <LoadingSpinner size="lg" />
                        </div>
                    ) : issues.length === 0 ? (
                        <div className="card text-center py-16">
                            <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No issues yet</h3>
                            <p className="text-gray-400 mb-6">Create your first security issue to get started</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="btn-primary"
                            >
                                Create Your First Issue
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {issues.map(issue => (
                                <IssueCard
                                    key={issue.id}
                                    issue={issue}
                                    onEdit={handleEdit}
                                    onDelete={handleDeleteIssue}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Create/Edit Modal */}
            {(showForm || editingIssue) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="relative bg-dark-600 border border-dark-border rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">
                                {editingIssue ? 'Edit Issue' : 'Create New Issue'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <IssueForm
                            issue={editingIssue}
                            onSubmit={editingIssue ? handleUpdateIssue : handleCreateIssue}
                            onCancel={closeModal}
                            loading={formLoading}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
