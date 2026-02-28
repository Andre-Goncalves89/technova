const searchInput = document.getElementById('searchInput');
const charCounter = document.getElementById('charCounter');
const searchButton = document.getElementById('searchButton');
const productGrid = document.getElementById('productGrid');

// 1. Lógica de Feedback Visual (Sugestão do André QA Lead)
searchInput.addEventListener('input', () => {
    const length = searchInput.value.length;
    charCounter.innerText = `${length}/100`;

    // Reset de classes
    searchInput.classList.remove('warning', 'error');

    if (length >= 90 && length < 100) {
        searchInput.classList.add('warning'); // Cor Amarela
    } else if (length >= 100) {
        searchInput.classList.add('error');   // Cor Vermelha
    }
});

// 2. Função para buscar produtos na API Backend
async function performSearch() {
    const query = searchInput.value;

    try {
        const response = await fetch(`http://localhost:5000/api/v1/products/search?q=${query}`);
        const data = await response.json();

        if (response.ok) {
            displayProducts(data.results);
        } else {
            // Exibe mensagem amigável definida no Backend
            productGrid.innerHTML = `<p class="error-msg">${data.suggestion || data.error}</p>`;
        }
    } catch (error) {
        productGrid.innerHTML = `<p class="error-msg">Erro ao conectar com o servidor TechNova.</p>`;
    }
}

// 3. Renderizar produtos na tela
function displayProducts(products) {
    if (products.length === 0) {
        productGrid.innerHTML = `<p>Ops! Não encontramos o hardware que você procura.</p>`;
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="https://via.placeholder.com/150" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="price">R$ ${parseFloat(product.price).toLocaleString('pt-br')}</span>
            <button class="detail-btn">Ver Detalhes</button>
        </div>
    `).join('');
}

// Eventos de clique e teclado
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});