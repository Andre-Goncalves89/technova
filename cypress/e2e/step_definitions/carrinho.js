import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { AdicionarProduto } from "../../support/screenplay/tasks/AdicionarProduto";
import { VerificarCarrinho } from "../../support/screenplay/questions/VerificarCarrinho";

// 1. O "Dado" (A nossa pré-condição continua igual por enquanto)
Given("que eu acesso a pagina inicial do TechNova", () => {
  cy.visit("/"); 
});

// 2. O "Quando" (O Step agora apenas chama a TASK)
When("eu clico no botao {string} do produto {string}", (textoBotao, nomeProduto) => {
  AdicionarProduto.chamado(nomeProduto, textoBotao);
});

// 3. O "Então" (O Step agora apenas faz a QUESTION)
Then("o carrinho deve exibir {string} item adicionado", (quantidade) => {
  VerificarCarrinho.quantidade(quantidade);
});