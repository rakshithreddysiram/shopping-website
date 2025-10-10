// Product Data
const products = [
    {
        id: 1,
        name: "Kanchipuram Silk Saree",
        currentPrice: "₹12,999",
        originalPrice: "₹15,999",
        image: "images/saree1.jpg",
        category: "Silk",
        rating: 4.5,
        ratingCount: 24,
        description: "Exquisite Kanchipuram silk saree with intricate zari work and traditional motifs. Perfect for weddings and special occasions.",
        sku: "KS-1001",
        tags: "silk, wedding, traditional"
    },
    {
        id: 2,
        name: "Banarasi Silk Saree",
        currentPrice: "₹9,499",
        originalPrice: "₹11,999",
        image: "images/saree2.jpg",
        category: "Silk",
        rating: 5,
        ratingCount: 42,
        description: "Handcrafted Banarasi silk saree with rich gold zari work and timeless design. Ideal for festive occasions and celebrations.",
        sku: "BS-1002",
        tags: "silk, festive, traditional"
    },
    {
        id: 3,
        name: "Handloom Cotton Saree",
        currentPrice: "₹3,999",
        originalPrice: "₹5,499",
        image: "images/saree3.jpg",
        category: "Cotton",
        rating: 4,
        ratingCount: 18,
        description: "Lightweight handloom cotton saree with contemporary prints and comfortable feel. Perfect for daily wear and casual occasions.",
        sku: "HC-1003",
        tags: "cotton, casual, daily wear"
    },
    {
        id: 4,
        name: "Designer Georgette Saree",
        currentPrice: "₹7,999",
        originalPrice: "₹9,999",
        image: "images/saree4.jpg",
        category: "Designer",
        rating: 5,
        ratingCount: 36,
        description: "Modern designer georgette saree with elegant embroidery and contemporary styling. Perfect for parties and social gatherings.",
        sku: "DG-1004",
        tags: "designer, party, modern"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    
    // Persist dropdown menu across pages
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Add dropdown class to Collection nav item on all pages
    const collectionNavItem = document.querySelector('.nav-links li:nth-child(2)');
    if (collectionNavItem) {
        collectionNavItem.classList.add('dropdown');
        
        // Check if dropdown menu exists, if not create it
        if (!collectionNavItem.querySelector('.dropdown-menu')) {
            const dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'dropdown-menu';
            dropdownMenu.innerHTML = `
                <li><a href="products.html?category=saree">Sarees</a></li>
                <li><a href="products.html?category=cotton-dress">Cotton Dresses</a></li>
                <li><a href="products.html?category=party-wear">Party Wear</a></li>
                <li><a href="products.html?category=maxi-dress">Maxi Dresses</a></li>
                <li><a href="products.html?category=kurthi">Kurthi Sets</a></li>
                <li><a href="products.html?category=chudidar">Chudidar</a></li>
                <li><a href="products.html?category=dupatta">Dupattas</a></li>
            `;
            collectionNavItem.appendChild(dropdownMenu);
        }
        
        // Add dropdown icon if not present
        const collectionLink = collectionNavItem.querySelector('a');
        if (collectionLink && !collectionLink.querySelector('.fa-chevron-down')) {
            collectionLink.innerHTML = 'Collection <i class="fas fa-chevron-down"></i>';
        }
    }
    
    // Quick View Modal
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const modal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (quickViewBtns.length > 0) {
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (e) e.stopPropagation();
                const productId = parseInt(this.getAttribute('data-id'));
                openQuickView(productId);
            });
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Make all product cards clickable
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    if (productCards.length > 0) {
        productCards.forEach(card => {
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', function(e) {
                // Don't navigate if clicking on a button
                if (e.target.closest('button') || e.target.tagName === 'BUTTON') {
                    return;
                }
                
                const quickViewBtn = this.querySelector('.quick-view');
                if (quickViewBtn) {
                    const productId = quickViewBtn.getAttribute('data-id');
                    window.location.href = 'product-detail.html?id=' + productId;
                }
            });
            
            // Prevent clicks on buttons from triggering card click
            const buttons = card.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            });
        });
    }
});
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Add to Cart Buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId, 1);
            });
        });
    }
    
    // Modal Add to Cart Button
    const modalAddToCart = document.getElementById('modalAddToCart');
    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const quantity = parseInt(document.querySelector('.quantity-input').value);
            addToCart(productId, quantity);
            modal.style.display = 'none';
        });
    }
    
    // Quantity Buttons
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our latest updates.`);
            this.reset();
        });
    }
});

// Open Quick View Modal
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductTitle').textContent = product.name;
    document.getElementById('modalCurrentPrice').textContent = product.currentPrice;
    document.getElementById('modalOriginalPrice').textContent = product.originalPrice;
    document.getElementById('modalRatingCount').textContent = `(${product.ratingCount})`;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalSku').textContent = product.sku;
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalTags').textContent = product.tags;
    document.getElementById('modalAddToCart').setAttribute('data-id', product.id);
    
    document.getElementById('quickViewModal').style.display = 'block';
}

// Add to Cart Function
function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.currentPrice,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
}

// Show Notification
function showNotification(message) {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Add styles for notification container
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '1000';
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles for notification
    notification.style.background = 'var(--primary-color)';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '5px';
    notification.style.marginTop = '10px';
    notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        // Remove from DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}