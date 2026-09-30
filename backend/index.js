const express = require('express');
const promBundle = require('express-prom-bundle');
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

// Configuração do Middleware de Métricas
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: 'technova_api' },
  promClient: {
    collectDefaultMetrics: {}
  }
});

// Inicializa o coletor no Express
app.use(metricsMiddleware);

// --- CONFIGURAÇÃO DO SWAGGER (OPENAPI NATIVA EM JSON) ---
// Ao usar JSON em vez de comentários YAML, elimino 100% dos erros de formatação.
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
      },
      '/api/v1/products/{id}': {
        get: {
          summary: 'Retorna um produto específico pelo ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID do produto'
            }
          ],
          responses: {
            '200': { description: 'Produto encontrado com sucesso' },
            '400': { description: 'Parâmetro ID inválido ou formato incorreto' },
            '404': { description: 'Produto não encontrado' },
            '500': { description: 'Erro interno no servidor' }
          }
        },
        put: {
          summary: 'Atualiza todos os dados de um produto existente pelo ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID do produto que será atualizado'
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Placa de Vídeo RTX 4090 (Atualizada)' },
                    description: { type: 'string', example: 'Descrição atualizada com novos detalhes técnicos.' },
                    price: { type: 'number', example: 14500.00 },
                    image_url: { type: 'string', example: 'https://images.unsplash.com/photo-nova' },
                    category: { type: 'string', example: 'GPU' }
                  },
                  required: ['name', 'price', 'category']
                }
              }
            }
          },
          responses: {
            '200': { description: 'Produto atualizado com sucesso' },
            '400': { description: 'Dados incompletos ou inválidos' },
            '404': { description: 'Produto não encontrado' },
            '500': { description: 'Erro interno no servidor' }
          }
        },
        delete: {
          summary: 'Remove um produto do catálogo pelo ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'ID do produto que será removido'
            }
          ],
          responses: {
            '204': { description: 'Produto removido com sucesso (Sem conteúdo no retorno)' },
            '404': { description: 'Produto não encontrado' },
            '500': { description: 'Erro interno no servidor' }
          }
        }
      },
      '/api/v1/products': {
        get: {
          summary: 'Retorna a lista completa de cards de produtos',
          responses: {
            '200': { description: 'Lista de produtos retornada com sucesso' },
            '500': { description: 'Erro interno no servidor' }
          }
        },
        post: {
          summary: 'Cadastra um novo produto no catálogo',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Placa de Vídeo RTX 5090' },
                    description: { type: 'string', example: 'O ápice da nova geração' },
                    price: { type: 'number', example: 18999.00 },
                    image_url: { type: 'string', example: 'https://images.unsplash.com/...' },
                    category: { type: 'string', example: 'GPU' }
                  },
                  required: ['name', 'price', 'category']
                }
              }
            }
          },
          responses: {
            '201': { description: 'Produto criado com sucesso' },
            '400': { description: 'Dados incompletos ou inválidos' },
            '500': { description: 'Erro interno no servidor' }
          }
        }
      },
    }
  },
  apis: [], // Deixei vazio porque as rotas já estão definidas acima
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
    // Ajustado para buscar por 'email' com o usuário da seed
    const result = await pool.query('SELECT balance FROM users WHERE email = $1', ['customer@technova.com']);
    
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
    const query = (req.query.q || '').trim();

    // Trava de segurança: se o parâmetro "q" for vazio, recusa a requisição
    if (query.length === 0) {
        return res.status(400).json({ 
            error: "O parâmetro de busca 'q' é obrigatório." 
        });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE name ILIKE $1 OR category ILIKE $1 ORDER BY id ASC',
            [`%${query}%`]
        );

        res.json({ results: result.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/v1/products/:id', async (req, res) => {
    const { id } = req.params;

    // Trava de segurança: valida se o parâmetro ID é numérico e inteiro
    if (isNaN(id) || !/^\d+$/.test(id)) {
        return res.status(400).json({ 
            error: "O parâmetro ID deve ser um número inteiro válido." 
        });
    }

    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Retorna a lista completa de produtos
app.get('/api/v1/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/v1/products', async (req, res) => {
  const { name, description, price, image_url, category } = req.body;

  // Validação simples de campos obrigatórios
  if (!name || price === undefined || !category) {
    return res.status(400).json({ error: 'Campos obrigatórios: name, price e category.' });
  }

  try {
    const query = `
            INSERT INTO products (name, description, price, image_url, category) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
        `;
    const values = [name, description || '', price, image_url || '', category];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/v1/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, category } = req.body;

  // Validação dos campos obrigatórios
  if (!name || price === undefined || !category) {
    return res.status(400).json({ error: 'Campos obrigatórios: name, price e category.' });
  }

  try {
    const query = `
            UPDATE products 
            SET name = $1, description = $2, price = $3, image_url = $4, category = $5
            WHERE id = $6 
            RETURNING *;
        `;
    // O $6 representa o nosso ID na query
    const values = [name, description || '', price, image_url || '', category, id];

    const result = await pool.query(query, values);

    // Se a query rodou mas não retornou linhas, o ID não existe
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Produto não encontrado para atualização' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/v1/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);

    // Se a query retornou o item deletado, deu sucesso
    if (result.rows.length > 0) {
      res.status(204).send(); // 204 significa sucesso, mas sem corpo de resposta
    } else {
      res.status(404).json({ error: 'Produto não encontrado para exclusão' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 TechNova Backend V3.0 Online na porta ${PORT}`);
  console.log(`📖 Swagger Docs disponível em: http://localhost:${PORT}/api-docs`);
});