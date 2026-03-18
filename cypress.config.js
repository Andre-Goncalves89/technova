const { defineConfig } = require("cypress");
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on("task", {
        async clearDatabase() {
          const client = new Client({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
          });

          try {
            await client.connect();
            
            // 1. LIMPEZA (Truncate)
            await client.query("TRUNCATE TABLE products RESTART IDENTITY CASCADE;");
            
            // 2. SEMEADURA (Seed) - Lendo o teu ficheiro init.sql
            const sqlPath = path.join(__dirname, 'backend', 'init.sql');
            const sql = fs.readFileSync(sqlPath, 'utf8');
            await client.query(sql);
            
            // MENSAGEM NOVA (Para saberes que esta versão está ativa)
            console.log("🚀 [SISTEMA] Banco TechNova: LIMPO e SEMEADO com sucesso!");
            return null;
          } catch (err) {
            console.error("❌ [ERRO] Falha na Task de Banco:", err);
            throw err;
          } finally {
            await client.end();
          }
        },
      });
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true
  },
});