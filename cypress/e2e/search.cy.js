describe('Busca por produtos', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Deve buscar por palavras chave fora de ordem(ex: RTX placa)', () => {
        // Digita os termos e clica na lupa usando os seletores data-cy
        cy.get('[data-cy="search-input"]').type('RTX placa')
        cy.get('[data-cy="search-button"]').click()

        // Valida se o card do produto está visível e contém o termo esperado
        cy.get('[data-cy="product-card"]').should('be.visible')
        cy.get('[data-cy="product-name"]').should('contain', 'RTX')
    })

    it('Deve validar que a busca com acentuação funciona', () => {
        // Testa a correção do Bug #8 sobre acentuação gráfica
        cy.get('[data-cy="search-input"]').type('Vídeo')
        cy.get('[data-cy="search-button"]').click()

        // Garante que não há erro e que ao menos um produto foi retornado
        cy.get('[data-cy="error-message"]').should('not.exist')
        cy.get('[data-cy="product-card"]').should('have.length.at.least', 1)
    })

    it('Deve validar a mudança de cor do contador de caracteres (Regressão)', () => {
    // Simula a digitação de 95 caracteres para atingir o estado de "warning"
    const longText = 'A'.repeat(95);
    cy.get('[data-cy="search-input"]').type(longText);
    
    // Valida se a classe CSS 'warning' foi aplicada e o texto do contador está correto
    cy.get('[data-cy="search-input"]').should('have.class', 'warning');
    cy.get('[data-cy="char-counter"]').should('contain', '95/100');
  });

  it('Deve garantir que a busca vazia não dispare erros ou resultados', () => {
    // Clica no botão de busca sem digitar nada
    cy.get('[data-cy="search-button"]').click()

   // Valida que o grid de produtos continua vazio (sem cards)
    // E que nenhuma mensagem de erro "falsa" aparece
    cy.get('[data-cy="product-card"]').should('not.exist')
    cy.get('[data-cy="error-message"]').should('not.exist')
  })

});