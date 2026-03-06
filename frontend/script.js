const searchInput = document.getElementById('searchInput');
const charCounter = document.getElementById('charCounter');
const searchButton = document.getElementById('searchButton');
const productGrid = document.getElementById('productGrid');

// 1. Lógica de Feedback Visual (Contador e Cores)
searchInput.addEventListener('input', () => {
    const length = searchInput.value.length;
    charCounter.innerText = `${length}/100`;
    
    searchInput.classList.remove('warning', 'error');
    if (length >= 90 && length < 100) {
        searchInput.classList.add('warning');
    } else if (length >= 100) {
        searchInput.classList.add('error');
    }
});

// 2. Função de Busca (Consumindo a API com suporte a Tokens)
async function performSearch() {
    const query = searchInput.value.trim();
    
    // Bloqueia busca vazia no frontend (Reflexo da Issue de UX)
    if (!query) return;

    try {
        productGrid.innerHTML = '<p class="loading">Consultando estoque TechNova...</p>';
        
        const response = await fetch(`http://localhost:5000/api/v1/products/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (response.ok) {
            displayProducts(data.results);
        } else {
            // Exibe erro vindo do Backend (Acentos/Keywords)
            productGrid.innerHTML = `<p class="error-msg" data-cy="error-message">${data.suggestion || data.error}</p>`;
        }
    } catch (error) {
        productGrid.innerHTML = `<p class="error-msg">Erro crítico de conexão.</p>`;
    }
}

// 3. Renderização Dinâmica com Atributos de Teste (data-cy)
function displayProducts(products) {
    if (products.length === 0) {
        productGrid.innerHTML = `<p class="no-results" data-cy="no-results">Ops! Não encontramos esse hardware.</p>`;
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-cy="product-card">
            <img src="${product.image_url || 'https://via.placeholder.com/150'}" 
                 alt="${product.name}" 
                 data-cy="product-image">
            <h3 data-cy="product-name">${product.name}</h3>
            <p data-cy="product-description">${product.description}</p>
            <span class="price" data-cy="product-price">
                R$ ${parseFloat(product.price).toLocaleString('pt-br')}
            </span>
            <button class="detail-btn" data-cy="btn-details">Ver Detalhes</button>
        </div>
    `).join('');
}

// Listeners de Evento
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});