/**
 * TECHNOVA FRONTEND - SCRIPT V2.8 (FIX: DOM BINDING)
 * Objetivo: Integrar com a API corrigindo o ID do botão de busca.
 */

const API_URL = 'http://localhost:5000/api/v1';

// Mapeamento de Elementos do DOM (AGORA 100% SINCRONIZADO COM SEU HTML)
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchButton'); // FIX: Era searchBtn, agora é searchButton
const productGrid = document.getElementById('productGrid');
const errorContainer = document.getElementById('searchNotification');
const charCounter = document.getElementById('charCounter');

// TN-R03: Validação visual de limite de caracteres
searchInput.addEventListener('input', () => {
    const len = searchInput.value.length;
    charCounter.textContent = `${len}/100`;
    
    if (len >= 90 && len < 100) {
        searchInput.style.borderColor = '#d29922'; // Warning
    } else if (len >= 100) {
        searchInput.style.borderColor = '#f85149'; // Error
    } else {
        searchInput.style.borderColor = 'var(--border-color)'; // Normal
    }
});

// TN-R04: Carregar Saldo da Carteira (Wallet)
async function loadWallet() {
    try {
        const response = await fetch(`${API_URL}/wallet`);
        if (!response.ok) throw new Error('Falha ao buscar carteira');
        
        const data = await response.json();
        const balanceValue = document.getElementById('balanceValue');
        
        if (balanceValue) {
            balanceValue.textContent = `R$ ${data.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        }
    } catch (err) {
        console.error('QA Debug - Erro ao carregar carteira:', err);
    }
}

// TN-R02: Função de Busca e Carregamento de Produtos
async function performSearch() {
    const query = searchInput.value.trim();
    
    if (query.length > 0 && query.length < 3) {
        showError('A busca requer no mínimo 3 caracteres.');
        return;
    }

    try {
        if (errorContainer) errorContainer.style.display = 'none';
        productGrid.innerHTML = '<div style="color: white; padding: 20px;">Carregando laboratório de hardware...</div>';

        const response = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Falha na resposta do servidor');
        
        const data = await response.json();
        renderProducts(data.results);
    } catch (err) {
        console.error('QA Debug - Erro na busca:', err);
        showError('Erro ao conectar com a API TechNova.');
    }
}

// Função para renderizar os cards na tela
function renderProducts(products) {
    if (!products || products.length === 0) {
        productGrid.innerHTML = '<div style="color: #8b949e; padding: 40px; grid-column: 1/-1; text-align: center;">Nenhum item encontrado no laboratório.</div>';
        return;
    }

    productGrid.innerHTML = products.map(p => `
        <div class="product-card" data-cy="product-card">
            <div class="image-wrapper" style="width: 100%; height: 220px; overflow: hidden; border-radius: 12px 12px 0 0;">
                <img src="${p.image_url}" alt="${p.name}" onerror="this.src='https://placehold.co/400x300/161b22/f0f6fc?text=Imagem+Indispon%C3%ADvel'" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="product-info" style="padding: 15px; display: flex; flex-direction: column; flex-grow: 1;">
                <div style="margin-bottom: 10px;">
                    <span style="background: rgba(88,166,255,0.1); color: var(--accent-blue); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; border: 1px solid rgba(88,166,255,0.2);">${p.category}</span>
                </div>
                <h3 style="color: white; margin: 0 0 10px 0; font-size: 1.1rem; line-height: 1.3;">${p.name}</h3>
                <p style="color: #8b949e; font-size: 0.85rem; height: 40px; overflow: hidden; margin-bottom: 15px;">${p.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 15px; border-top: 1px solid var(--border-color);">
                    <span style="color: var(--accent-blue); font-weight: bold; font-size: 1.2rem;">R$ ${parseFloat(p.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <button class="buy-button" data-cy="buy-button" style="background: var(--success-green); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; transition: opacity 0.2s;">Comprar</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Exibe mensagens de erro na tela
function showError(msg) {
    if (errorContainer) {
        errorContainer.textContent = msg;
        errorContainer.style.display = 'block';
    }
}

// Gatilhos de Eventos para Busca
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// AUTO-LOAD: Carrega carteira e produtos ao abrir
document.addEventListener('DOMContentLoaded', () => {
    loadWallet();       
    performSearch();    
});