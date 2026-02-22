let cart = JSON.parse(localStorage.getItem('toy_cart')) || {};

function saveCart() {
    localStorage.setItem('toy_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countElements = document.querySelectorAll('#cart-count');
    let totalItems = 0;
    for (let id in cart) {
        totalItems += cart[id];
    }
    countElements.forEach(el => el.textContent = totalItems);
}

function addToCart(productId) {
    if (cart[productId]) {
        cart[productId]++;
    } else {
        cart[productId] = 1;
    }
    saveCart();
    if (document.getElementById('cart-items')) {
        renderCartPage();
    }
}

function removeFromCart(productId) {
    if (cart[productId] > 1) {
        cart[productId]--;
    } else {
        delete cart[productId];
    }
    saveCart();
    if (document.getElementById('cart-items')) {
        renderCartPage();
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <h3>${product.name}</h3>
        <p>Цена: ${product.price} руб.</p>
        <button onclick="addToCart(${product.id})">В корзину</button>
    `;
    return card;
}

function renderProducts() {
    const popularContainer = document.getElementById('popular-products');
    const allContainer = document.getElementById('all-products');

    if (popularContainer) {
        const popularProducts = products.filter(p => p.popular);
        popularProducts.forEach(product => {
            popularContainer.appendChild(createProductCard(product));
        });
    }

    if (allContainer) {
        products.forEach(product => {
            allContainer.appendChild(createProductCard(product));
        });
    }
}

function renderCartPage() {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    
    if (!cartItemsList || !totalPriceEl) return;

    cartItemsList.innerHTML = '';
    let total = 0;

    for (const id in cart) {
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
            const quantity = cart[id];
            const cost = product.price * quantity;
            total += cost;

            const li = document.createElement('li');
            li.innerHTML = `
                <span>${product.name} (x${quantity})</span>
                <span>${cost} руб. <button class="remove-btn" onclick="removeFromCart(${id})">❌</button></span>
            `;
            cartItemsList.appendChild(li);
        }
    }

    totalPriceEl.textContent = total;
}

const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (Object.keys(cart).length === 0) {
            alert('Корзина пуста!');
            return;
        }
        alert('Заказ оформлен на сумму ' + document.getElementById('total-price').textContent + ' руб.');
        cart = {};
        saveCart();
        renderCartPage();
    });
}

renderProducts();
renderCartPage();
updateCartCount();