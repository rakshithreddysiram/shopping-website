#!/bin/bash

# E-commerce Deployment Script
echo "🚀 Starting E-commerce Application Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "backend/package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Preparing backend for deployment..."

# Install backend dependencies
cd backend
if [ ! -d "node_modules" ]; then
    print_status "Installing backend dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating template..."
    cat > .env << EOF
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
EOF
    print_warning "Please update the .env file with your actual values before deploying!"
fi

cd ..

print_status "Backend preparation complete!"

echo ""
echo "📋 Next Steps:"
echo "1. Set up MongoDB Atlas database"
echo "2. Get Stripe API keys"
echo "3. Choose deployment platform:"
echo "   - Railway (recommended): https://railway.app"
echo "   - Heroku: https://heroku.com"
echo "4. Deploy frontend to:"
echo "   - Netlify (recommended): https://netlify.com"
echo "   - Vercel: https://vercel.com"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
print_status "Deployment preparation complete! 🎉"
