import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { AdicionarProduto } from "../../support/screenplay/tasks/AdicionarProduto";
import { VerificarCarrinho } from "../../support/screenplay/questions/VerificarCarrinho";
import { VerificarValorTotal } from '../../support/screenplay/questions/VerificarValorTotal';

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
  VerificarCarrinho.itensNaBolsa(quantidade);
});

// 4. o wallet deve ser validado com o valor decrescido em formato "R$XX,XX"
Then("o valor total da carteira deve estar no formato de moeda brasileira", () => {
    VerificarValorTotal.noFormatoCorreto();
});