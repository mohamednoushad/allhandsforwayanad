const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/inventory', authenticateUser, inventoryController.addInventory);
router.get('/inventory', authenticateUser, inventoryController.getInventory);
router.put('/inventory/:id', authenticateUser, inventoryController.updateInventory);
router.delete('/inventory/:id', authenticateUser, inventoryController.deleteInventory);

module.exports = router;
