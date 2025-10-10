const express = require('express');
const router = express.Router();
const { getOrderTracking } = require('../controllers/trackingController');

// Public route for order tracking
router.route('/:id').get(getOrderTracking);

module.exports = router;