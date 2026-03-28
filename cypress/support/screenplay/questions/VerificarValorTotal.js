import { CatalogoUI } from '../ui/CatalogoUI';

export class VerificarValorTotal {
    static noFormatoCorreto() {
        // A nossa Regex blindada
        const regexMoeda = /^R\$\s[\d.]+,[0-9]{2}$/;

        cy.get(CatalogoUI.WALLET_TOTAL)
          .invoke('text')
          .invoke('trim')
          .should('match', regexMoeda);
    }
}