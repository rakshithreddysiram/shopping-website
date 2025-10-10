const express = require('express');
const router = express.Router();
const { 
  getAllOrders, 
  getAllUsers, 
  createDeliveryPartner, 
  getDashboardStats,
  assignOrderToDeliveryPartner
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes are protected and require admin access
router.use(protect, admin);

router.route('/orders').get(getAllOrders);
router.route('/users').get(getAllUsers);
router.route('/delivery-partners').post(createDeliveryPartner);
router.route('/dashboard').get(getDashboardStats);
router.route('/orders/:id/assign').put(assignOrderToDeliveryPartner);

module.exports = router;