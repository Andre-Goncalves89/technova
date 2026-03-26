document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. CONFIGURAÇÕES E ESTADO GLOBAL
    // ==========================================
    const API_URL = 'http://localhost:5000/api/v1';
    const WALLET_BALANCE = 10000.00; // Regra de Negócio: Limite da Carteira
    let cart = []; // Estado do Carrinho

    // ==========================================
    // 2. MAPEAMENTO DO DOM
    // ==========================================
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const charCounter = document.getElementById('charCounter');
    const searchNotification = document.getElementById('searchNotification');
    const productGrid = document.getElementById('productGrid');
    
    // Elementos do Carrinho
    const cartOpenBtn = document.getElementById('cartOpenBtn');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalValue = document.getElementById('cartTotalValue');
    const cartBadge = document.getElementById('cartBadge');
    const balanceValue = document.getElementById('balanceValue');
    const checkoutBtn = document.getElementById('checkoutBtn'); 

    // Inicializa a carteira visualmente
    balanceValue.textContent = formatCurrency(WALLET_BALANCE);

    // ==========================================
    // 3. LÓGICA DO CARRINHO DE COMPRAS
    // ==========================================
    
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }

    cartOpenBtn.addEventListener('click', toggleCart);
    cartCloseBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Adicionar ao Carrinho com Validação de QA
    window.addToCart = function(id, name, price) {
        const currentTotal = cart.reduce((sum, item) => sum + item.price, 0);
        
        // Validação da Regra de Negócio: Impede gastar mais do que tem na carteira
        if (currentTotal + price > WALLET_BALANCE) {
            showNotification(`❌ Saldo insuficiente! O limite da sua carteira é ${formatCurrency(WALLET_BALANCE)}.`, 'error');
            return; // Bloqueia a execução
        }

        cart.push({ id, name, price });
        updateCartUI();
        showNotification(`✅ ${name} adicionado ao carrinho!`, 'success');
    };

    // Atualiza a Interface do Carrinho e a Carteira
    function updateCartUI() {
        cartBadge.textContent = cart.length;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalValue.textContent = formatCurrency(total);
        balanceValue.textContent = formatCurrency(WALLET_BALANCE - total);

        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Seu laboratório de compras está vazio.</div>';
            return;
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.style.borderBottom = '1px solid #333';
            itemElement.style.paddingBottom = '10px';
            itemElement.style.display = 'flex';
            itemElement.style.justifyContent = 'space-between';
            itemElement.style.alignItems = 'center';
            
            itemElement.innerHTML = `
                <div>
                    <div style="font-size: 0.9rem; font-weight: bold;">${item.name}</div>
                    <div style="color: var(--accent-blue);">${formatCurrency(item.price)}</div>
                </div>
                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: var(--error-red); cursor: pointer; padding: 5px;">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    // FEATURE: Finalizar Compra
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('🛒 Seu carrinho já está vazio!', 'error');
            return;
        }
        
        // Simula a finalização da compra
        showNotification('🎉 Compra finalizada com sucesso! O laboratório TechNova agradece.', 'success');
        
        // Limpa o estado (zera o array) e atualiza a UI
        cart = [];
        updateCartUI();
        toggleCart(); // Esconde a sidebar automaticamente após comprar
    });

    // ==========================================
    // 4. LÓGICA DE BUSCA E CATÁLOGO
    // ==========================================
    
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    function showNotification(message, type) {
        searchNotification.textContent = message;
        searchNotification.style.display = 'block';
        searchNotification.style.backgroundColor = type === 'error' ? 'var(--error-red)' : '#28a745';
        
        searchNotification.style.color = '#ffffff'; 
        searchNotification.style.fontWeight = 'bold';
        searchNotification.style.textShadow = '1px 1px 2px rgba(0,0,0,0.5)';
        
        setTimeout(() => {
            searchNotification.style.display = 'none';
        }, 3000);
    }

   // FIX: Re-implementação da lógica de cores da borda (Regressão Day 51)
    searchInput.addEventListener('input', (e) => {
        const length = e.target.value.length;
        charCounter.textContent = `${length}/100`;

        // Lógica de manipulação de classes CSS para feedback visual
        if (length >= 100) {
            searchInput.classList.remove('input-warning');
            searchInput.classList.add('input-error'); // Borda Vermelha
        } else if (length >= 90) {
            searchInput.classList.remove('input-error');
            searchInput.classList.add('input-warning'); // Borda Amarela
        } else {
            // Limpa as classes se estiver abaixo de 90
            searchInput.classList.remove('input-warning', 'input-error');
        }
    });

    async function fetchProducts(query = '') {
        try {
            const response = await fetch(`${API_URL}/products/search?q=${query}`);
            const data = await response.json();
            renderProducts(data.results);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            productGrid.innerHTML = '<p style="color: red; text-align: center; width: 100%;">Erro de conexão com a API.</p>';
        }
    }

    function renderProducts(products) {
        productGrid.innerHTML = '';
        if (products.length === 0) {
            productGrid.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-muted);">Nenhum hardware encontrado no laboratório.</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-cy', 'product-card');

            // FIX: Sanitização de aspas para evitar quebra do HTML no onclick
            const safeName = product.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');

            card.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image_url}'); height: 200px; width: 100%; background-size: cover; background-position: center; border-bottom: 2px solid var(--accent-blue);">
                    ${!product.image_url ? '<div style="padding: 20px; text-align: center;">Imagem Indisponível</div>' : ''}
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description" style="min-height: 45px;">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatCurrency(product.price)}</span>
                        <button class="buy-btn" data-cy="buy-btn" onclick="addToCart(${product.id}, '${safeName}', ${product.price})">Comprar</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query.length > 0 && query.length < 3) {
            showNotification('O termo de busca deve ter no mínimo 3 caracteres.', 'error');
            return;
        }
        searchNotification.style.display = 'none';
        fetchProducts(query);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    fetchProducts();
});