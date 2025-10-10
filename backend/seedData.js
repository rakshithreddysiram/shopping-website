const mongoose = require('mongoose');
const Product = require('./models/productModel');
const User = require('./models/userModel');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample products data
const sampleProducts = [
  {
    name: "Kanchipuram Silk Saree",
    description: "Exquisite Kanchipuram silk saree with intricate zari work and traditional motifs. Perfect for weddings and special occasions.",
    price: 12999,
    originalPrice: 15999,
    category: "Silk",
    imageUrl: "images/saree1.jpg",
    stock: 10,
    rating: 4.5,
    numReviews: 24,
    featured: true
  },
  {
    name: "Banarasi Silk Saree",
    description: "Handcrafted Banarasi silk saree with rich gold zari work and timeless design. Ideal for festive occasions and celebrations.",
    price: 9499,
    originalPrice: 11999,
    category: "Silk",
    imageUrl: "images/saree2.jpg",
    stock: 15,
    rating: 5,
    numReviews: 42,
    featured: true
  },
  {
    name: "Handloom Cotton Saree",
    description: "Lightweight handloom cotton saree with contemporary prints and comfortable feel. Perfect for daily wear and casual occasions.",
    price: 3999,
    originalPrice: 5499,
    category: "Cotton",
    imageUrl: "images/saree3.jpg",
    stock: 25,
    rating: 4,
    numReviews: 18,
    featured: false
  },
  {
    name: "Designer Georgette Saree",
    description: "Modern designer georgette saree with elegant embroidery and contemporary styling. Perfect for parties and social gatherings.",
    price: 7999,
    originalPrice: 9999,
    category: "Designer",
    imageUrl: "images/saree4.jpg",
    stock: 8,
    rating: 5,
    numReviews: 36,
    featured: true
  },
  {
    name: "Cotton Dress",
    description: "Comfortable and stylish cotton dress perfect for casual wear and everyday occasions.",
    price: 2999,
    originalPrice: 3999,
    category: "Cotton Dress",
    imageUrl: "images/cotton-dress.jpg",
    stock: 20,
    rating: 4.2,
    numReviews: 15,
    featured: false
  },
  {
    name: "Party Wear",
    description: "Elegant party wear outfit perfect for special occasions and celebrations.",
    price: 5999,
    originalPrice: 7999,
    category: "Party Wear",
    imageUrl: "images/party-wear.jpg",
    stock: 12,
    rating: 4.8,
    numReviews: 28,
    featured: true
  },
  {
    name: "Maxi Dress",
    description: "Beautiful maxi dress with flowing fabric and elegant design. Perfect for summer occasions.",
    price: 3499,
    originalPrice: 4499,
    category: "Maxi Dress",
    imageUrl: "images/maxi-dress.jpg",
    stock: 18,
    rating: 4.3,
    numReviews: 22,
    featured: false
  },
  {
    name: "Kurthi Set",
    description: "Traditional kurthi set with matching bottom and dupatta. Perfect for festive occasions.",
    price: 2499,
    originalPrice: 3299,
    category: "Kurthi",
    imageUrl: "images/kurthi.jpg",
    stock: 30,
    rating: 4.1,
    numReviews: 35,
    featured: false
  },
  {
    name: "Chudidar Set",
    description: "Stylish chudidar set with modern cuts and traditional appeal. Great for casual and semi-formal occasions.",
    price: 1999,
    originalPrice: 2799,
    category: "Chudidar",
    imageUrl: "images/chudidar.jpg",
    stock: 22,
    rating: 4.0,
    numReviews: 19,
    featured: false
  },
  {
    name: "Designer Dupatta",
    description: "Beautiful designer dupatta with intricate work and elegant patterns. Perfect to complement any outfit.",
    price: 899,
    originalPrice: 1299,
    category: "Dupatta",
    imageUrl: "images/dupatta.jpg",
    stock: 40,
    rating: 4.4,
    numReviews: 31,
    featured: false
  }
];

// Sample admin user
const adminUser = {
  name: "Admin User",
  email: "admin@elegantsarees.com",
  password: "admin123",
  phone: "+91 98765 43210",
  role: "admin",
  address: {
    street: "123 Admin Street",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    country: "India"
  }
};

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Created ${createdProducts.length} products`);

    // Create admin user
    const admin = new User(adminUser);
    await admin.save();
    console.log('Created admin user');

    console.log('Database seeded successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@elegantsarees.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed function
seedDatabase();
