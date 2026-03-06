const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Importando o tradutor do banco
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Configuração da conexão com o Banco de Dados (PostgreSQL via Docker)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

// ROTA DE BUSCA (Fullstack: Frontend -> Backend -> Database)
app.get('/api/v1/products/search', async (req, res) => {
  const query = req.query.q;

  // 1. Validação de Comprimento (Mantida a segurança básica)
  if (!query || query.trim().length < 3 || query.length > 100) {
    return res.status(400).json({
      error: "Busca inválida (mínimo 3, máximo 100 caracteres)."
    });
  }

  try {
    // 2. TOKENIZAÇÃO: Transformamos "placa rtx" em ["placa", "rtx"]
    // Também removemos espaços extras com o .filter(Boolean)
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

    // 3. CONSTRUÇÃO DINÂMICA DA QUERY (Busca por múltiplas keywords)
    // Criamos um filtro onde CADA palavra deve existir no nome ou descrição
    const conditions = terms.map((_, index) =>
      `(name ILIKE $${index + 1} OR description ILIKE $${index + 1})`
    ).join(' AND ');

    const values = terms.map(term => `%${term}%`);

    const sql = `SELECT * FROM products WHERE ${conditions} ORDER BY name ASC`;

    const result = await pool.query(sql, values);

    if (result.rows.length === 0) {
      return res.status(200).json({
        message: "Ops! Não encontramos o hardware que você procura.",
        results: []
      });
    }

    res.status(200).json({
      count: result.rows.length,
      results: result.rows
    });

  } catch (err) {
    console.error("Erro ao conectar no banco:", err);
    res.status(500).json({ error: "Erro interno no servidor TechNova." });
  }
});

app.listen(port, () => {
  console.log(`TechNova Backend Online em http://localhost:${port}`);
});