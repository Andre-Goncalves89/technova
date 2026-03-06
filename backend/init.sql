-- 1. Cria a tabela se ela não existir
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Limpando para garantir o seed do zero
TRUNCATE TABLE products RESTART IDENTITY;

INSERT INTO products (name, description, price, image_url) VALUES
-- GPUs (O que já temos + novos)
('Placa de Vídeo RTX 4090 ASUS ROG Strix', 'A placa mais poderosa para entusiastas de alta performance.', 12500.00, 'gpu_rtx4090.jpg'),
('Placa de Vídeo RTX 4070 Dual Fan', 'Equilíbrio perfeito entre preço e performance 4K.', 4500.00, 'gpu_rtx4070.jpg'),
('Placa de Vídeo RX 7900 XTX Radeon', 'A gigante da AMD com 24GB de VRAM.', 7800.00, 'gpu_rx7900.jpg'),

-- CPUs
('Processador AMD Ryzen 9 7950X', '16 núcleos e 32 threads para processamento extremo.', 4500.00, 'cpu_r9.jpg'),
('Processador Intel Core i9-14900K', 'O rei do single-core para jogos e produtividade.', 4800.00, 'cpu_i9.jpg'),
('Processador AMD Ryzen 7 7800X3D', 'O melhor processador para jogos do mundo.', 3200.00, 'cpu_r7_x3d.jpg'),

-- Memória e Armazenamento
('Memória RAM DDR5 Corsair Vengeance 32GB', 'Velocidade e estabilidade para sistemas de última geração.', 1200.00, 'ram_ddr5.jpg'),
('Memória RAM RGB G.Skill Trident 64GB', 'Estética premium com altíssima frequência.', 2500.00, 'ram_trident.jpg'),
('SSD NVMe Samsung 990 Pro 2TB', 'O armazenamento mais rápido do mercado.', 1800.00, 'ssd_990pro.jpg'),
('SSD Externo SanDisk Extreme 4TB', 'Velocidade de transferência portátil e resistente.', 3200.00, 'ssd_external.jpg'),

-- Periféricos (Fundamentais para testes de filtros)
('Teclado Mecânico Razer BlackWidow V4', 'Switches mecânicos táteis com iluminação RGB.', 1400.00, 'kbd_razer.jpg'),
('Mouse Gamer Logitech G Pro X Superlight', 'Ultra leve e usado pelos melhores pro-players.', 900.00, 'mouse_logitech.jpg'),
('Headset SteelSeries Arctis Nova Pro', 'Áudio de alta fidelidade com cancelamento de ruído.', 2200.00, 'headset_steelseries.jpg'),
('Microfone Shure SM7B', 'O padrão da indústria para streaming e podcasts.', 3500.00, 'mic_shure.jpg'),

-- Monitores e Laptops
('Monitor Alienware 34 Curved OLED', 'Imersão total com cores vibrantes e preto puro.', 8500.00, 'monitor_alienware.jpg'),
('Monitor LG UltraGear 27 240Hz', 'Competitivo e rápido para jogos de FPS.', 2800.00, 'monitor_lg.jpg'),
('Laptop Razer Blade 16', 'Poder de desktop em um corpo fino e elegante.', 25000.00, 'laptop_razer.jpg'),
('MacBook Pro M3 Max 16', 'A máquina definitiva para desenvolvedores e criadores.', 32000.00, 'macbook_m3.jpg'),

-- Acessórios
('Cadeira Gamer Secretlab TITAN Evo', 'Ergonomia de ponta para longas sessões.', 4200.00, 'chair_secretlab.jpg'),
('Webcam Logitech Brio 4K', 'Imagem cristalina para reuniões e stream.', 1100.00, 'webcam_brio.jpg');