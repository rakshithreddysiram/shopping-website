const express = require('express');
const router = express.Router();
const { 
  getAssignedOrders, 
  updateDeliveryStatus, 
  getDeliveryProfile 
} = require('../controllers/deliveryController');
const { protect, deliveryPartner } = require('../middleware/authMiddleware');

// All routes are protected and require delivery partner access
router.use(protect, deliveryPartner);

router.route('/orders').get(getAssignedOrders);
router.route('/orders/:id/update').put(updateDeliveryStatus);
router.route('/profile').get(getDeliveryProfile);

module.exports = router;