/**
 * TECHNOVA E2E - SUÍTE DE REGRESSÃO V2.2 (CORRIGIDA)
 * Foco: Validação de Busca, Seletores data-cy e Regras de Negócio
 */

describe('TechNova - Hardware Lab: Busca e Validação de UI', () => {
    
    beforeEach(() => {
        // TN-R05: Limpa o banco para garantir que o saldo e itens sejam resetados
        cy.task('clearDatabase');
        cy.visit('/');
    });

    it('Deve exibir a Home Mask e o Saldo Inicial corretamente', () => {
        cy.get('[data-cy="home-mask"]').should('be.visible');
        cy.get('[data-cy="home-mask"]').contains('Bem-vindo ao TechNova Lab');
        cy.get('[data-cy="wallet-display"]').should('contain', 'R$ 10.000,00');
    });

    it('Deve validar o contador de caracteres (Aviso e Erro)', () => {
        // 1. Valida contagem simples
        cy.get('[data-cy="search-input"]').type('RTX');
        // CORREÇÃO: O texto '3/100' está no contador, não no input
        cy.get('[data-cy="char-counter"]').should('contain', '3/100');

        // 2. Valida limite de aviso (90 caracteres)
        const warningText = 'a'.repeat(90);
        cy.get('[data-cy="search-input"]').clear().type(warningText);
        cy.get('[data-cy="search-input"]').should('have.class', 'input-warning');
        cy.get('[data-cy="char-counter"]').should('contain', '90/100');

        // 3. Valida limite de erro (100 caracteres)
        const errorText = 'e'.repeat(100);
        cy.get('[data-cy="search-input"]').clear().type(errorText);
        cy.get('[data-cy="search-input"]').should('have.class', 'input-error');
        cy.get('[data-cy="char-counter"]').should('contain', '100/100');
    });

    it('Deve exibir notificação de erro ao pesquisar com menos de 3 caracteres', () => {
        cy.get('[data-cy="search-input"]').type('rt');
        cy.get('[data-cy="search-btn"]').click();

        cy.get('[data-cy="search-notification"]')
            .should('be.visible')
            .and('contain', 'A busca requer no mínimo 3 caracteres');
    });

    it('Deve realizar uma busca com sucesso e validar o layout dos cards', () => {
        // Usamos um termo que sabemos que existe no init.sql
        cy.get('[data-cy="search-input"]').type('RTX');
        cy.get('[data-cy="search-btn"]').click();

        cy.get('[data-cy="product-grid"]').should('be.visible');
        
        // Valida se o card respeita o novo design de legibilidade
        cy.get('[data-cy="product-card"]').first().within(() => {
            cy.get('[data-cy="product-name"]').should('be.visible');
            cy.get('[data-cy="product-price"]').should('contain', 'R$');
            cy.get('[data-cy="buy-button"]').should('be.visible');
        });
    });
});