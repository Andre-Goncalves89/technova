const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false, // Mantendo sua trava de segurança profissional

  e2e: {
    baseUrl: 'http://localhost:3000', // Porta confirmada pelo npx serve
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});