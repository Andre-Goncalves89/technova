import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// 1. O "Dado" (A nossa pré-condição)
Given("que eu acesso a pagina inicial do TechNova", () => {
  cy.visit("/"); 
});

// 2. O "Quando" (A nossa ação de clique)
When("eu clico no botao {string} do produto {string}", (textoBotao, nomeProduto) => {
  // Encontra o card do produto pelo nome e clica no botão com data-cy
  cy.contains('.product-card', nomeProduto) 
    .find('[data-cy="buy-btn"]') // Usando o seu seletor de QA!
    .contains(textoBotao)
    .click();
});

// 3. O "Então" (A nossa asserção/validação)
Then("o carrinho deve exibir {string} item adicionado", (quantidade) => {
  // Busca a bolinha do carrinho pelo data-cy e verifica a quantidade
  cy.get('[data-cy="cart-badge"]').should('have.text', quantidade); 
});