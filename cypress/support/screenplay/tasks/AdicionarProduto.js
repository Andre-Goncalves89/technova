import { CatalogoUI } from '../ui/CatalogoUI';

export class AdicionarProduto {
    static chamado(nomeProduto, textoBotao) {
        // A Task abstrai os comandos do Cypress. O step definition não precisa saber os seletores!
        cy.contains(CatalogoUI.CARD_PRODUTO, nomeProduto)
          .find(CatalogoUI.BOTAO_COMPRAR)
          .contains(textoBotao)
          .click();
    }
}