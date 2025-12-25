import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

function Navbar({ transparent = false }) {
    const { isAuthenticated, user, logout } = useAuth()
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent ? 'bg-transparent' : 'glass'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-dark-900" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold gradient-text">ApniSec</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                        <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                        <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
                        <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="btn-ghost">Dashboard</Link>
                                <Link to="/profile" className="btn-ghost">{user?.name?.split(' ')[0]}</Link>
                                <button onClick={handleLogout} className="btn-secondary">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-ghost">Login</Link>
                                <Link to="/register" className="btn-primary">Get Started</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-300 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-dark-border">
                        <div className="flex flex-col gap-4">
                            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                            <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
                            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
                            <div className="border-t border-dark-border pt-4 flex flex-col gap-3">
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/dashboard" className="btn-ghost text-center">Dashboard</Link>
                                        <button onClick={handleLogout} className="btn-secondary">Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="btn-ghost text-center">Login</Link>
                                        <Link to="/register" className="btn-primary text-center">Get Started</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
