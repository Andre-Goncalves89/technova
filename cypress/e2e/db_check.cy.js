/**
 * TECHNOVA SANITY CHECK - DB IDEMPOTENCY
 * Valida se o banco é limpo e semeado corretamente entre os testes.
 */

describe('Sanity Check: Database Idempotency', () => {
    
    beforeEach(() => {
        // TN-R05: Garante ambiente limpo chamando a task do Postgres
        cy.task('clearDatabase');
        cy.visit('/');
    });

    it('Deve carregar produtos após pesquisa pós-reset', () => {
        // Correção: Usando 'home-mask' em vez do antigo 'welcome-message'
        cy.get('[data-cy="home-mask"]').should('be.visible');

        // Realiza busca para validar se o Seed funcionou
        cy.get('[data-cy="search-input"]').type('RTX');
        cy.get('[data-cy="search-btn"]').click(); // Correção: Seletor correto é search-btn

        // Verifica se os cards aparecem (Prova que o banco não está vazio)
        cy.get('[data-cy="product-card"]').should('have.length.at.least', 1);
    });

    it('Deve manter a consistência em buscas consecutivas', () => {
        cy.get('[data-cy="search-input"]').type('Ryzen');
        cy.get('[data-cy="search-btn"]').click();
        cy.get('[data-cy="product-card"]').should('be.visible');

        // Nova busca limpa a anterior
        cy.get('[data-cy="search-input"]').clear().type('Monitor');
        cy.get('[data-cy="search-btn"]').click();
        cy.get('[data-cy="product-name"]').should('contain', 'Monitor');
    });
});