let cart = {};

function renderProducts() {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Цена: ${product.price} руб.</p>
            <button onclick="addToCart(${product.id})">В корзину</button>
        `;
        productsList.appendChild(card);
    });
}

function addToCart(productId) {
    if (cart[productId]) {
        cart[productId]++;
    } else {
        cart[productId] = 1;
    }
    updateCart();
}

function removeFromCart(productId) {
    if (cart[productId] > 1) {
        cart[productId]--;
    } else {
        delete cart[productId];
    }
    updateCart();
}

function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    
    cartItemsList.innerHTML = '';
    let total = 0;

    for (const id in cart) {
        const product = products.find(p => p.id === parseInt(id));
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

    totalPriceEl.textContent = total;
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
        alert('Корзина пуста!');
        return;
    }
    alert('Заказ оформлен на сумму ' + document.getElementById('total-price').textContent + ' руб.');
    cart = {};
    updateCart();
});

renderProducts();