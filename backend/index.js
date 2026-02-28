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

  // Log para Debug: Mostra no terminal o que está chegando
  console.log(`Recebi a busca: "${query}" | Tamanho: ${query ? query.length : 0}`);

  // 1. Validação de Comprimento
  if (!query || query.trim().length < 3 || query.length > 100) {
    return res.status(400).json({ 
        error: "Busca inválida (mínimo 3, máximo 100 caracteres)." 
    });
  }

  // 2. Validação de Conteúdo (Alfanumérico)
  // Permite letras, números e espaços (para "RTX 4090", por exemplo)
  const alphanumericRegex = /^[a-zA-Z0-9 ]+$/;
  if (!alphanumericRegex.test(query)) {
    return res.status(400).json({ 
        error: "Caracteres inválidos detectados.",
        suggestion: "Apenas letras e números são habilitados nesse campo." 
    });
  }

  try {
    // 3. A Lógica Real de Busca no Banco de Dados
    const result = await pool.query(
      "SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1",
      [`%${query}%`]
    );

    // Se não achar nada, retorna lista vazia mas com sucesso (200)
    if (result.rows.length === 0) {
      return res.status(200).json({ 
        message: "Ops! Não encontramos o hardware que você procura", 
        results: [] 
      });
    }

    // Se achar, retorna os produtos
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