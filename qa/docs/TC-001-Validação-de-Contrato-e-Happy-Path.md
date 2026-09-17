# TC-001: Validação de Contrato e Happy Path - GET /api/v1/products

## Metadados
- **ID**: `TC-001`
- **Feature**: Catálogo de Produtos (GPU/Hardware)
- **Endpoint**: `GET /api/v1/products`
- **Tipo**: Contrato / Funcional (API)
- **Severidade**: Blocker / Critical
- **Autor**: QA Engineering Squad

## Pré-condições
1. Ambiente de banco de dados (`technova_db`) populado com pelo menos 1 registro de GPU na tabela `products`.
2. Servidor backend ativo na porta `5000`.

## Massa de Dados de Exemplo (Esperado no Banco)
```sql
SELECT id, name, price, category FROM products WHERE category = 'GPU';
-- Deve retornar ao menos 1 linha válida.
```

## Passos de Execução
1. Enviar requisição `GET` para `${baseUrl}/api/v1/products`.
2. Inspecionar o código de status HTTP retornado.
3. Inspecionar o payload JSON de resposta.
4. Validar tipos de dados e obrigatoriedade de chaves do contrato.

## Critérios de Aceite (Assertions)
- **Status Code**: `200 OK`
- **Headers**: `Content-Type` contendo `application/json`
- **Schema / Estrutura**:
  - Resposta deve ser um `Array` não vazio (`length > 0`).
  - O primeiro item (`index 0`) deve possuir obrigatoriamente as chaves: `id`, `name`, `description`, `price`, `image_url`, `category`, `created_at`.
  - `category` deve ser estritamente igual a `"GPU"`.
  - `price` deve ser conversível para `number` (ex: string numérica validada ou float).

## Script Postman/Newman equivalente (`Tests` Tab)
```javascript
pm.test("[TC-001] Status 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("[TC-001] Contrato: Array não vazio de GPUs", function () {
    const data = pm.response.json();
    pm.expect(data).to.be.an('array').to.not.be.empty;
    
    const prod = data[0];
    pm.expect(prod).to.have.all.keys('id', 'name', 'description', 'price', 'image_url', 'category', 'created_at');
    pm.expect(prod.category).to.eq('GPU');
    pm.expect(Number(prod.price)).to.be.a('number');
});
```