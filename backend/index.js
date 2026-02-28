const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Importando o tradutor do banco
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Configuração da conexão com o Banco de Dados
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

// ROTA DE BUSCA ATUALIZADA COM VALIDAÇÃO ALFANUMÉRICA
app.get('/api/v1/products/search', async (req, res) => {
  const query = req.query.q;

 // 1. Validação de Comprimento: Focada estritamente no tamanho
  if (!query || query.trim().length < 3 || query.length > 100) {
    return res.status(400).json({ 
        error: "Busca inválida (mínimo 3, máximo 100 caracteres)." 
    });
  }

  // 2. Validação de Conteúdo: Só chega aqui se o tamanho estiver OK
  const alphanumericRegex = /^[a-zA-Z0-9 ]+$/;
  if (!alphanumericRegex.test(query)) {
    return res.status(400).json({ 
        error: "Caracteres inválidos detectados.",
        suggestion: "Apenas letras e números são habilitados nesse campo." 
    });
  }

  try {
    // ... restante do código de busca no banco ...
  } catch (err) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

app.listen(port, () => {
  console.log(`TechNova Backend Online em http://localhost:${port}`);
});