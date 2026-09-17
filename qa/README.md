# TechNova QA & API Contract Test Suite

Repositório central de qualidade, rastreabilidade de requisitos, especificação de cenários de teste e automação de contratos de API (REST/Postman/Newman) para o ecossistema e-commerce **TechNova**.

## 📁 Estrutura de Diretórios
```text
qa/
├── README.md
├── ROADMAP.md
├── docs/
│   ├── TC-001-get-products-contract.md
│   └── TC-002-post-products-creation.md
└── postman/
    ├── technova.collection.json
    └── technova.environment.json
```

## 🛠️ Stack de Qualidade
- **Contrato / Funcional**: Postman + JavaScript (Chai/Ajv/tv4 or nativo)
- **CI/CD Execution**: Newman CLI (`npx newman run ...`)
- **Alvo**: API REST (`http://localhost:5000/api/v1`)
- **Banco de Dados de Validação**: PostgreSQL via Docker Compose (`technova_db`)

## 🚀 Como Executar a Suíte via CLI
1. Certifique-se de que a stack está UP (`docker compose up -d` ou via script orquestrador do projeto).
2. Execute o Newman:
   ```bash
   npx newman run postman/technova.collection.json -e postman/technova.environment.json --reporters cli,json --reporter-json-export reports/newman-report.json
   ```