CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo os dados reais para o seu portfólio de QA
INSERT INTO products (name, description, price, image_url) VALUES
('Placa de Vídeo RTX 4090 ASUS ROG Strix', 'A placa mais poderosa para entusiastas de alta performance.', 12500.00, 'gpu_rtx4090.jpg'),
('Processador AMD Ryzen 9 7950X', '16 núcleos e 32 threads para processamento extremo.', 4500.00, 'cpu_r9.jpg'),
('Memória RAM DDR5 Corsair Vengeance 32GB', 'Velocidade e estabilidade para sistemas de última geração.', 1200.00, 'ram_ddr5.jpg'),
('SSD NVMe Samsung 990 Pro 2TB', 'O armazenamento mais rápido do mercado.', 1800.00, 'ssd_990pro.jpg');