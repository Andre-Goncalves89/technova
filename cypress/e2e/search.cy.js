/**
 * TECHNOVA E2E - SEARCH & UI VALIDATION (V3.0 DOCKER)
 * Objetivo: Validar as regras de negócio do campo de busca e a renderização dos cards.
 */

describe('TechNova Lab - Busca e Validação de UI (Docker)', () => {
    
    beforeEach(() => {
        // TN-R05: Limpar o banco antes de cada teste garante idempotência
        cy.task('clearDatabase');
        cy.visit('/');
        
        // Espera de segurança: garante que o Auto-Load do Frontend já terminou de buscar no Backend
        cy.get('[data-cy="product-grid"]').should('be.visible');
    });

    it('Deve exibir o Saldo Inicial de R$ 10.000,00 corretamente', () => {
        // Validamos o id exato do HTML: balanceValue
        cy.get('#balanceValue')
            .should('be.visible')
            .and('contain', 'R$ 10.000,00');
    });

    it('Deve validar a Regra de Negócio de Busca (Aviso de < 3 caracteres)', () => {
        cy.get('#searchInput').type('RT');
        cy.get('#searchButton').click(); // Usando o ID corrigido ontem

        // O erro deve aparecer
        cy.get('#searchNotification')
            .should('be.visible')
            .and('contain', 'A busca requer no mínimo 3 caracteres.');
    });

    it('Deve realizar uma busca com sucesso e renderizar os cards premium', () => {
        // Buscamos um termo que sabemos que existe no init.sql (RTX)
        cy.get('#searchInput').type('RTX');
        cy.get('#searchButton').click();

        // Verifica se os cards apareceram (Pelo menos 1 card da RTX)
        cy.get('[data-cy="product-card"]').should('have.length.at.least', 1);

        // Valida se o card respeita a estrutura de design (Nome, Preço e Botão de Comprar)
        cy.get('[data-cy="product-card"]').first().within(() => {
            cy.get('h3').should('be.visible').and('not.be.empty'); // Valida título do produto
            cy.contains('R$').should('be.visible'); // Valida se o preço tem formatação monetária
            cy.get('button.buy-button').should('be.visible').and('contain', 'Comprar');
        });
    });

    it('Deve validar o contador de caracteres e seus limites de UI (Warning/Error)', () => {
        // 1. Digitação normal
        cy.get('#searchInput').type('Mouse');
        cy.get('#charCounter').should('contain', '5/100');

        // 2. Limite de Aviso (90 caracteres)
        const warningString = 'a'.repeat(90);
        cy.get('#searchInput').clear().type(warningString, { delay: 0 }); // delay: 0 para digitar rápido
        cy.get('#charCounter').should('contain', '90/100');
        // Validar a cor amarela/laranja do warning (rgb(210, 153, 34) equivale ao #d29922 do CSS)
        cy.get('#searchInput').should('have.css', 'border-color', 'rgb(210, 153, 34)');

        // 3. Limite de Erro (100 caracteres)
        const errorString = 'e'.repeat(10);
        cy.get('#searchInput').type(errorString, { delay: 0 });
        cy.get('#charCounter').should('contain', '100/100');
        // Validar a cor vermelha do erro (rgb(248, 81, 73) equivale ao #f85149 do CSS)
        cy.get('#searchInput').should('have.css', 'border-color', 'rgb(248, 81, 73)');
    });
});