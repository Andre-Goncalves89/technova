# TC-002: Criação de Produto (Happy Path) - POST /api/v1/products

## Metadados
- **ID**: `TC-002`
- **Feature**: Catálogo de Produtos
- **Endpoint**: `POST /api/v1/products`
- **Tipo**: Funcional / Escrita (API)
- **Severidade**: High
- **Autor**: QA Engineering Squad

## Pré-condições
1. Token de autenticação/admin válido (se aplicável; assumindo rota aberta ou mock de headers de sessão, ajustar conforme spec do Swagger).
2. Conexão com banco ativa.

## Massa de Dados de Entrada (Payload `body/json`)
```json
{
  "name": "NVIDIA RTX 5080 Test Edition",
  "description": "Placa de vídeo de alta performance para testes de laboratório",
  "price": "6999.99",
  "image_url": "https://example.com/rtx5080.jpg",
  "category": "GPU"
}
```

## Passos de Execução
1. Enviar requisição `POST` para `${baseUrl}/api/v1/products` com o payload acima.
2. Capturar o `id` retornado no corpo da resposta (`response.id` ou `response.data.id`).
3. Executar query de validação cruzada no banco de dados relacional.

## Critérios de Aceite (Assertions)
- **Status Code**: `201 Created`
- **Schema Resposta**: Retorna o objeto criado com `id` gerado (número/UUID) e campos espelhados do request.
- **Validação de Banco (SQL Cross-Check)**:
  ```sql
  SELECT count(*) FROM products WHERE name = 'NVIDIA RTX 5080 Test Edition';
  -- Esperado: count = 1
  ```

## Script Postman/Newman equivalente (`Tests` Tab)
```javascript
pm.test("[TC-002] Status 201 Created", function () {
    pm.response.to.have.status(201);
});

pm.test("[TC-002] Retorna ID e espelha dados", function () {
    const res = pm.response.json();
    pm.expect(res).to.have.property('id');
    pm.expect(res.name).to.eq("NVIDIA RTX 5080 Test Edition");
    pm.environment.set("last_created_product_id", res.id);
});
```