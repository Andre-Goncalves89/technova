// ***********************************************************
// TECHNOVA SUPPORT FILE (E2E)
// Este arquivo é lido automaticamente antes dos seus arquivos de teste.
// ***********************************************************

// Importa comandos personalizados da pasta support
import './commands';

/**
 * HOOK DE IDEMPOTÊNCIA GLOBAL
 * Este bloco garante que a base de dados seja limpa 
 * AUTOMATICAMENTE antes de cada teste ('it').
 */
beforeEach(() => {
  // Chama a tarefa definida no cypress.config.js
  cy.task("clearDatabase");
});