const fetch = require('node-fetch');

const API_URL = 'http://localhost:3002/api';

// Test user registration
async function testUserRegistration() {
  console.log('Testing user registration...');
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '+91 98765 43210',
        address: {
          street: '123 Test Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400001',
          country: 'India'
        }
      }),
    });
    
    const data = await response.json();
    console.log('Registration response:', data);
    return data.token;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}

// Test user login
async function testUserLogin() {
  console.log('Testing user login...');
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      }),
    });
    
    const data = await response.json();
    console.log('Login response:', data);
    return data.token;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

// Test getting products
async function testGetProducts() {
  console.log('Testing get products...');
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    console.log('Products response:', data);
    return data;
  } catch (error) {
    console.error('Get products error:', error);
    return null;
  }
}

// Test creating an order
async function testCreateOrder(token) {
  console.log('Testing create order...');
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        orderItems: [
          {
            product: '507f1f77bcf86cd799439011', // This would be a real product ID
            name: 'Test Product',
            image: 'test.jpg',
            price: 1000,
            quantity: 1
          }
        ],
        shippingAddress: {
          address: '123 Test Street',
          city: 'Mumbai',
          postalCode: '400001',
          country: 'India'
        },
        paymentMethod: 'COD',
        itemsPrice: 1000,
        taxPrice: 180,
        shippingPrice: 0,
        totalPrice: 1180
      }),
    });
    
    const data = await response.json();
    console.log('Create order response:', data);
    return data;
  } catch (error) {
    console.error('Create order error:', error);
    return null;
  }
}

// Run all tests
async function runTests() {
  console.log('Starting API tests...\n');
  
  // Test 1: Get products (no auth required)
  await testGetProducts();
  console.log('\n');
  
  // Test 2: Register user
  const token = await testUserRegistration();
  if (!token) {
    console.log('Registration failed, trying login...');
    const loginToken = await testUserLogin();
    if (loginToken) {
      console.log('Using existing user token');
      await testCreateOrder(loginToken);
    }
  } else {
    console.log('\n');
    // Test 3: Create order
    await testCreateOrder(token);
  }
  
  console.log('\nAPI tests completed!');
}

// Run tests
runTests();
