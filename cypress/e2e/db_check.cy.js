/**
 * TECHNOVA E2E - SANITY CHECK & DB IDEMPOTENCY (V3.0 DOCKER)
 * Objetivo: Validar o Auto-Load do banco e a consistência de estado em buscas consecutivas.
 */

describe('TechNova Lab - Sanity Check: Base de Dados e Auto-Load', () => {
    
    beforeEach(() => {
        // TN-R05: Garante um ambiente imaculado chamando a task do Postgres
        cy.task('clearDatabase');
        cy.visit('/');
        
        // Espera de segurança pelo Auto-Load
        cy.get('[data-cy="product-grid"]', { timeout: 8000 }).should('be.visible');
    });

    it('Deve carregar o catálogo completo automaticamente ao abrir a página (Auto-Seed & Auto-Load)', () => {
        // Prova definitiva de que o banco injetou os dados e o JS renderizou sem precisarmos de clicar em nada
        cy.get('[data-cy="product-card"]').should('have.length', 8);
    });

    it('Deve manter a consistência de estado do Frontend em buscas consecutivas', () => {
        // 1. Primeira Busca: RTX
        cy.get('#searchInput').type('RTX');
        cy.get('#searchButton').click();
        
        cy.get('[data-cy="product-card"]').should('have.length.at.least', 1);
        cy.get('[data-cy="product-card"]').first().should('contain', 'RTX');

        // 2. Segunda Busca (Limpar e buscar Ryzen)
        cy.get('#searchInput').clear().type('Ryzen');
        cy.get('#searchButton').click();
        
        cy.get('[data-cy="product-card"]').should('have.length.at.least', 1);
        cy.get('[data-cy="product-card"]').first().should('contain', 'Ryzen');
        // Regra de QA: O ecrã não pode conter lixo da busca anterior
        cy.get('[data-cy="product-grid"]').should('not.contain', 'RTX');

        // 3. Terceira Busca (Limpar e buscar Monitor)
        cy.get('#searchInput').clear().type('Monitor');
        cy.get('#searchButton').click();
        
        cy.get('[data-cy="product-card"]').should('have.length.at.least', 1);
        cy.get('[data-cy="product-card"]').first().should('contain', 'Monitor');
        cy.get('[data-cy="product-grid"]').should('not.contain', 'Ryzen');
    });
});