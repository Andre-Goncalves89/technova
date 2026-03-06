const searchInput = document.getElementById('searchInput');
const charCounter = document.getElementById('charCounter');
const searchButton = document.getElementById('searchButton');
const productGrid = document.getElementById('productGrid');

// 1. Otimização de Feedback Visual
searchInput.addEventListener('input', () => {
    const { value } = searchInput;
    charCounter.innerText = `${value.length}/100`;
    
    // Reset de estados visuais
    searchInput.classList.remove('warning', 'error');
    if (value.length >= 90) searchInput.classList.add('warning');
    if (value.length >= 100) searchInput.classList.add('error');
});

// 2. Lógica de Busca Refatorada (Clean Code)
async function performSearch() {
    // Normalização básica no front para evitar espaços desnecessários
    const query = searchInput.value.trim();
    if (!query) return;

    try {
        productGrid.innerHTML = '<p class="loading">Buscando no TechNova...</p>';
        
        const response = await fetch(`http://localhost:5000/api/v1/products/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (response.ok) {
            renderProducts(data.results);
        } else {
            // Exibe o erro vindo do Backend (onde está o bug do "í")
            showError(data.suggestion || data.error);
        }
    } catch (error) {
        showError("Erro de conexão com o servidor TechNova.");
    }
}

// 3. Funções Auxiliares (Separação de Responsabilidades)
function renderProducts(products) {
    if (products.length === 0) {
        productGrid.innerHTML = '<p>Ops! Não encontramos esse hardware.</p>';
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image_url || 'https://via.placeholder.com/150'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="price">R$ ${parseFloat(product.price).toLocaleString('pt-br')}</span>
            <button class="detail-btn">Ver Detalhes</button>
        </div>
    `).join('');
}

function showError(message) {
    productGrid.innerHTML = `<p class="error-msg">${message}</p>`;
}

// Eventos
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});