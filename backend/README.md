# E-commerce Backend API

## Environment Variables Required

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/ecommerce

# JWT Secret (Change this in production!)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Stripe Configuration (Get from https://stripe.com)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Server Configuration
PORT=3002
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:5000,http://127.0.0.1:5000
```

## Production Environment Variables

For production deployment, you'll need to set these environment variables in your hosting platform:

- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Strong random secret key
- `STRIPE_SECRET_KEY`: Live Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Live Stripe publishable key
- `PORT`: Port number (usually provided by hosting platform)
- `NODE_ENV`: Set to "production"
- `CORS_ORIGIN`: Your frontend domain(s)

## API Endpoints

### Authentication
- `POST /api/users` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `PUT /api/orders/:id/pay` - Update payment status (protected)

### Payment
- `POST /api/payment/create-payment-intent` - Create payment intent (protected)
- `POST /api/payment/confirm-payment` - Confirm payment (protected)

### Admin
- `GET /api/admin/orders` - Get all orders (admin)
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/dashboard` - Get dashboard stats (admin)

### Delivery
- `GET /api/delivery/orders` - Get assigned orders (delivery)
- `PUT /api/delivery/orders/:id/update` - Update delivery status (delivery)

### Tracking
- `GET /api/tracking/:orderId` - Get order tracking info
