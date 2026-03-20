const { defineConfig } = require("cypress");
const { Client } = require("pg");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      on("task", {
        async clearDatabase() {
          const client = new Client({
            host: process.env.DB_HOST || "localhost",
            port: parseInt(process.env.DB_PORT || "5432"),
            user: String(process.env.DB_USER || "admin"),
            password: String(process.env.DB_PASSWORD || "technovapass"),
            database: String(process.env.DB_NAME || "admin"),
          });

          try {
            await client.connect();
            
            // 1. Limpeza Total
            await client.query("TRUNCATE TABLE products RESTART IDENTITY CASCADE");

            // 2. Re-seeding de Hardware Premium (Garante que os testes encontrem os cards)
            const seedQuery = `
              INSERT INTO products (name, description, price, image_url, category) VALUES
              ('Placa de Vídeo RTX 4090 Phantom', 'O ápice do desempenho para entusiastas de 4K.', 13499.00, 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800', 'GPU'),
              ('Processador Ryzen 9 7950X3D', 'Tecnologia 3D V-Cache para gamers e criadores.', 4599.00, 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800', 'CPU'),
              ('Monitor Curvo 34 Ultrawide', 'Imersão cinematográfica com taxa de 175Hz.', 3990.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800', 'Monitor');
            `;
            await client.query(seedQuery);

            console.log("🚀 [SISTEMA] Banco TechNova: LIMPO e SEMEADO com sucesso!");
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