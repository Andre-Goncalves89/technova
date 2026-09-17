# Roadmap de Maturidade de QA - TechNova

## Fase 1: Blindagem de Contrato e Regressão Base (Atual)
- [x] Mapear rotas críticas do Swagger (`GET /api/v1/products`)
- [ ] Documentar cenários de teste (Happy Path + Contrato JSON Schema)
- [ ] Estruturar Collection e Environment no Postman
- [ ] Executar primeira validação automatizada via Newman

## Fase 2: Expansão de Mutação e Massa de Dados (Próximo)
- [ ] Mapear rotas de escrita (`POST /api/v1/products`)
- [ ] Criar cenários de validação negativa (400 Bad Request, campos obrigatórios ausentes, tipos errados)
- [ ] Validar integridade relacional no PostgreSQL pós-mutation via queries de auditoria

## Fase 3: Shift-Left & CI/CD Pipeline
- [ ] Integrar Newman em pipeline (GitHub Actions / GitLab CI)
- [ ] Configurar block-merge caso o contrato de API quebre
- [ ] Transição planejada de contrato REST para validação de schema OpenAPI/Swagger automatizada