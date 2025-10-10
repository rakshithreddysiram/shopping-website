const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Initialize Stripe only if secret key is provided
let stripe = null;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_your_stripe_secret_key_here') {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

// Create payment intent
router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    
    if (!stripe) {
      // Mock payment intent for development
      const mockPaymentIntent = {
        id: 'pi_mock_' + Math.random().toString(36).substring(2, 15),
        client_secret: 'pi_mock_' + Math.random().toString(36).substring(2, 15) + '_secret_' + Math.random().toString(36).substring(2, 15),
        amount: Math.round(amount * 100),
        currency: currency,
        status: 'requires_payment_method'
      };
      
      return res.json({
        success: true,
        clientSecret: mockPaymentIntent.client_secret
      });
    }
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe requires amount in cents
      currency: currency,
      metadata: {
        userId: req.user._id.toString()
      }
    });
    
    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Payment processing error' 
    });
  }
});

// Confirm payment
router.post('/confirm-payment', protect, async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    if (!paymentIntentId) {
      return res.status(400).json({ message: 'Payment intent ID is required' });
    }
    
    if (!stripe) {
      // Mock payment confirmation for development
      return res.json({
        success: true,
        paymentIntent: {
          id: paymentIntentId,
          status: 'succeeded',
          amount: 10000, // Mock amount
          currency: 'inr'
        }
      });
    }
    
    // Retrieve the payment intent to check its status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    res.json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency
      }
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Payment confirmation error' 
    });
  }
});

module.exports = router;