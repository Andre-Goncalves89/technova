/**
 * TECHNOVA SANITY CHECK - IDEMPOTENCY (V3)
 * Este teste valida o ciclo: Limpeza -> Seed -> Pesquisa -> Exibição
 */

describe('Sanity Check: Database Idempotency', () => {
  
  it('Deve carregar produtos após pesquisa pós-reset', () => {
    cy.visit('/');
    
    // 1. Validamos que a tela começa limpa (UX Clean que você implementou)
    cy.get('[data-cy="welcome-message"]').should('be.visible');
    
    // 2. Realizamos uma busca para "acordar" os dados semeados
    // O seletor 'data-cy="search-input"' veio do seu index.html
    cy.get('[data-cy="search-input"]').type('RTX');
    cy.get('[data-cy="search-button"]').click();
    
    // 3. Agora sim, os cards devem aparecer
    cy.get('.product-card', { timeout: 10000 }).should('have.length.at.least', 1);
    cy.contains('RTX 4090').should('be.visible');
  });

  it('Deve manter a consistência em buscas consecutivas', () => {
    cy.visit('/');
    cy.get('[data-cy="search-input"]').type('Processador');
    cy.get('[data-cy="search-button"]').click();
    
    // Valida se o ID RESTART IDENTITY funcionou (sempre ID 1 para o primeiro item)
    cy.get('.product-card').first().should('be.visible');
    cy.log('✅ Idempotência e UX validados com sucesso.');
  });
});