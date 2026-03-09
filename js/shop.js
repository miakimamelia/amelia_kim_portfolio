// ==========================================
// PRODUCT DATA
// ==========================================

const products = [
    {
        id: 1,
        title: 'Abstract Meditation',
        type: 'Original Painting',
        price: 2500,
        description: 'Large oil painting exploring the intersection of color and form.',
        image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        id: 2,
        title: 'Abstract Meditation - Limited Print',
        type: 'Limited Edition Print',
        price: 85,
        description: 'High-quality limited edition print of original artwork. Edition of 50.',
        image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        id: 3,
        title: 'Digital Dreams',
        type: 'Digital Art',
        price: 450,
        description: 'Unique digital artwork available as NFT and high-resolution file.',
        image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        id: 4,
        title: 'Digital Dreams - Framed Print',
        type: 'Framed Print',
        price: 195,
        description: 'Museum-quality framed print with archival materials.',
        image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        id: 5,
        title: 'Fluid Forms',
        type: 'Installation Documentation',
        price: 350,
        description: 'High-resolution photography and documentation of installation piece.',
        image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        id: 6,
        title: 'Chromatic Movement',
        type: 'Limited Edition Print',
        price: 120,
        description: 'Vibrant mixed media artwork available as premium print.',
        image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
        id: 7,
        title: 'Temporal Layers',
        type: 'Original Painting',
        price: 1800,
        description: 'Acrylic on canvas exploring temporal concepts and layered meaning.',
        image: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    },
    {
        id: 8,
        title: 'Ethereal Spaces',
        type: 'Digital Art Print',
        price: 95,
        description: '3D digital artwork printed on premium paper.',
        image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
        id: 9,
        title: 'Confluence',
        type: 'Limited Edition Print',
        price: 140,
        description: 'Mixed media exploration available as numbered limited edition.',
        image: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)'
    },
    {
        id: 10,
        title: 'Spatial Resonance',
        type: 'Installation Video',
        price: 250,
        description: 'High-definition video documentation of interactive installation.',
        image: 'linear-gradient(135deg, #2e2e78 0%, #54c7c3 100%)'
    }
];

// ==========================================
// SHOPPING CART
// ==========================================

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('artCart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('artCart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.showAddedNotification(product.title);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    updateCartUI() {
        // Update cart count in navbar/sidebar
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }

        // Update cart display on shop page
        const cartCountDisplay = document.getElementById('cart-count-display');
        if (cartCountDisplay) {
            cartCountDisplay.textContent = this.getItemCount();
        }

        const cartTotalDisplay = document.getElementById('cart-total-display');
        if (cartTotalDisplay) {
            const subtotal = this.getTotal();
            const shipping = subtotal > 0 ? 15 : 0;
            const total = subtotal + shipping;
            cartTotalDisplay.textContent = formatCurrency(total);
        }

        this.renderCart();
    }

    renderCart() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = '<p style="padding: 2rem; text-align: center;">Your cart is empty</p>';
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background: ${item.image};"></div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="cart.removeItem(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        this.updateCartSummary();
    }

    updateCartSummary() {
        const subtotal = this.getTotal();
        const shipping = subtotal > 0 ? 15 : 0;
        const total = subtotal + shipping;

        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const totalEl = document.getElementById('total');

        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
        if (shippingEl) shippingEl.textContent = formatCurrency(shipping);
        if (totalEl) totalEl.textContent = formatCurrency(total);
    }

    showAddedNotification(productTitle) {
        // Create and show a small notification
        const notification = document.createElement('div');
        notification.textContent = `✓ ${productTitle} added to cart`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// ==========================================
// INITIALIZE CART
// ==========================================

const cart = new ShoppingCart();

// ==========================================
// PRODUCT GRID RENDERING
// ==========================================

function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image" style="background: ${product.image};"></div>
            <div class="product-details">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="product-meta">
                    <span class="product-price">${formatCurrency(product.price)}</span>
                    <span class="product-type">${product.type}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// ADD TO CART HANDLER
// ==========================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// ==========================================
// CHECKOUT HANDLER
// ==========================================

function checkout() {
    if (cart.items.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const total = cart.getTotal() + 15;
    const message = `You're about to checkout with a total of ${formatCurrency(total)}. In a production environment, this would integrate with a payment processor like Stripe or PayPal.`;
    
    alert(message);
    
    // In a real application, you would:
    // 1. Redirect to a payment processor
    // 2. Handle secure payment processing
    // 3. Send confirmation email
    // 4. Update inventory
    // 5. Clear cart on successful payment
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    cart.updateCartUI();
    initHamburgerMenu();

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(20px);
            }
        }
    `;
    document.head.appendChild(style);
});

// ==========================================
// HAMBURGER MENU
// ==========================================

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}
