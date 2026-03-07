/**
 * TechNova - Suite de Testes E2E (Day 36)
 * Alinhado com a Massa de Dados do init.sql oficial
 */

describe('Busca por produtos', () => {
  beforeEach(() => {
    // Garantimos que o ambiente está limpo antes de cada teste
    cy.visit('http://localhost:3000');
  });

  it('Deve exibir mensagem de boas-vindas ao carregar', () => {
    cy.get('[data-cy="welcome-message"]').should('be.visible');
    cy.get('[data-cy="product-card"]').should('not.exist');
  });

  it('Deve buscar por palavras chave fora de ordem (ex: RTX placa)', () => {
    // Usamos termos que SABEMOS que existem no init.sql (RTX 4090)
    cy.get('#searchInput').type('RTX placa');
    cy.get('#searchButton').click();

    // Validação de presença
    cy.get('[data-cy="product-card"]', { timeout: 10000 }).should('have.length.at.least', 1);
    cy.get('[data-cy="product-name"]').first().should('contain.text', 'Placa de Vídeo');
  });

  it('Deve validar que a busca com acentuação funciona', () => {
    // "Monitor" ou "Memória" são alvos seguros
    cy.get('#searchInput').type('Memória');
    cy.get('#searchButton').click();

    cy.get('[data-cy="product-card"]').should('be.visible');
    cy.get('.error-msg').should('not.exist');
  });

  it('Deve garantir que a busca vazia ou curta dispare aviso', () => {
    cy.get('#searchInput').type('ab'); // Apenas 2 chars
    cy.get('#searchButton').click();

    cy.get('[data-cy="search-guidance"]').should('be.visible');
  });
});