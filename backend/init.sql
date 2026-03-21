-- TECHNOVA DATABASE - SCHEMA V2.7 (PREMIUM ASSETS)
-- Objetivo: Popular o banco com hardware real e preparar o usuário tester.

-- 1. Limpeza de Segurança (Garante um ambiente 100% limpo a cada reset)
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 2. Criação da Tabela de Produtos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Criação da Tabela de Usuários (Base para o sistema de Login/Wallet)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    is_tester BOOLEAN DEFAULT TRUE
);

-- 4. Seed de Produtos (Hardware de Alta Performance - Links Diretos de Imagem)
INSERT INTO products (name, description, price, image_url, category) VALUES
('Placa de Vídeo RTX 4090 Phantom', 'O ápice do desempenho para entusiastas de 4K e Ray Tracing.', 13499.00, 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800', 'GPU'),
('Placa de Vídeo RX 7900 XTX Nitro', 'Arquitetura RDNA 3 para frames ultra velozes em 1440p.', 7800.00, 'https://images.unsplash.com/photo-1591448372819-0c124594348b?q=80&w=800', 'GPU'),
('Processador Ryzen 9 7950X3D', 'Tecnologia 3D V-Cache para o melhor desempenho em games.', 4599.00, 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800', 'CPU'),
('Processador Core i9-14900K', 'Performance híbrida de 24 núcleos e frequência de até 6.0 GHz.', 4100.00, 'https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=800', 'CPU'),
('Monitor Curvo 34" Ultrawide', 'Imersão cinematográfica com taxa de atualização de 175Hz.', 3990.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800', 'Monitor'),
('Cadeira Gamer TechNova Obsidian', 'Ergonomia de ponta com acabamento em couro sintético premium.', 2400.00, 'https://images.unsplash.com/photo-1598550476439-6847785fce6c?q=80&w=800', 'Periféricos'),
('Teclado Mecânico RGB Pro', 'Switches ópticos lineares para resposta instantânea em milissegundos.', 850.00, 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800', 'Periféricos'),
('SSD NVMe 2TB Gen5 HighSpeed', 'Velocidades de leitura de até 12.000 MB/s para carregamento imediato.', 1890.00, 'https://images.unsplash.com/photo-1597872200370-499de466a90c?q=80&w=800', 'Armazenamento');

-- 5. Seed de Usuário Tester com Saldo de R$ 10.000,00
INSERT INTO users (username, email, balance) VALUES
('tester_andre', 'andre@technova.lab', 10000.00);
```