const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Configuração alinhada com o Docker (Verificamos no print 165814)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

// ROTA COM LOG DE ERRO REAL (Essencial para QA Lead)
app.get('/api/v1/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY name ASC');
    res.status(200).json({ count: result.rows.length, results: result.rows });
  } catch (err) {
    // ESTE LOG NO TERMINAL É A TUA LANTERNA:
    console.error("❌ ERRO DE CONEXÃO/QUERY:", err.message);
    
    res.status(500).json({ 
      error: "Erro ao carregar vitrine.",
      debug: err.message // Isto vai mostrar no browser se a tabela falta
    });
  }
});

// Rota de busca mantida conforme o padrão de tokens
app.get('/api/v1/products/search', async (req, res) => {
  const query = req.query.q;
  if (!query || query.trim().length < 3) {
    return res.status(400).json({ error: "Busca inválida (mínimo 3 caracteres)." });
  }

  try {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const conditions = terms.map((_, i) => `(name ILIKE $${i + 1} OR description ILIKE $${i + 1})`).join(' AND ');
    const values = terms.map(t => `%${t}%`);
    const sql = `SELECT * FROM products WHERE ${conditions} ORDER BY name ASC`;
    const result = await pool.query(sql, values);
    res.status(200).json({ count: result.rows.length, results: result.rows });
  } catch (err) {
    console.error("❌ ERRO NA BUSCA:", err.message);
    res.status(500).json({ error: "Erro interno no servidor TechNova." });
  }
});

app.listen(port, () => {
  console.log(`TechNova Backend Online em http://localhost:${port}`);
});