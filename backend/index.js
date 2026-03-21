/**
 * TECHNOVA BACKEND - VERSÃO 2.7 (DOCKER + WALLET READY)
 * Objetivo: Servir produtos e saldo da carteira para o laboratório de QA.
 */

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do Pool de Conexão
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'technovapass',
    database: process.env.DB_NAME || 'admin',
});

app.use(cors());
app.use(express.json());

// Log de Requisições para Debug de QA
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// --- ENDPOINTS DA API ---

// 1. Busca de Produtos (TN-R02)
app.get('/api/v1/products/search', async (req, res) => {
    const { q } = req.query;
    try {
        const queryText = q 
            ? 'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1'
            : 'SELECT * FROM products';
        
        const values = q ? [`%${q}%`] : [];
        const result = await pool.query(queryText, values);
        
        res.json({
            count: result.rows.length,
            results: result.rows
        });
    } catch (err) {
        console.error('Erro na Busca:', err.message);
        res.status(500).json({ error: 'Erro interno no servidor de banco de dados.' });
    }
});

// 2. Rota de Carteira (TN-R04) - NOVO!
// Resolve o problema do saldo R$ 0,00
app.get('/api/v1/wallet', async (req, res) => {
    try {
        // Retornamos o saldo fixo de R$ 10.000,00 definido para o Day 49
        res.json({ balance: 10000.00 });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar saldo da carteira.' });
    }
});

// 3. Healthcheck
app.get('/api/v1/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'online', database: 'connected' });
    } catch (err) {
        res.status(500).json({ status: 'degraded', database: 'disconnected' });
    }
});

// Inicialização com binding 0.0.0.0 para Docker
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    🚀 TechNova Backend V2.7 Online!
    📡 Endpoint: http://localhost:${PORT}/api/v1
    🗄️ Database Host: ${process.env.DB_HOST || 'localhost'}
    💰 Wallet API: Ativa (R$ 10.000,00)
    `);
});