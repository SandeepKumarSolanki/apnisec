const BaseService = require('./BaseService');
const UserRepository = require('../repositories/UserRepository');
const { JwtUtil } = require('../utils');
const { AuthenticationError, ValidationError, NotFoundError } = require('../errors');
const EmailService = require('./EmailService');
const crypto = require('crypto');

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

    /**
     * Forgot password - Generate reset token and send email
     * @param {String} email - User email
     * @returns {Promise<Object>} Success message
     */
    async forgotPassword(email) {
        const user = await this.userRepository.findByEmail(email);

        // Always return success to prevent email enumeration
        if (!user) {
            return { message: 'If your email is registered, you will receive a password reset link.' };
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Save token to user
        await this.userRepository.updateById(user._id, {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: new Date(Date.now() + 3600000) // 1 hour
        });

        // Send password reset email
        this.emailService.sendPasswordReset(user, resetToken).then(result => {
            if (!result.success) {
                console.error('Failed to send password reset email:', result.error);
            }
        }).catch(err => {
            console.error('Unexpected error sending password reset email:', err.message);
        });

        return { message: 'If your email is registered, you will receive a password reset link.' };
    }

    /**
     * Reset password using token
     * @param {String} token - Reset token
     * @param {String} newPassword - New password
     * @returns {Promise<Object>} Success message
     */
    async resetPassword(token, newPassword) {
        // Hash the provided token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find user with valid token
        const user = await this.userRepository.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() }
        });

        if (!user) {
            throw new ValidationError('Invalid or expired reset token', [
                { field: 'token', message: 'Reset token is invalid or has expired' }
            ]);
        }

        // Update password and clear reset token
        user.password = newPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        return { message: 'Password has been reset successfully' };
    }
}

module.exports = AuthService;
