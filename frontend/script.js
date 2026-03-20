/**
 * TECHNOVA FRONTEND - V2.2 (CONTRASTE & LEGIBILIDADE)
 * Foco: Resiliência de UI e melhoria na experiência de leitura (Sugestão QA).
 */

const productGrid = document.getElementById('productGrid');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const charCounter = document.getElementById('charCounter');
const notification = document.getElementById('searchNotification');
const balanceValue = document.getElementById('balanceValue');

// Configurações de Integração
const API_BASE_URL = 'http://localhost:5000/api/v1';

// Dados de Sessão (Mock para validação de Wallet no Day 48)
const TESTER_DATA = {
    balance: 10000.00
};

/**
 * 1. Inicialização da Home Mask
 * Garante que o usuário veja uma tela de boas-vindas antes da primeira busca.
 */
function renderHomeMask() {
    productGrid.innerHTML = `
        <div class="home-mask" data-cy="home-mask">
            <i class="fas fa-microchip"></i>
            <h2>Bem-vindo ao TechNova Lab</h2>
            <p>Sua central de hardware para testes de alta performance.</p>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Realize uma busca para listar os componentes disponíveis.</span>
        </div>
    `;
}

/**
 * 2. Sistema de Notificação UI
 * Substitui o uso de alert() por uma caixa de mensagem integrada ao design.
 */
function showNotification(message) {
    if (!notification) return;
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 4000);
}

/**
 * 3. Gestão Visual do Contador de Caracteres (Regra: 90/100)
 */
searchInput.addEventListener('input', () => {
    const length = searchInput.value.length;
    charCounter.textContent = `${length}/100`;

    searchInput.classList.remove('input-warning', 'input-error');
    if (length >= 100) {
        searchInput.classList.add('input-error');
    } else if (length >= 90) {
        searchInput.classList.add('input-warning');
    }
});

/**
 * 4. Lógica de Placeholder Inteligente (TN-12)
 */
function getProductImageHTML(imageUrl, productName) {
    if (!imageUrl || imageUrl.trim() === '') {
        return `
            <div class="placeholder-box">
                <i class="fas fa-microchip"></i>
                <br><span>TechNova Hardware</span>
            </div>`;
    }

    return `
        <img src="${imageUrl}" 
             alt="${productName}" 
             class="product-img"
             onerror="this.parentElement.innerHTML='<div class=\'placeholder-box\'><i class=\'fas fa-exclamation-triangle\'></i><br><span>Erro de Imagem</span></div>'">
    `;
}

/**
 * 5. Renderização de Cards com Alta Legibilidade
 * Utiliza a estrutura de camadas sugerida pelo QA para evitar ofuscamento de texto.
 */
function renderProducts(products) {
    if (!products || products.length === 0) {
        productGrid.innerHTML = `
            <div class="home-mask">
                <i class="fas fa-search"></i>
                <h2>Nenhum hardware encontrado.</h2>
                <p>Verifique o termo buscado ou tente novamente.</p>
            </div>`;
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-cy="product-card">
            <!-- Camada 1: Imagem (Área Superior) -->
            <div class="image-wrapper">
                ${getProductImageHTML(product.image_url, product.name)}
            </div>

            <!-- Camada 2: Conteúdo de Texto (Área Inferior com Fundo Sólido) -->
            <div class="card-content">
                <h3 data-cy="product-name">${product.name}</h3>
                <p data-cy="product-description">${product.description}</p>
                
                <!-- Camada 3: Rodapé com Preço e Ação -->
                <div class="card-footer">
                    <div class="price-tag" data-cy="product-price">
                        R$ ${parseFloat(product.price).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                    </div>
                    <button class="buy-btn" data-cy="buy-button">
                        <i class="fas fa-cart-plus"></i> Comprar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * 6. Função de Busca e Validação de Regras de Negócio
 */
async function performSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        showNotification("O campo de busca não pode estar vazio!");
        return;
    }

    if (query.length < 3) {
        showNotification("A busca requer no mínimo 3 caracteres.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Falha na API');

        const data = await response.json();
        const products = data.results || data;
        renderProducts(products);
    } catch (error) {
        console.error('Erro de Integração:', error);
        showNotification("Erro ao conectar com a API TechNova.");
    }
}

// Escutas de Eventos
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

/**
 * Inicialização do Ambiente no Carregamento
 */
document.addEventListener('DOMContentLoaded', () => {
    // Carrega Saldo do Tester André
    if (balanceValue) {
        balanceValue.textContent = `R$ ${TESTER_DATA.balance.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;
    }
    
    // Inicia com a Máscara de Boas-vindas (Home Mask)
    renderHomeMask();
});