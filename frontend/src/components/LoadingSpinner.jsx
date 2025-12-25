function LoadingSpinner({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-16 h-16 border-4'
    }

    return (
        <div className={`${sizes[size]} border-primary-500 border-t-transparent rounded-full animate-spin ${className}`}></div>
    )
}

export default LoadingSpinner
