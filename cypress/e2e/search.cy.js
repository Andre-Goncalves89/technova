/**
 * TECHNOVA E2E - SUÍTE DE REGRESSÃO V2.2
 * Foco: Validação de Busca, Seletores data-cy e Regras de Negócio
 */

describe('TechNova - Hardware Lab: Busca e Validação de UI', () => {
    
    beforeEach(() => {
        // Visita a aplicação (configurada para localhost:3000)
        cy.visit('/');
    });

    it('Deve exibir a Home Mask e o Saldo Inicial corretamente', () => {
        // Valida se a máscara de boas-vindas está visível
        cy.get('[data-cy="home-mask"]').should('be.visible');
        cy.get('[data-cy="home-mask"]').contains('Bem-vindo ao TechNova Lab');

        // Valida o saldo de R$ 10.000,00 que configuramos no Day 48
        cy.get('[data-cy="wallet-display"]').should('contain', 'R$ 10.000,00');
    });

    it('Deve validar o contador de caracteres (Aviso e Erro)', () => {
        const input = cy.get('[data-cy="search-input"]');
        const counter = cy.get('[data-cy="char-counter"]');

        // Teste de digitação simples
        input.type('RTX');
        counter.should('contain', '3/100');

        // Teste de limite de aviso (90 caracteres)
        const longText = 'a'.repeat(90);
        input.clear().type(longText);
        // Verifica se a classe CSS de aviso foi aplicada
        input.should('have.class', 'input-warning');

        // Teste de limite de erro (100 caracteres)
        const maxText = 'e'.repeat(100);
        input.clear().type(maxText);
        input.should('have.class', 'input-error');
    });

    it('Deve exibir notificação de erro ao pesquisar com menos de 3 caracteres', () => {
        cy.get('[data-cy="search-input"]').type('rt');
        cy.get('[data-cy="search-btn"]').click();

        // Valida a caixa de notificação customizada (Substituta do alert)
        cy.get('[data-cy="search-notification"]')
            .should('be.visible')
            .and('contain', 'A busca requer no mínimo 3 caracteres');
    });

    it('Deve realizar uma busca com sucesso e validar o layout dos cards', () => {
        cy.get('[data-cy="search-input"]').type('RTX 4090');
        cy.get('[data-cy="search-btn"]').click();

        // Aguarda a renderização dos produtos
        cy.get('[data-cy="product-grid"]').should('be.visible');
        
        // Valida a estrutura do card (conforme sugestão de legibilidade do QA)
        cy.get('[data-cy="product-card"]').first().within(() => {
            cy.get('[data-cy="product-name"]').should('be.visible');
            cy.get('[data-cy="product-price"]').should('contain', 'R$');
            cy.get('[data-cy="buy-button"]').should('be.visible').and('contain', 'Comprar');
        });
    });
});