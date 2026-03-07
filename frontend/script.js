/**
 * TechNova - Lógica de Frontend (Search-First UX)
 * Focado em Performance, UX de Busca e Testabilidade (Cypress data-cy)
 */

const searchInput = document.getElementById('searchInput');
const charCounter = document.getElementById('charCounter');
const searchButton = document.getElementById('searchButton');
const productGrid = document.getElementById('productGrid');

// Configuração do Endpoint alinhado com o Backend v1 corrigido
const API_BASE_URL = 'http://localhost:5000/api/v1/products';

// 1. Lógica de Feedback Visual do Contador de Caracteres (UX)
searchInput.addEventListener('input', () => {
    const length = searchInput.value.length;
    charCounter.innerText = `${length}/100`;

    // Feedback visual de limites (Mudança de cor no CSS)
    searchInput.classList.remove('warning', 'error');
    if (length >= 90 && length < 100) {
        searchInput.classList.add('warning');
    } else if (length >= 100) {
        searchInput.classList.add('error');
    }
});

// 2. Função de Busca (Gatilho Principal)
async function performSearch() {
    const query = searchInput.value.trim();

    // Validação de Frontend: Evita chamadas inúteis ao Backend
    if (!query || query.length < 3) {
        productGrid.innerHTML = `
            <div class="info-msg" data-cy="search-guidance">
                <p>⚠️ Digite pelo menos 3 caracteres para buscar componentes no TechNova Lab.</p>
            </div>`;
        return;
    }

    try {
        // Estado de Loading para o Cypress identificar o início da transição
        productGrid.innerHTML = '<p class="loading" data-cy="loading-state">Consultando estoque de hardware...</p>';

        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (response.ok) {
            displayProducts(data.results);
        } else {
            // Exibe o erro estruturado vindo do Backend v1
            productGrid.innerHTML = `<p class="error-msg" data-cy="error-message">${data.error || 'Erro na busca.'}</p>`;
        }
    } catch (error) {
        productGrid.innerHTML = `
            <div class="error-msg">
                <p>Erro crítico de conexão: Verifique se o Backend (Porta 5000) está online.</p>
            </div>`;
    }
}

// 3. Renderização Dinâmica (Só ocorre após o Search bem-sucedido)
function displayProducts(products) {
    if (!products || products.length === 0) {
        productGrid.innerHTML = `
            <div class="no-results" data-cy="no-results">
                <p>Ops! Nenhum hardware encontrado com esse termo no nosso lab.</p>
            </div>`;
        return;
    }

    // Mapeamento dos produtos para Cards HTML com seletores de teste
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-cy="product-card">
            <img src="${product.image_url || 'https://via.placeholder.com/150'}" 
                 alt="${product.name}" 
                 data-cy="product-image">
            <div class="product-info">
                <h3 data-cy="product-name">${product.name}</h3>
                <p data-cy="product-description">${product.description}</p>
                <span class="price" data-cy="product-price">
                    R$ ${parseFloat(product.price).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                </span>
                <button class="detail-btn" data-cy="btn-details">Ver Detalhes</button>
            </div>
        </div>
    `).join('');
}

// Listeners (Ação do Usuário)
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// 4. ESTADO INICIAL (UX CLEAN)
// Garante que a vitrine comece limpa, evitando carregar 20 itens sem necessidade
document.addEventListener('DOMContentLoaded', () => {
    productGrid.innerHTML = `
        <div class="welcome-state" data-cy="welcome-message">
            <p>O que vamos testar hoje? Use o campo de busca para encontrar componentes de hardware.</p>
        </div>`;
});