// Payment Page JavaScript

// Get product details from URL parameters
function getProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        name: urlParams.get('product') || 'Digital Product',
        price: parseFloat(urlParams.get('price')) || 0,
        description: urlParams.get('description') || 'Premium digital product',
        type: urlParams.get('type') || 'general'
    };
}

// Update order summary
function updateOrderSummary() {
    const product = getProductFromURL();

    document.getElementById('productName').textContent = product.name;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('totalPrice').textContent = `$${product.price.toFixed(2)}`;

    // Update PayPal form fields
    if (document.getElementById('paypal-item-name')) {
        document.getElementById('paypal-item-name').value = product.name;
        document.getElementById('paypal-amount').value = product.price.toFixed(2);
    }

    return product;
}

// Payment method tab switching
function initPaymentTabs() {
    const tabs = document.querySelectorAll('.payment-tab');
    const methods = document.querySelectorAll('.payment-method');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and methods
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.opacity = '0.6';
                t.style.borderBottomColor = 'transparent';
            });
            methods.forEach(m => {
                m.classList.remove('active');
                m.style.display = 'none';
            });

            // Add active class to clicked tab
            tab.classList.add('active');
            tab.style.opacity = '1';
            tab.style.borderBottomColor = 'var(--primary)';

            // Show corresponding payment method
            const methodName = tab.getAttribute('data-method');
            const methodElement = document.getElementById(`${methodName}-payment`);
            if (methodElement) {
                methodElement.classList.add('active');
                methodElement.style.display = 'block';
            }
        });
    });
}

// Initialize PayPal button (if PayPal SDK is loaded)
function initPayPalButton() {
    const product = getProductFromURL();

    // Check if PayPal SDK is available
    if (typeof paypal !== 'undefined') {
        paypal.Buttons({
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: product.description,
                        amount: {
                            value: product.price.toFixed(2)
                        }
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    // Redirect to confirmation page
                    window.location.href = `confirmation.html?order=${details.id}&product=${encodeURIComponent(product.name)}`;
                });
            },
            onError: function (err) {
                alert('Payment failed. Please try again or contact support.');
                console.error('PayPal error:', err);
            }
        }).render('#paypal-button-container');
    } else {
        // Show manual PayPal form if SDK not loaded
        document.getElementById('paypal-manual-form').style.display = 'block';
        console.log('PayPal SDK not loaded. Using manual form.');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Validate product data
function validateProductData() {
    const product = getProductFromURL();

    if (!product.name || product.price <= 0) {
        showNotification('Invalid product data. Redirecting to shop...', 'error');
        setTimeout(() => {
            window.location.href = 'pricing.html';
        }, 2000);
        return false;
    }

    return true;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Validate product data
    if (!validateProductData()) {
        return;
    }

    // Update order summary
    updateOrderSummary();

    // Initialize payment tabs
    initPaymentTabs();

    // Initialize PayPal button
    initPayPalButton();

    // Show welcome notification
    setTimeout(() => {
        showNotification('Secure checkout - Your payment is protected', 'success');
    }, 500);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .payment-tab.active {
        border-bottom-color: var(--primary) !important;
        opacity: 1 !important;
    }
    
    .payment-method {
        animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
