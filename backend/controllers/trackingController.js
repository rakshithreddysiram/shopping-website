const Order = require('../models/orderModel');

// @desc    Get order tracking information
// @route   GET /api/tracking/:id
// @access  Public (with order ID and email verification)
const getOrderTracking = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    
    if (!id || !email) {
      return res.status(400).json({ message: 'Order ID and email are required' });
    }
    
    const order = await Order.findById(id)
      .populate('user', 'email')
      .select('orderItems shippingAddress status deliveryInfo createdAt updatedAt deliveredAt');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Verify that the email matches the order's user email
    if (order.user.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(401).json({ message: 'Email does not match order' });
    }
    
    // Format tracking information for the frontend
    const trackingInfo = {
      orderId: order._id,
      orderItems: order.orderItems,
      shippingAddress: order.shippingAddress,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deliveredAt: order.deliveredAt,
      trackingUpdates: order.deliveryInfo?.trackingUpdates || [],
      currentLocation: order.deliveryInfo?.currentLocation || null
    };
    
    res.json(trackingInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getOrderTracking
};