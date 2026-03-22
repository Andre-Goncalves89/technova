const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Importações do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Banco de Dados
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'technovapass',
  database: process.env.DB_NAME || 'admin',
});

// --- CONFIGURAÇÃO DO SWAGGER (OPENAPI NATIVA EM JSON) ---
// Ao usar JSON em vez de comentários YAML, eliminamos 100% dos erros de formatação.
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TechNova API',
      version: '3.0.0',
      description: 'Documentação oficial da API do laboratório TechNova. Feita para testes de QA.',
      contact: {
        name: 'QA Lead (André Gonçalves)',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor Local (Docker)',
      },
    ],
    paths: {
      '/api/v1/health': {
        get: {
          summary: 'Verifica o estado da API',
          responses: {
            '200': { description: 'API online' }
          }
        }
      },
      '/api/v1/wallet': {
        get: {
          summary: 'Retorna o saldo da carteira do utilizador teste',
          responses: {
            '200': { description: 'Saldo retornado com sucesso' },
            '404': { description: 'Usuário não encontrado' },
            '500': { description: 'Erro interno no servidor' }
          }
        }
      },
      '/api/v1/products/search': {
        get: {
          summary: 'Pesquisa produtos no catálogo',
          parameters: [
            {
              in: 'query',
              name: 'q',
              schema: { type: 'string' },
              description: 'Termo de pesquisa (ex RTX)'
            }
          ],
          responses: {
            '200': { description: 'Lista de produtos encontrada' },
            '500': { description: 'Erro interno no servidor' }
          }
        }
      }
    }
  },
  apis: [], // Deixamos vazio porque as rotas já estão definidas acima
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// ----------------------------------------

// ROTAS DA API (Agora limpas, sem comentários gigantes)
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'TechNova Backend V3.0 Online!' });
});

app.get('/api/v1/wallet', async (req, res) => {
  try {
    const result = await pool.query('SELECT balance FROM users WHERE username = $1', ['tester_andre']);
    if (result.rows.length > 0) {
      res.json({ balance: parseFloat(result.rows[0].balance) });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/v1/products/search', async (req, res) => {
    const query = req.query.q || '';
    try {
        let result;
        if (query.length === 0) {
            result = await pool.query('SELECT * FROM products ORDER BY id ASC');
        } else {
            result = await pool.query(
                'SELECT * FROM products WHERE name ILIKE $1 OR category ILIKE $1 ORDER BY id ASC',
                [`%${query}%`]
            );
        }
        res.json({ results: result.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 TechNova Backend V3.0 Online na porta ${PORT}`);
  console.log(`📖 Swagger Docs disponível em: http://localhost:${PORT}/api-docs`);
});