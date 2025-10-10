// API configuration
const API_URL = 'http://localhost:3002/api';

// User API functions
const userAPI = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
};

// Order API functions
const orderAPI = {
  // Create a new order
  createOrder: async (orderData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      return await response.json();
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  },

  // Get user orders
  getUserOrders: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/orders/myorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get user orders error:', error);
      throw error;
    }
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get order details error:', error);
      throw error;
    }
  },

  // Create payment intent (for Stripe)
  createPaymentIntent: async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/orders/${orderId}/payment-intent`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Create payment intent error:', error);
      throw error;
    }
  },

  // Update payment status
  updatePaymentStatus: async (orderId, paymentResult) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/orders/${orderId}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentResult),
      });
      return await response.json();
    } catch (error) {
      console.error('Update payment status error:', error);
      throw error;
    }
  },
};

// Tracking API functions
const trackingAPI = {
  // Get order tracking information
  getOrderTracking: async (orderId, email) => {
    try {
      const response = await fetch(`${API_URL}/tracking/${orderId}?email=${encodeURIComponent(email)}`);
      return await response.json();
    } catch (error) {
      console.error('Get order tracking error:', error);
      throw error;
    }
  },
};

// Admin API functions
const adminAPI = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get all orders error:', error);
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  },

  // Create delivery partner
  createDeliveryPartner: async (partnerData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/delivery-partners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(partnerData),
      });
      return await response.json();
    } catch (error) {
      console.error('Create delivery partner error:', error);
      throw error;
    }
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      throw error;
    }
  },

  // Assign order to delivery partner
  assignOrderToDeliveryPartner: async (orderId, partnerId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/orders/${orderId}/assign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ partnerId }),
      });
      return await response.json();
    } catch (error) {
      console.error('Assign order error:', error);
      throw error;
    }
  },
};

// Delivery partner API functions
const deliveryAPI = {
  // Get assigned orders
  getAssignedOrders: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/delivery/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get assigned orders error:', error);
      throw error;
    }
  },

  // Update delivery status
  updateDeliveryStatus: async (orderId, updateData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/delivery/orders/${orderId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      return await response.json();
    } catch (error) {
      console.error('Update delivery status error:', error);
      throw error;
    }
  },

  // Get delivery profile
  getDeliveryProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/delivery/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get delivery profile error:', error);
      throw error;
    }
  },
};

// Export all API functions
window.API = {
  user: userAPI,
  order: orderAPI,
  tracking: trackingAPI,
  admin: adminAPI,
  delivery: deliveryAPI,
};