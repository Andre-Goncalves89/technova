-- TECHNOVA DATABASE - SCHEMA V3.0 (EXPANDED CATALOG)
-- Objetivo: Popular o banco com um catálogo amplo e realista.

DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    is_tester BOOLEAN DEFAULT TRUE
);

-- Seed de Produtos Expandido (14 Itens)
INSERT INTO products (name, description, price, image_url, category) VALUES
('Placa de Vídeo RTX 4090 Phantom', 'O ápice do desempenho para entusiastas de 4K e Ray Tracing.', 13499.00, 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800', 'GPU'),
('Placa de Vídeo RX 7900 XTX Nitro', 'Arquitetura RDNA 3 para frames ultra velozes em 1440p.', 7800.00, 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=800', 'GPU'),
('Placa de Vídeo RTX 4070 Ti Super', 'Excelente custo-benefício para rodar tudo no ultra em 1440p.', 5800.00, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800', 'GPU'),
('Placa de Vídeo RX 7800 XT', 'Performance sólida para jogos competitivos com alta taxa de quadros.', 4100.00, 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800', 'GPU'),
('Processador Ryzen 9 7950X3D', 'Tecnologia 3D V-Cache para o melhor desempenho em games.', 4599.00, 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800', 'CPU'),
('Processador Core i9-14900K', 'Performance híbrida de 24 núcleos e frequência de até 6.0 GHz.', 4100.00, 'https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=800', 'CPU'),
('Processador Ryzen 7 7800X3D', 'O rei do custo-benefício para gamers hardcore.', 2900.00, 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800', 'CPU'),
('Processador Core i5-13600K', 'Multitarefa eficiente com excelente desempenho térmico.', 2100.00, 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800', 'CPU'),
('Monitor Curvo 34" Ultrawide', 'Imersão cinematográfica com taxa de atualização de 175Hz.', 3990.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800', 'Monitor'),
('Monitor 27" OLED 240Hz', 'Pretos perfeitos e tempo de resposta de 0.03ms para eSports.', 5200.00, 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=800', 'Monitor'),
('Cadeira Gamer TechNova Obsidian', 'Ergonomia de ponta com acabamento em couro sintético premium.', 2400.00, 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800', 'Periféricos'),
('Teclado Mecânico RGB Pro', 'Switches ópticos lineares para resposta instantânea em milissegundos.', 850.00, 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800', 'Periféricos'),
('Mouse Wireless Ultra-Light', 'Apenas 55g, sensor de 30K DPI e bateria para 80 horas.', 650.00, 'https://placehold.co/800x600/1a1a1a/4ade80?text=Mouse+Ultra-Light', 'Periféricos'),
('SSD NVMe 2TB Gen5 HighSpeed', 'Velocidades de leitura de até 12.000 MB/s para carregamento imediato.', 1890.00, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800', 'Armazenamento');

INSERT INTO users (username, email, balance) VALUES
('tester_andre', 'andre@technova.lab', 10000.00);