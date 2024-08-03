const express = require('express');
const router = express.Router();
const needsController = require('../controllers/needsController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/needs', authenticateUser, needsController.createNeed);
router.get('/needs/camp', authenticateUser, needsController.getNeedsForCamp);
router.get('/needs/unfulfilled', authenticateUser, needsController.getUnfulfilledNeeds);
router.post('/needs/respond/:needId', authenticateUser, needsController.respondToNeed);
router.post('/needs/forward/:needId', authenticateUser, needsController.forwardNeedToPublic);
router.get('/needs/responded', authenticateUser, needsController.getRespondedNeeds);

module.exports = router;
