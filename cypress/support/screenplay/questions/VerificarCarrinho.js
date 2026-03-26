import { CatalogoUI } from '../ui/CatalogoUI';

export class VerificarCarrinho {
    static quantidade(esperada) {
        // A Question abstrai a validação. Ela vai na UI, pega o Badge e compara.
        cy.get(CatalogoUI.BADGE_CARRINHO).should('have.text', esperada);
    }
}