const Order = require('../models/orderModel');

// @desc    Get assigned orders for delivery partner
// @route   GET /api/delivery/orders
// @access  Private/Delivery
const getAssignedOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      'deliveryInfo.partner': req.user._id
    }).populate('user', 'name email phone address');
    
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update order delivery status
// @route   PUT /api/delivery/orders/:id/update
// @access  Private/Delivery
const updateDeliveryStatus = async (req, res) => {
  try {
    const { status, location, comment } = req.body;
    
    const order = await Order.findOne({
      _id: req.params.id,
      'deliveryInfo.partner': req.user._id
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found or not assigned to you' });
    }
    
    // Update order status
    order.status = status || order.status;
    
    // Initialize deliveryInfo if it doesn't exist
    if (!order.deliveryInfo) {
      order.deliveryInfo = { trackingUpdates: [] };
    }
    
    // Initialize trackingUpdates if it doesn't exist
    if (!order.deliveryInfo.trackingUpdates) {
      order.deliveryInfo.trackingUpdates = [];
    }
    
    // Add tracking update
    order.deliveryInfo.trackingUpdates.push({
      status,
      location,
      comment,
      timestamp: Date.now()
    });
    
    // Update current location
    order.deliveryInfo.currentLocation = location;
    
    // If status is Delivered, update deliveredAt
    if (status === 'Delivered') {
      order.deliveredAt = Date.now();
    }
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get delivery partner profile
// @route   GET /api/delivery/profile
// @access  Private/Delivery
const getDeliveryProfile = async (req, res) => {
  try {
    // Count total orders delivered
    const deliveredOrders = await Order.countDocuments({
      'deliveryInfo.partner': req.user._id,
      status: 'Delivered'
    });
    
    // Count orders in progress
    const ordersInProgress = await Order.countDocuments({
      'deliveryInfo.partner': req.user._id,
      status: { $in: ['Shipped', 'Out for Delivery'] }
    });
    
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      stats: {
        deliveredOrders,
        ordersInProgress
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAssignedOrders,
  updateDeliveryStatus,
  getDeliveryProfile
};