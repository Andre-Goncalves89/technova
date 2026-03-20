-- TECHNOVA DATABASE - SCHEMA V2.2 (PREMIUM ASSETS)
-- Objetivo: Popular o banco com hardware real e imagens de alta fidelidade.

-- 1. Limpeza e Reconstrução
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    is_tester BOOLEAN DEFAULT TRUE
);

TRUNCATE TABLE products RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- 2. Seed de Produtos com Imagens Reais (Hardware Lab)
INSERT INTO products (name, description, price, image_url, category) VALUES
-- GPUs
('Placa de Vídeo RTX 4090 Phantom', 'O ápice do desempenho para entusiastas de 4K.', 13499.00, 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800', 'GPU'),
('Placa de Vídeo RX 7900 XTX Nitro', 'Arquitetura RDNA 3 para frames ultra velozes.', 7800.00, 'https://images.unsplash.com/photo-1587202377465-320c85024443?auto=format&fit=crop&q=80&w=800', 'GPU'),

-- Processadores
('Processador Ryzen 9 7950X3D', 'Tecnologia 3D V-Cache para gamers e criadores.', 4599.00, 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800', 'CPU'),
('Processador Core i9-14900K', 'Performance híbrida de 24 núcleos e 6.0 GHz.', 4100.00, 'https://images.unsplash.com/photo-1555617766-c94804975da3?auto=format&fit=crop&q=80&w=800', 'CPU'),

-- Periféricos & Outros
('Cadeira Gamer TechNova Obsidian', 'Ergonomia de ponta com acabamento em couro sintético.', 2400.00, 'https://images.unsplash.com/photo-1598550476439-6847785fce6a?auto=format&fit=crop&q=80&w=800', 'Cadeira'),
('Teclado Mecânico RGB Pro', 'Switches ópticos lineares para resposta instantânea.', 850.00, 'https://images.unsplash.com/photo-1618384881928-1589f29ee2ad?auto=format&fit=crop&q=80&w=800', 'Teclado'),
('Monitor Curvo 34" Ultrawide', 'Imersão cinematográfica com taxa de 175Hz.', 3990.00, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800', 'Monitor'),

-- Produto sem imagem para manter teste de Placeholder
('SSD NVMe 2TB Gen5 HighSpeed', 'Velocidades de leitura até 12.000 MB/s.', 1890.00, '', 'Armazenamento');

-- 3. Seed de Usuário Tester com Saldo Fake
INSERT INTO users (username, email, balance) VALUES
('tester_andre', 'andre@technova.lab', 10000.00);