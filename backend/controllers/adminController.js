const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a delivery partner account
// @route   POST /api/admin/delivery-partners
// @access  Private/Admin
const createDeliveryPartner = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'delivery'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // Get total orders
    const totalOrders = await Order.countDocuments();
    
    // Get total revenue
    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    
    // Get pending orders
    const pendingOrders = await Order.countDocuments({ 
      status: { $in: ['Processing', 'Shipped', 'Out for Delivery'] } 
    });
    
    // Get total users
    const totalUsers = await User.countDocuments({ role: 'customer' });
    
    // Get total products
    const totalProducts = await Product.countDocuments();
    
    // Get recent orders
    const recentOrders = await Order.find({})
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({
      totalOrders,
      totalRevenue,
      pendingOrders,
      totalUsers,
      totalProducts,
      recentOrders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Assign order to delivery partner
// @route   PUT /api/admin/orders/:id/assign
// @access  Private/Admin
const assignOrderToDeliveryPartner = async (req, res) => {
  try {
    const { deliveryPartnerId } = req.body;
    
    const order = await Order.findById(req.params.id);
    const deliveryPartner = await User.findById(deliveryPartnerId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (!deliveryPartner || deliveryPartner.role !== 'delivery') {
      return res.status(404).json({ message: 'Delivery partner not found' });
    }
    
    if (!order.deliveryInfo) {
      order.deliveryInfo = {};
    }
    
    order.deliveryInfo.partner = deliveryPartnerId;
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllOrders,
  getAllUsers,
  createDeliveryPartner,
  getDashboardStats,
  assignOrderToDeliveryPartner
};