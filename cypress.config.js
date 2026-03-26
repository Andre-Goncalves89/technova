const { defineConfig } = require("cypress");
const { Client } = require("pg"); // Mantido: Sua conexão com o banco!

// Motores do Cucumber que acabamos de instalar
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    specPattern: "cypress/e2e/**/*.feature", // Avisa o Cypress para caçar os arquivos Gherkin
    
    // Transformamos em async para suportar o carregamento do Cucumber
    async setupNodeEvents(on, config) {
      
      // 1. Inicializa o plugin do Cucumber
      await preprocessor.addCucumberPreprocessorPlugin(on, config);

      // 2. Configura o esbuild para traduzir o .feature para JavaScript
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );

      // 3. A SUA TASK INTACTA: Limpeza e Seed do Banco de Dados
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
            
            // Limpeza Segura
            await client.query("TRUNCATE TABLE products RESTART IDENTITY CASCADE");
            await client.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

            // Seed Expandido Sincronizado (14 itens)
            const seedQuery = `
              INSERT INTO products (name, description, price, image_url, category) VALUES
              ('Placa de Vídeo RTX 4090 Phantom', 'O ápice do desempenho para entusiastas de 4K e Ray Tracing.', 13499.00, 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800', 'GPU'),
              ('Placa de Vídeo RX 7900 XTX Nitro', 'Arquitetura RDNA 3 para frames ultra velozes em 1440p.', 7800.00, 'https://images.unsplash.com/photo-1591448372819-0c124594348b?q=80&w=800', 'GPU'),
              ('Placa de Vídeo RTX 4070 Ti Super', 'Excelente custo-benefício para rodar tudo no ultra em 1440p.', 5800.00, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800', 'GPU'),
              ('Placa de Vídeo RX 7800 XT', 'Performance sólida para jogos competitivos com alta taxa de quadros.', 4100.00, 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800', 'GPU'),
              ('Processador Ryzen 9 7950X3D', 'Tecnologia 3D V-Cache para o melhor desempenho em games.', 4599.00, 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800', 'CPU'),
              ('Processador Core i9-14900K', 'Performance híbrida de 24 núcleos e frequência de até 6.0 GHz.', 4100.00, 'https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=800', 'CPU'),
              ('Processador Ryzen 7 7800X3D', 'O rei do custo-benefício para gamers hardcore.', 2900.00, 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800', 'CPU'),
              ('Processador Core i5-13600K', 'Multitarefa eficiente com excelente desempenho térmico.', 2100.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800', 'CPU'),
              ('Monitor Curvo 34" Ultrawide', 'Imersão cinematográfica com taxa de atualização de 175Hz.', 3990.00, 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=800', 'Monitor'),
              ('Monitor 27" OLED 240Hz', 'Pretos perfeitos e tempo de resposta de 0.03ms para eSports.', 5200.00, 'https://images.unsplash.com/photo-1598550476439-6847785fce6c?q=80&w=800', 'Monitor'),
              ('Cadeira Gamer TechNova Obsidian', 'Ergonomia de ponta com acabamento em couro sintético premium.', 2400.00, 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800', 'Periféricos'),
              ('Teclado Mecânico RGB Pro', 'Switches ópticos lineares para resposta instantânea em milissegundos.', 850.00, 'https://images.unsplash.com/photo-1527814050087-379381547969?q=80&w=800', 'Periféricos'),
              ('Mouse Wireless Ultra-Light', 'Apenas 55g, sensor de 30K DPI e bateria para 80 horas.', 650.00, 'https://images.unsplash.com/photo-1597872200370-499de466a90c?q=80&w=800', 'Periféricos'),
              ('SSD NVMe 2TB Gen5 HighSpeed', 'Velocidades de leitura de até 12.000 MB/s para carregamento imediato.', 1890.00, 'https://images.unsplash.com/photo-1597872200370-499de466a90c?q=80&w=800', 'Armazenamento');

              INSERT INTO users (username, email, balance) VALUES
              ('tester_andre', 'andre@technova.lab', 10000.00);
            `;
            await client.query(seedQuery);
            
            console.log("🚀 [QA SISTEMA] Banco Semeado com Catálogo Expandido (14 Itens)!");
            return null;
          } catch (err) {
            console.error("🔥 [ERRO] Falha na Task:", err.message);
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