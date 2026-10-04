# **🚀 TechNova E-commerce Lab (v1.1.0)**
---
### Bem-vindo ao **TechNova**, um laboratório de e-commerce de alta performance desenvolvido para simular cenários reais de Automação de Testes (QA). Este projeto integra uma stack moderna (Node.js, PostgreSQL, Docker) com uma suíte de testes robusta em Playwright & Postman. 

**Destaques do projeto:**
* Técnicas avançadas de **Quality Assurance (QA)**.
* Fluxos de **Integração Contínua**.
* Automação de testes **E2E com Playwright**.
* Automação de testes **API com Postman**.
---
## 🛠️ TECNOLOGIAS E FERRAMENTAS

* **Node.js**(LTS): `Node.js` com `Express` para orquestração da API.
* **Docker** **&** **Docker compose**: `PostgreSQL` rodando em ambiente containerizado (`Docker`).
---
## 📋 PRÉ-REQUISITOS

Antes de iniciar os testes no **TechNova**, certifique-se de ter instalado em sua máquina:

* **Node.js** (Versão `LTS` recomendada).
* **Docker** & **Docker Compose** (Necessário para subir o banco de dados `Postgres`).
---
## 🚀 COMO EXECUTAR O PROJETO

Siga os passos abaixo obrigatoriamente a partir da **raiz do projeto** (`/technova`):

```bash
git clone https://github.com/Andre-Goncalves89/technova.git
cd technova
```
## Executa estes comandos na raiz do projeto:
* Criação do ecosistema
```
npm run setup
```
* Ignição do Ecossistema
```
npm run dev
```
---
## 🧪 ESTRATÉGIA DE TESTES (QA)

O projeto **TechNova** adota o **Padrão Ouro** de automação, priorizando a estabilidade e a fácil manutenção da suíte de testes.

### 🛡️ Resiliência com `data-cy`
Para evitar que mudanças de layout, estilos CSS ou classes dinâmicas quebrem a automação, utilizamos **seletores exclusivos** em todos os elementos críticos:

> **Premissa:** "Se o ID muda ou o CSS altera, o `data-cy` permanece."

* **Vantagem:** Redução drástica de *flaky tests* (testes intermitentes).
* **Contrato:** Os seletores de automação são desacoplados da lógica de design, permitindo que o time de desenvolvimento evolua o visual sem impactar a qualidade.

## Execução de Testes E2E (Playwright):

--- 
 
```Comando: 
npx playwright test
```
### ✅ Cenários validados com sucesso (`Status: 200 / Passed`)

Abaixo estão os fluxos críticos que foram automatizados e validados pela suíte de testes do Cypress:

* 🟢 **Adição de item ao carrinho de compras**: Validação de adição de 1 item da página no grid de cards de produtos ao carrinho de compras.
* 🟢 **Controle de limite de caracteres**: Teste que controla o máximo de caracteres (100) permitido no campo de busca da aplicação.
* 🟢 **Demais testes caminho feliz e edge cases**: Todos os testes descritos estão em suas respectivas pastas /qa/playwright/docs/test-cases && /qa/postman/docs

> **Nota de QA:** Todos os testes foram executados no ambiente **WSL: Ubuntu** apontando para a porta `3000`.
---
## 🏛️ ESTRUTURA DE PASTAS

A organização do ecossistema **TechNova** foi planejada para garantir que a infraestrutura de backend, o código do cliente e a suíte de testes coexistam de forma independente e organizada:

```text
technova/
├── backend/          # API Node.js, rotas e Scripts de Seed (Postgres)
├── frontend/         # Código-fonte da interface do e-commerce
├── QA/               # Conteúdo das aplicações de teste via UI e API
  ├── playwright/     # pastas e arquivos arquitetados no modelo POM
  ├── posmtan/        # Arquivos de Collections e Environments da API
└── package.json      # Manifesto do projeto e atalhos de automação
```
---
### 👤 Autor

**André de Araújo Gonçalves**<br><br>🚀 QA Engineer & Junior JS Developer
<br>🎓 Estudante de Engenharia de Software<br>
🔵 LinkedIn: [andregoncalvesqa](https://www.linkedin.com/in/andregoncalvesqa/)
