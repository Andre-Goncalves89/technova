# **🚀 TECHNOVA - PREMIUM ELECTRONICS LAB**
---
O **TechNova** é um laboratório de e-commerce focado em simular cenários reais de desenvolvimento. 

**Destaques do projeto:**
* Técnicas avançadas de **Quality Assurance (QA)**.
* Fluxos de **Integração Contínua**.
* Automação de testes **E2E com Cypress**.
---
## 🛠️ TECNOLOGIAS E FERRAMENTAS

* **Backend**: `Node.js` com `Express` para orquestração da API.
* **Banco de Dados**: `PostgreSQL` rodando em ambiente containerizado (`Docker`).
* **Frontend**: Interface Vanilla (`HTML5`, `CSS3`, `JS`) com foco em seletores de teste.
* **Testes Automatizados**: `Cypress v15.11.0` para validação de fluxos críticos.
* **Infraestrutura**: Servidor de arquivos estáticos via `serve` no ambiente `WSL: Ubuntu`.
---
## 📋 PRÉ-REQUISITOS

Antes de iniciar os testes no **TechNova**, certifique-se de ter instalado em sua máquina:

* **Node.js** (Versão `LTS` recomendada).
* **Docker** & **Docker Compose** (Necessário para subir o banco de dados `Postgres`).
* **NPM** (Gerenciador de pacotes, geralmente instalado com o Node).

## 🚀 COMO EXECUTAR O PROJETO

Siga os passos abaixo obrigatoriamente a partir da **raiz do projeto** (`/technova`):

```bash
git clone https://github.com/Andre-Goncalves89/technova.git
cd technova
```
### Crie o arquivo de ambiente na pasta backend baseado no exemplo, e certifique-se de alterar o password e checar o user para que estejam iguais ao DB
```
cp .env.example .env
```
### 📦 Passo 1: Instalação de Dependências

Este comando é responsável por baixar todas as bibliotecas do projeto, incluindo o motor do **Cypress** e ferramentas de servidor estático:

```bash
npm install
```
### 🐳 Passo 2: Infraestrutura de Banco de Dados
```Comando: 
docker-compose up -d
```
### ⚙️ Passo 3: Inicialização dos Serviços
- Backend
```
npm run backend
```

- Frontend
```
npm run frontend
```

## 🧪 ESTRATÉGIA DE TESTES (QA)

O projeto **TechNova** adota o **Padrão Ouro** de automação, priorizando a estabilidade e a fácil manutenção da suíte de testes.

### 🛡️ Resiliência com `data-cy`
Para evitar que mudanças de layout, estilos CSS ou classes dinâmicas quebrem a automação, utilizamos **seletores exclusivos** em todos os elementos críticos:

> **Premissa:** "Se o ID muda ou o CSS altera, o `data-cy` permanece."

* **Vantagem:** Redução drástica de *flaky tests* (testes intermitentes).
* **Contrato:** Os seletores de automação são desacoplados da lógica de design, permitindo que o time de desenvolvimento evolua o visual sem impactar a qualidade.

```bash
# Exemplo de seletor resiliente no Cypress
cy.get('[data-cy="search-button"]').click()
```
---
## Execução de Testes E2E (Cypress):


```Comando: 
npm run test
```
### ✅ Cenários validados com sucesso (`Status: 200 / Passed`)

Abaixo estão os fluxos críticos que foram automatizados e validados pela suíte de testes do Cypress:

* 🟢 **Busca Multitoken**: Validação da inteligência de busca ao pesquisar por palavras-chave fora de ordem (ex: pesquisar por `RTX placa` deve retornar resultados de placas RTX).
* 🟢 **Acentuação Gráfica**: Teste de integridade de caracteres especiais e suporte a acentos para garantir a correção do **Bug #8** (ex: busca por `Vídeo` funcionando corretamente).
* 🟢 **Regressão de UI (Contador)**: Validação da mudança de estado visual e lógica do contador de caracteres, garantindo que o limite de `100` caracteres seja respeitado e sinalizado ao usuário.

> **Nota de QA:** Todos os testes foram executados no ambiente **WSL: Ubuntu** apontando para a porta `3000`.
---
## 🏛️ ESTRUTURA DE PASTAS

A organização do ecossistema **TechNova** foi planejada para garantir que a infraestrutura de backend, o código do cliente e a suíte de testes coexistam de forma independente e organizada:

```text
technova/
├── backend/          # API Node.js, rotas e Scripts de Seed (Postgres)
├── cypress/          # Suíte de Automação (Specs, fixtures e plugins)
├── frontend/         # Código-fonte da interface do e-commerce
├── cypress.config.js # Configuração global do ambiente Cypress
└── package.json      # Manifesto do projeto e atalhos de automação
```
---
### 👤 Autor

**André de Araújo Gonçalves**<br><br>🚀 QA Engineer & Junior JS Developer
<br>🎓 Estudante de Engenharia de Software<br>
🔵 LinkedIn: [andregoncalvesqa](https://www.linkedin.com/in/andregoncalvesqa/)
