import { CatalogoUI } from '../ui/CatalogoUI';

export class VerificarCarrinho {
    static itensNaBolsa(quantidade) {
        cy.get(CatalogoUI.BADGE_CARRINHO).should('have.text', quantidade);
    }
}