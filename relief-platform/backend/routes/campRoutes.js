const express = require('express');
const router = express.Router();
const campController = require('../controllers/campController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.post('/camps', authenticateAdmin, campController.createCamp);
router.get('/camps', campController.getCamps);

module.exports = router;
