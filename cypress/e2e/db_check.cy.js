/**
 * TECHNOVA E2E - SANITY CHECK & DB IDEMPOTENCY (V3.1 DINÂMICO)
 * Objetivo: Validar o Auto-Load com asserções dinâmicas prontas para escala.
 */

describe('TechNova Lab - Sanity Check: Base de Dados Dinâmica', () => {
    
    beforeEach(() => {
        // TN-R05: Garante um ambiente imaculado chamando a task do Postgres
        cy.task('clearDatabase');
        cy.visit('/');
        
        // Espera de segurança pelo Auto-Load do grid
        cy.get('[data-cy="product-grid"]', { timeout: 8000 }).should('be.visible');
    });

    it('Deve carregar o catálogo automaticamente (Validação Escalável)', () => {
        // A INTELIGÊNCIA DE QA: O banco pode crescer. Exigimos apenas um catálogo rico (mínimo 10 itens).
        cy.get('[data-cy="product-card"]').should('have.length.at.least', 10);
    });

    it('Deve manter a consistência de estado em buscas por marcas concorrentes', () => {
        // 1. Busca por RTX (Nvidia)
        cy.get('#searchInput').type('RTX');
        cy.get('#searchButton').click();
        cy.get('[data-cy="product-card"]').should('have.length.at.least', 1);
        cy.get('[data-cy="product-grid"]').should('not.contain', 'RX 7900'); // Garante que AMD não vaza aqui

       // 2. Busca por RX (AMD) - Alterado para "RX 7" para passar na regra de 3 caracteres
        cy.get('#searchInput').clear().type('RX 7');
        cy.get('#searchButton').click();
        cy.get('[data-cy="product-card"]').should('have.length.at.least', 1);
        cy.get('[data-cy="product-grid"]').should('not.contain', 'RTX'); // Garante que Nvidia sumiu

        // 3. Busca por Core (Intel)
        cy.get('#searchInput').clear().type('Core');
        cy.get('#searchButton').click();
        cy.get('[data-cy="product-card"]').should('have.length.at.least', 2);
        cy.get('[data-cy="product-grid"]').should('not.contain', 'Ryzen'); // Garante isolamento de marca (AMD fora)
    });
});