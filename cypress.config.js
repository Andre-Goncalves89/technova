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
            await client.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

            // 2. Re-seeding Completo (Os 8 produtos para o teste passar)
            const seedQuery = `
              INSERT INTO products (name, description, price, image_url, category) VALUES
              ('Placa de Vídeo RTX 4090 Phantom', 'O ápice do desempenho para entusiastas de 4K e Ray Tracing.', 13499.00, 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800', 'GPU'),
              ('Placa de Vídeo RX 7900 XTX Nitro', 'Arquitetura RDNA 3 para frames ultra velozes em 1440p.', 7800.00, 'https://images.unsplash.com/photo-1591448372819-0c124594348b?q=80&w=800', 'GPU'),
              ('Processador Ryzen 9 7950X3D', 'Tecnologia 3D V-Cache para o melhor desempenho em games.', 4599.00, 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800', 'CPU'),
              ('Processador Core i9-14900K', 'Performance híbrida de 24 núcleos e frequência de até 6.0 GHz.', 4100.00, 'https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=800', 'CPU'),
              ('Monitor Curvo 34" Ultrawide', 'Imersão cinematográfica com taxa de atualização de 175Hz.', 3990.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800', 'Monitor'),
              ('Cadeira Gamer TechNova Obsidian', 'Ergonomia de ponta com acabamento em couro sintético premium.', 2400.00, 'https://images.unsplash.com/photo-1598550476439-6847785fce6c?q=80&w=800', 'Periféricos'),
              ('Teclado Mecânico RGB Pro', 'Switches ópticos lineares para resposta instantânea em milissegundos.', 850.00, 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800', 'Periféricos'),
              ('SSD NVMe 2TB Gen5 HighSpeed', 'Velocidades de leitura de até 12.000 MB/s para carregamento imediato.', 1890.00, 'https://images.unsplash.com/photo-1597872200370-499de466a90c?q=80&w=800', 'Armazenamento');

              INSERT INTO users (username, email, balance) VALUES
              ('tester_andre', 'andre@technova.lab', 10000.00);
            `;
            
            await client.query(seedQuery);

            console.log("🚀 [SISTEMA] Banco TechNova: LIMPO e SEMEADO com os 8 produtos completos!");
            return null;
          } catch (err) {
            console.error("🔥 [ERRO] Falha na Task de Banco:", err.message);
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