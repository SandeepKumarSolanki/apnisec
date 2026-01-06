const BaseService = require('./BaseService');
const UserRepository = require('../repositories/UserRepository');
const { JwtUtil } = require('../utils');
const { AuthenticationError, ValidationError } = require('../errors');
const EmailService = require('./EmailService');

/**
 * Auth Service Class
 * Handles authentication business logic
 */
class AuthService extends BaseService {
    constructor() {
        const repository = new UserRepository();
        super(repository);
        this.userRepository = repository;
        this.jwtUtil = new JwtUtil();
        this.emailService = new EmailService();
    }

    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} User and token
     */
    async register(userData) {
        const { name, email, password } = userData;

        // Check if email already exists
        const existingUser = await this.userRepository.emailExists(email);
        if (existingUser) {
            throw new ValidationError('Email already registered', [
                { field: 'email', message: 'This email is already registered' }
            ]);
        }

        // Create user
        const user = await this.userRepository.create({
            name,
            email,
            password
        });

        // Generate token
        const token = this.jwtUtil.generateAccessToken(user);

        // Send welcome email (don't await to avoid blocking)
        // Send welcome email (don't await to avoid blocking)
        this.emailService.sendWelcome(user).then(result => {
            if (!result.success) {
                console.error('Failed to send welcome email:', result.error);
            }
        }).catch(err => {
            console.error('Unexpected error sending welcome email:', err.message);
        });

        return {
            user: user.toPublicJSON(),
            token
        };
    }

    /**
     * Login user
     * @param {Object} credentials - Login credentials
     * @returns {Promise<Object>} User and token
     */
    async login(credentials) {
        const { email, password } = credentials;

        // Find user with password
        const user = await this.userRepository.findByEmail(email, true);
        if (!user) {
            throw new AuthenticationError('Invalid email or password');
        }

        // Check if user is active
        if (!user.isActive) {
            throw new AuthenticationError('Your account has been deactivated');
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new AuthenticationError('Invalid email or password');
        }

        // Update last login
        await this.userRepository.updateLastLogin(user._id);

        // Generate token
        const token = this.jwtUtil.generateAccessToken(user);

        return {
            user: user.toPublicJSON(),
            token
        };
    }

    /**
     * Get current user
     * @param {String} userId - User ID
     * @returns {Promise<Object>} User
     */
    async getCurrentUser(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AuthenticationError('User not found');
        }

        return user.toPublicJSON();
    }

    /**
     * Verify token and get user
     * @param {String} token - JWT token
     * @returns {Promise<Object>} Decoded token payload
     */
    verifyToken(token) {
        return this.jwtUtil.verifyToken(token);
    }
}

module.exports = AuthService;
