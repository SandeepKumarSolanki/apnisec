const express = require('express');
const AuthHandler = require('../handlers/AuthHandler');
const { authMiddleware } = require('../middlewares');

const router = express.Router();
const authHandler = new AuthHandler();

// Public routes
router.post('/register', authHandler.register);
router.post('/login', authHandler.login);
router.post('/forgot-password', authHandler.forgotPassword);
router.post('/reset-password', authHandler.resetPassword);

// Protected routes
router.post('/logout', authMiddleware, authHandler.logout);
router.get('/me', authMiddleware, authHandler.me);

module.exports = router;
