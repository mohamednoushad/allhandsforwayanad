const express = require('express');
const router = express.Router();
const collectionPointController = require('../controllers/collectionPointController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.post('/collection_points', authenticateAdmin, collectionPointController.createCollectionPoint);
router.get('/collection_points', collectionPointController.getCollectionPoints);

module.exports = router;
