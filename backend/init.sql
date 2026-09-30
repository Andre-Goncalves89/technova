-- TECHNOVA DATABASE - SCHEMA V3.0 (EXPANDED CATALOG)
-- Objetivo: Popular o banco com um catálogo amplo e realista.

-- 1. LIMPEZA DE ESTRUTURAS EXISTENTES
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- 2. CRIAÇÃO DO TIPO ENUM PARA RBAC
CREATE TYPE user_role AS ENUM ('customer', 'admin');

-- 3. CRIAÇÃO DAS TABELAS
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    description_long TEXT,
    price DECIMAL(10, 2) NOT NULL,
    sku VARCHAR(50) UNIQUE,
    stock INT NOT NULL DEFAULT 0,
    image_url TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed de Utilizadores (RBAC)
INSERT INTO users (email, password_hash, role) VALUES
('admin@technova.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L65322E7e8e52q', 'admin'),
('customer@technova.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L65322E7e8e52q', 'customer');

-- Seed de Produtos Expandido (14 Itens com Metadados Completos)
INSERT INTO products (name, description, description_long, price, sku, stock, image_url, category) VALUES
(
    'Placa de Vídeo RTX 4090 Phantom',
    'O ápice do desempenho para entusiastas de 4K e Ray Tracing.',
    'Placa de vídeo com 24GB GDDR6X, arquitetura Ada Lovelace, suporte a DLSS 3 e iluminação ARGB customizável. Desempenho extremo para jogos e renderização 3D.',
    13499.00,
    'GPU-RTX4090-01',
    10,
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800',
    'GPU'
),
(
    'Placa de Vídeo RX 7900 XTX Nitro',
    'Arquitetura RDNA 3 para frames ultra velozes em 1440p.',
    'Placa de vídeo com 24GB GDDR6, tecnologia AMD FidelityFX, excelente refrigeração e design robusto para criadores e gamers.',
    7800.00,
    'GPU-RX7900XTX-02',
    15,
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=800',
    'GPU'
),
(
    'Placa de Vídeo RTX 4070 Ti Super',
    'Excelente custo-benefício para rodar tudo no ultra em 1440p.',
    '16GB GDDR6X, DLSS 3.5, Ray Tracing avançado e eficiência energética superior para sessões intensas de jogos.',
    5800.00,
    'GPU-RTX4070TIS-03',
    25,
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800',
    'GPU'
),
(
    'Placa de Vídeo RX 7800 XT',
    'Performance sólida para jogos competitivos com alta taxa de quadros.',
    '16GB GDDR6, arquitetura RDNA 3, ideal para resolução Quad HD e configurações no máximo.',
    4100.00,
    'GPU-RX7800XT-04',
    30,
    'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800',
    'GPU'
),
(
    'Processador Ryzen 9 7950X3D',
    'Tecnologia 3D V-Cache para o melhor desempenho em games.',
    '16 núcleos, 32 threads, 144MB de cache combinado. O processador definitivo para jogos e criação de conteúdo pesado.',
    4599.00,
    'CPU-R9-7950X3D-05',
    12,
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800',
    'CPU'
),
(
    'Processador Core i9-14900K',
    'Performance híbrida de 24 núcleos e frequência de até 6.0 GHz.',
    '24 núcleos (8P + 16E) e 32 threads. Velocidades incríveis para multitarefas extremas e altas taxas de FPS.',
    4100.00,
    'CPU-I9-14900K-06',
    18,
    'https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=800',
    'CPU'
),
(
    'Processador Ryzen 7 7800X3D',
    'O rei do custo-benefício para gamers hardcore.',
    '8 núcleos, 16 threads e 96MB de L3 3D V-Cache. O processador mais recomendado e eficiente para jogos.',
    2900.00,
    'CPU-R7-7800X3D-07',
    40,
    'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800',
    'CPU'
),
(
    'Processador Core i5-13600K',
    'Multitarefa eficiente com excelente desempenho térmico.',
    '14 núcleos (6P + 8E) e 20 threads. Equilíbrio perfeito entre preço, eficiência térmica e alto desempenho.',
    2100.00,
    'CPU-I5-13600K-08',
    50,
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800',
    'CPU'
),
(
    'Monitor Curvo 34" Ultrawide',
    'Imersão cinematográfica com taxa de atualização de 175Hz.',
    'Painel QD-OLED curvo (1800R), tempo de resposta de 0.1ms, resolução WQHD (3440x1440) e suporte a FreeSync Premium.',
    3990.00,
    'MON-34-UW-09',
    8,
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800',
    'Monitor'
),
(
    'Monitor 27" OLED 240Hz',
    'Pretos perfeitos e tempo de resposta de 0.03ms para eSports.',
    'Resolução QHD (2560x1440), painel OLED com contraste infinito, taxa de 240Hz e certificação VESA DisplayHDR True Black 400.',
    5200.00,
    'MON-27-OLED-10',
    14,
    'https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=800',
    'Monitor'
),
(
    'Cadeira Gamer TechNova Obsidian',
    'Ergonomia de ponta com acabamento em couro sintético premium.',
    'Ajuste 4D nos braços, suporte lombar magnético, reclinação até 165 graus e pistão classe 4 para máximo conforto.',
    2400.00,
    'CAD-OBSIDIAN-11',
    20,
    'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800',
    'Periféricos'
),
(
    'Teclado Mecânico RGB Pro',
    'Switches ópticos lineares para resposta instantânea em milissegundos.',
    'Layout ABNT2, keycaps em PBT double-shot, iluminação RGB por tecla e estrutura acústica com espuma de amortecimento.',
    850.00,
    'PER-KB-RGB-12',
    35,
    'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800',
    'Periféricos'
),
(
    'Mouse Wireless Ultra-Light',
    'Apenas 55g, sensor de 30K DPI e bateria para 80 horas.',
    'Design ambidestro leve de 55g, conexão sem fio 2.4GHz de baixíssima latência e feixes ópticos sem double click.',
    650.00,
    'PER-MS-UL-13',
    60,
    'https://placeholder.co/800x600/1a1a1a/4ade80?text=Mouse+Ultra-Light',
    'Periféricos'
),
(
    'SSD NVMe 2TB Gen5 HighSpeed',
    'Velocidades de leitura de até 12.000 MB/s para carregamento imediato.',
    'Interface PCIe 5.0 x4, dissipador de calor integrado em alumínio e durabilidade de 1400 TBW.',
    1890.00,
    'ARM-SSD-2TB-14',
    45,
    'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800',
    'Armazenamento'
);