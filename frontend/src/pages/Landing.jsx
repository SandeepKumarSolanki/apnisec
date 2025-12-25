import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Landing() {
    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar transparent />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    <div className="animate-fade-in">
                        <span className="inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-500 text-sm font-medium mb-6">
                            🛡️ Enterprise-Grade Cybersecurity
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-fade-in animate-delay-100">
                        <span className="text-white">Secure Your</span>
                        <br />
                        <span className="gradient-text">Digital Future</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 animate-fade-in animate-delay-200">
                        ApniSec provides comprehensive cybersecurity solutions including Cloud Security,
                        VAPT, and Red Team Assessments to protect your organization from evolving threats.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
                        <Link to="/register" className="btn-primary text-lg px-8 py-4">
                            Get Started Free
                        </Link>
                        <a href="#services" className="btn-secondary text-lg px-8 py-4">
                            Explore Services
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in animate-delay-400">
                        {[
                            { value: '500+', label: 'Clients Protected' },
                            { value: '99.9%', label: 'Uptime SLA' },
                            { value: '24/7', label: 'Support' },
                            { value: '1000+', label: 'Threats Blocked' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                                <div className="text-gray-500 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-500 font-medium">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                            Industry-Leading Security Features
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Our comprehensive security platform provides everything you need to protect your digital assets
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                ),
                                title: 'Advanced Threat Detection',
                                description: 'AI-powered threat detection that identifies and neutralizes attacks before they cause damage.'
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                title: 'Penetration Testing',
                                description: 'Comprehensive vulnerability assessments and penetration testing by certified security experts.'
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                ),
                                title: 'Cloud Security',
                                description: 'Secure your cloud infrastructure with our comprehensive cloud security solutions and monitoring.'
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                title: 'Real-time Monitoring',
                                description: '24/7 security monitoring and instant alerts to keep you informed of any potential threats.'
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                ),
                                title: 'Compliance Ready',
                                description: 'Meet industry compliance standards including ISO 27001, SOC 2, GDPR, and HIPAA.'
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ),
                                title: 'Expert Support',
                                description: 'Dedicated security experts available around the clock to assist with any security concerns.'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="card card-hover">
                                <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-500 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 md:py-32 bg-dark-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary-500 font-medium">Our Services</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                            Comprehensive Security Solutions
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            From assessment to implementation, we provide end-to-end security services
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Cloud Security',
                                description: 'Protect your cloud infrastructure with comprehensive security assessments, configuration reviews, and continuous monitoring.',
                                features: ['AWS/Azure/GCP Security', 'Configuration Audits', 'Identity Management', 'Data Protection'],
                                color: 'from-blue-500 to-cyan-500'
                            },
                            {
                                title: 'VAPT',
                                description: 'Vulnerability Assessment and Penetration Testing to identify and remediate security weaknesses in your systems.',
                                features: ['Web App Testing', 'Network Security', 'Mobile App Testing', 'API Security'],
                                color: 'from-primary-500 to-primary-600',
                                featured: true
                            },
                            {
                                title: 'Red Team Assessment',
                                description: 'Simulate real-world attacks to test your organization\'s detection and response capabilities.',
                                features: ['Social Engineering', 'Physical Security', 'Advanced Persistent Threats', 'Incident Response'],
                                color: 'from-red-500 to-orange-500'
                            }
                        ].map((service, index) => (
                            <div
                                key={index}
                                className={`card relative overflow-hidden ${service.featured ? 'border-primary-500 scale-105' : ''}`}
                            >
                                {service.featured && (
                                    <div className="absolute top-0 right-0 bg-primary-500 text-dark-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        POPULAR
                                    </div>
                                )}
                                <div className={`w-full h-2 bg-gradient-to-r ${service.color} rounded-full mb-6`}></div>
                                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-400 mb-6">{service.description}</p>
                                <ul className="space-y-3 mb-8">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/register" className={service.featured ? 'btn-primary w-full text-center' : 'btn-secondary w-full text-center'}>
                                    Get Started
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="card p-10 md:p-16 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Secure Your Business?
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                                Join hundreds of organizations that trust ApniSec to protect their digital assets.
                                Start your security journey today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/register" className="btn-primary text-lg px-8 py-4">
                                    Start Free Trial
                                </Link>
                                <a href="mailto:contact@apnisec.com" className="btn-secondary text-lg px-8 py-4">
                                    Contact Sales
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Landing
