const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  updateOrderToPaid, 
  createPaymentIntent,
  getMyOrders, 
  updateOrderStatus 
} = require('../controllers/orderController');
const { protect, admin, deliveryPartner } = require('../middleware/authMiddleware');

// Protected routes
router.route('/')
  .post(protect, createOrder);
router.route('/myorders')
  .get(protect, getMyOrders);
router.route('/:id')
  .get(protect, getOrderById);
router.route('/:id/pay')
  .put(protect, updateOrderToPaid);
router.route('/:id/create-payment-intent')
  .post(protect, createPaymentIntent);
router.route('/:id/status')
  .put(protect, updateOrderStatus);

module.exports = router;