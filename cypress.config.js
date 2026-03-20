const { defineConfig } = require("cypress");
const { Client } = require("pg");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // Implementação da Task de Banco de Dados (Reforçada para CI)
      on("task", {
        async clearDatabase() {
          // QA Note: Garantimos que os valores sejam sempre strings para evitar erro SASL
          const client = new Client({
            host: process.env.DB_HOST || "localhost",
            port: parseInt(process.env.DB_PORT || "5432"),
            user: String(process.env.DB_USER || "admin"),
            password: String(process.env.DB_PASSWORD || "technovapass"),
            database: String(process.env.DB_NAME || "admin"),
          });

          try {
            await client.connect();
            // Limpa as tabelas antes de cada teste para garantir idempotência
            await client.query("TRUNCATE TABLE products RESTART IDENTITY CASCADE");
            return null;
          } catch (err) {
            console.error("[ERRO] Falha na Task de Banco:", err.message);
            throw err;
          } finally {
            await client.end();
          }
        },
      });

      return config;
    },
  },
});