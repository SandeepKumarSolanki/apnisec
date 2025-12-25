const express = require('express');
const UserHandler = require('../handlers/UserHandler');
const { authMiddleware } = require('../middlewares');

const router = express.Router();
const userHandler = new UserHandler();

// All routes are protected
router.use(authMiddleware);

router.get('/profile', userHandler.getProfile);
router.put('/profile', userHandler.updateProfile);

module.exports = router;
