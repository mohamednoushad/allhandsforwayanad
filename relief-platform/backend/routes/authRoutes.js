const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');

router.post('/register', authenticateAdmin, authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/profile', authenticateUser, authController.getProfile);

module.exports = router;
